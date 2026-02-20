import React, { useState, useRef, useEffect } from 'react';
import Map from '@/components/common/Map';
import { LoadScript } from '@react-google-maps/api';
import { Card } from '@shared/components/ui';
import Veg from '@assets/images/veg.svg';
import Location from '@assets/images/locationPin.svg'
import NonVeg from '@assets/images/non-veg.svg';
import ColdDrink from '@assets/images/colddrink.svg';
import Venue from '@assets/images/venue.png';
import Catering from '@assets/images/catering.png';
import Icon from '@assets/images/dotLine.svg';

import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EnquiriesDetail = ({ jobData }) => {
  const [location, setLocation] = useState('');
  const [center, setCenter] = useState(null);
  const navigate = useNavigate();

  // ─── Extract data from jobData (with safe defaults) ───
  const eventName = jobData?.eventType?.eventName || 'N/A';
  const budgetType = jobData?.budgetType || 'perPerson';
  const budgetMin = budgetType === 'perPerson'
    ? jobData?.perPersonBudget?.min
    : jobData?.budget?.min;
  const budgetMax = budgetType === 'perPerson'
    ? jobData?.perPersonBudget?.max
    : jobData?.budget?.max;
  const budgetLabel = budgetType === 'perPerson' ? 'Per Person' : 'Lump Sum';

  const gatheringMin = jobData?.peopleRange?.minPeople || '';
  const gatheringMax = jobData?.peopleRange?.maxPeople || '';
  const gatheringDisplay = gatheringMin && gatheringMax
    ? `${gatheringMin}–${gatheringMax}`
    : gatheringMin || gatheringMax || 'N/A';

  const serviceType = jobData?.serviceType || '';

  // Location
  const locationRadius = jobData?.radius || 10;
  const locationName = jobData?.selectedCities?.[0]?.locality?.short_name
    || jobData?.selectedCities?.[0]?.name
    || 'N/A';

  // Event dates — uses eventDateOptions structure
  const preferredDates = jobData?.eventDateOptions?.preferredDates || jobData?.eventDate || [];
  const alternateDates = jobData?.eventDateOptions?.alternateDates || [];

  const formatDateObj = (dateObj) => {
    if (!dateObj) return null;
    const dateKey = Object.keys(dateObj)[0];
    if (!dateKey) return null;
    const d = new Date(dateKey);
    if (isNaN(d.getTime())) return null;
    const dayName = d.toLocaleDateString('en-IN', { weekday: 'long' });
    const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const timeRange = dateObj[dateKey] || '';
    return { dayName, dateStr, timeRange };
  };

  const formatTimeRange = (range) => {
    if (!range) return { start: '', end: '' };
    const parts = range.split(' - ');
    if (parts.length !== 2) return { start: range, end: '' };
    const format12 = (t) => {
      const [h, m] = t.trim().split(':');
      if (!h || !m) return t;
      return `${h}:${m}`;
    };
    return { start: format12(parts[0]), end: format12(parts[1]) };
  };

  const primaryDateInfo = preferredDates.length > 0 ? formatDateObj(preferredDates[0]) : null;

  // Food preferences — uses vegOnly & nonAlcoholicOnly
  const eating = jobData?.vegOnly === true
    ? 'Veg Only'
    : jobData?.vegOnly === false
      ? 'Veg & Non Veg'
      : 'N/A';

  const alcohol = jobData?.nonAlcoholicOnly === true
    ? 'Non Alcohol'
    : jobData?.nonAlcoholicOnly === false
      ? 'Alcohol'
      : 'N/A';

  // Cuisines — simple string array
  const cuisinesData = (jobData?.cuisines || []).map((c, i) => ({
    id: i + 1,
    label: typeof c === 'string' ? c : c?.name || c?.label || '',
  }));

  // ─── Menu data — transform menuSections into display format ───
  const menuData = (jobData?.menuSections || []).map((section) => {
    const categoryName = section?.categoryName || 'Section';
    // Each offering is a food type group (Vegetarian, Non-Vegetarian, etc.)
    const groups = (section?.offerings || []).map((offering) => {
      const itemTypeName = offering?.itemTypeName || 'Items';
      const selectionLimit = offering?.selectionLimit;
      const limitLabel = selectionLimit
        ? `Any ${selectionLimit.min}${selectionLimit.max !== selectionLimit.min ? `-${selectionLimit.max}` : ''}`
        : '';
      const items = (offering?.selectedItems || []).map((item) => ({
        name: item?.name || '',
        isVeg: item?.itemTypeDetails?.[0]?.name === 'Vegetarian',
      }));
      return { title: itemTypeName, items, limitLabel };
    });
    // Total item count across all offerings
    const count = groups.reduce((sum, g) => sum + g.items.length, 0);
    return { section: categoryName, count, groups };
  });

  // ─── Services data — group by serviceCategory for Amenities & Services ───
  const servicesGrouped = (jobData?.services || []).reduce((acc, svc) => {
    const cat = svc?.serviceCategory || 'Other';
    if (!acc[cat]) acc[cat] = [];
    // Find the matched option and type
    const matchedOption = svc?.options?.find(opt => opt._id === svc?.variantOptionId);
    const matchedType = matchedOption?.types?.find(t => t._id === svc?.variantTypeId);
    acc[cat].push({
      serviceName: svc?.serviceName || '',
      serviceIcon: svc?.serviceIcon || '',
      optionName: matchedOption?.name || '',
      typeName: matchedType?.value || '',
      price: svc?.price || 0,
      priceRange: svc?.priceRange || '',
    });
    return acc;
  }, {});
  const servicesCategories = Object.entries(servicesGrouped);
  const hasServices = servicesCategories.length > 0;

  /* SCROLL SPY LOGIC  */
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (menuData.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [menuData.length]);


  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  const [selectedService, setSelectedService] = useState(() => {
    const saved = localStorage.getItem('selectedService');
    return saved ? Number(saved) : null;
  });

  const services = [
    { id: 1, label: 'Venue', image: Venue },
    { id: 2, label: 'Catering', image: Catering },
  ];

  // Auto-select service based on API serviceType
  useEffect(() => {
    if (serviceType && !selectedService) {
      if (serviceType.toLowerCase() === 'venue') {
        setSelectedService(1);
      } else if (serviceType.toLowerCase() === 'catering') {
        setSelectedService(2);
      }
    }
  }, [serviceType, selectedService]);

  const handleLocation = (lat, lng) => {
    setCenter({ lat, lng });
  };

  // Set initial map center from jobData location
  useEffect(() => {
    if (jobData?.location?.latitude && jobData?.location?.longitude) {
      setCenter({
        lat: Number(jobData.location.latitude),
        lng: Number(jobData.location.longitude),
      });
    } else if (jobData?.selectedCities?.[0]?.latitude && jobData?.selectedCities?.[0]?.longitude) {
      setCenter({
        lat: Number(jobData.selectedCities[0].latitude),
        lng: Number(jobData.selectedCities[0].longitude),
      });
    }
  }, [jobData]);

  return (
    <>
      {/**Main Content */}
      <div className="w-full lg:w-full">
        {/* BASIC INFORMATION + LOCATION */}
        <div className=" p-2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="w-full  space-y-6">
              <h2 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Basic Information</h2>

              {/* Venue & Catering */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map(service => (
                  <Card
                    key={service.id}
                    variant="bordered"
                    padding="sm"
                    onClick={() => {
                      setSelectedService(service.id);
                      localStorage.setItem('selectedService', service.id);
                    }}
                    className={`cursor-pointer transition-all duration-200 relative h-full min-h-39
                      ${selectedService === service.id
                        ? 'border-[#ff8359]' : ''}
                    `}
                  >
                    <span className="absolute top-4 left-4 text-[25px] font-bold
                      bg-[linear-gradient(93.96deg,#F08E45_0%,#EE5763_98.12%)]
                      bg-clip-text text-transparent"
                    >
                      {service.label}
                    </span>

                    <img
                      src={service.image}
                      alt={service.label}
                      className="absolute bottom-4 right-2 w-23 object-contain"
                    />
                  </Card>
                ))}
              </div>

              {/* Budget & Gathering Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Budget */}
                <Card variant="flat" padding="sm" className="h-full bg-white min-h-39">
                  <h1 className="font-sans text-lg">Budget</h1>

                  <div className="flex flex-col gap-9  ">
                    <Card className="border-orange-600 text-xs py-0.5 px-3 w-fit text-[#FF4000]">
                      {budgetLabel}
                    </Card>

                    <Card
                      padding="sm"
                      className="font-semibold py-1 px-1 text-lg flex items-center whitespace-nowrap w-fit text-[#333333]"
                    >
                      <span className="text-gray-500 mx-1 ">₹</span>
                      {budgetMin ? budgetMin.toLocaleString('en-IN') : '–'}
                      <span className="text-gray-500 mx-1">-</span>
                      <span className="text-gray-500 mx-1 ">₹</span>
                      {budgetMax ? budgetMax.toLocaleString('en-IN') : '–'}
                    </Card>
                  </div>
                </Card>

                {/* Gathering Size */}
                <Card variant="flat" padding="sm" className="flex flex-col h-full bg-white min-h-39">
                  <h1 className="font-sans text-lg whitespace-nowrap">
                    Gathering Size
                  </h1>

                  <div className="mt-auto self-end text-right">
                    <h1 className="font-bold text-3xl font-gilroy
                        bg-[linear-gradient(95.9deg,#F08E45_0%,#EE5763_97.38%)]
                        bg-clip-text text-transparent"
                    >{gatheringDisplay}</h1>

                    <h6 className="font-semibold text-gray-500 whitespace-nowrap">
                      Number of Guests
                    </h6>
                  </div>
                </Card>

              </div>
            </div>

            {/* RIGHT : LOCATION */}
            <div className="w-full">
              <h3 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">
                Location ({locationRadius} km)
              </h3>
              {/* Map Wrapper */}
              <div className="relative h-83.5 rounded-2xl overflow-hidden">
                {/* Search Bar on Map */}
                <div className="absolute top-5 left-3 right-3 z-1">
                  <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                    <span className="text-orange-500">
                      <img src={Location} />
                    </span>
                    <input
                      type="text"
                      placeholder={locationName}
                      className="w-full outline-none text-xl font-medium text-gray-950!"
                      readOnly
                    />
                  </div>
                </div>
                {/* Map */}
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                  <Map
                    center={center}
                    radius={center ? Number(locationRadius) * 1000 : 0}
                    handleLocation={handleLocation}
                  />
                </LoadScript>
              </div>
            </div>
          </div>
        </div>

        {/* DATE & TIME + FOOD PREFERENCE  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

          {/* DATE & TIME  */}
          <div className="p-2 text-white rounded-xl">
            <h2 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Date & Time</h2>
            <div className="grid grid-row-2 sm:grid-row-2 gap-1">

              {/* Preferred Date */}
              {primaryDateInfo && (
                <Card variant="default" padding="md" className="flex items-center justify-between gap-5">
                  <div className="text-left">
                    <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                      {primaryDateInfo.dayName}
                    </div>
                    <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                      {primaryDateInfo.dateStr}
                    </div>
                  </div>

                  {primaryDateInfo.timeRange && (() => {
                    const times = formatTimeRange(primaryDateInfo.timeRange);
                    return (
                      <div className="h-16 w-[40%] bg-green-100 p-1 rounded-xl flex justify-center items-center text-[#85878C] text-sm font-bold">
                        <img src={Icon} alt="connector icon" className='pr-2' />
                        <div className="flex flex-col leading-tight text-center">
                          <span>{times.start}</span>
                          <span>{times.end}</span>
                        </div>
                      </div>
                    );
                  })()}
                </Card>
              )}

              {/* Alternate Dates */}
              {alternateDates.length > 0 && (
                <>
                  <h2 className="font-gilroy font-bold text-lg mb-2 text-[#6c757d]">Alternate Dates</h2>
                  {alternateDates.map((altDateObj, idx) => {
                    const altInfo = formatDateObj(altDateObj);
                    if (!altInfo) return null;
                    const altTimes = formatTimeRange(altInfo.timeRange);
                    return (
                      <Card key={idx} variant="default" padding="md" className="flex items-center justify-between gap-5">
                        <div className="text-left">
                          <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                            {altInfo.dayName}
                          </div>
                          <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                            {altInfo.dateStr}
                          </div>
                        </div>

                        {altInfo.timeRange && (
                          <div className="h-16 w-[40%] bg-green-100 p-1 rounded-xl flex justify-center items-center text-[#85878C] text-sm font-bold">
                            <img src={Icon} alt="connector icon" className='pr-2' />
                            <div className="flex flex-col leading-tight text-center">
                              <span>{altTimes.start}</span>
                              <span>{altTimes.end}</span>
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </>
              )}

            </div>
          </div>

          {/*FOOD PREFERENCE  */}
          <div className="p-2">
            <h2 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Food Preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="py-2.5 px-3.75">
                <Card.Header className="text-lg font-bold">
                  Eating
                </Card.Header>
                <Card.Body className="flex items-center text-lg font-bold whitespace-nowrap">
                  <img
                    src={eating === 'Veg Only' ? Veg : NonVeg}
                    alt={eating}
                    className="w-9 h-9"
                  />
                  <span className='text-sm lg:text-base'>{eating}</span>
                </Card.Body>
              </Card>

              <Card className="py-2.5 px-3.75">
                <Card.Header className="text-lg font-bold">
                  Alcohol
                </Card.Header>
                <Card.Body className="flex items-center  text-lg font-bold whitespace-nowrap">
                  <img
                    src={ColdDrink}
                    alt={alcohol}
                    className="w-9 h-9"
                  />
                  <span className=' text-sm lg:text-base '>{alcohol}</span>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        {/* CUISINES */}
        {cuisinesData.length > 0 && (
          <div className='p-2'>
            <Card variant="borderless" className="p-5 mb-3 bg-[#F8F9FA]" hoverable={false}>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-sans text-lg mr-3 mb-2 text-[#1A1A1A]">
                  Cuisines
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                  {cuisinesData.map((cuisine) => (
                    <Card
                      key={cuisine.id}
                      hoverable={false}
                      className="w-fit py-2 px-4 bg-white lg:w-fit"
                    >
                      <span className="text-sm font-sans text-[#333333]">
                        {cuisine.label}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/*  MENU + FOOD */}
        {menuData.length > 0 && (
          <div className="flex gap-8 2xl:gap-0 ">

            {/* LEFT MENU */}
            <div className=" hidden lg:block">
              <div className="sticky top-4">
                <Card className="h-105.25 w-70">
                  <h2 className="font-sans text-lg mb-4 h-5.25">Menu</h2>

                  <ul className="space-y-1 mb-6">
                    {menuData.map((section, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(index)}
                          className={`w-full flex items-center justify-between px-2 py-3 rounded transition cursor-pointer text-left 
                    ${activeSection === index
                              ? "bg-[#FFF8F0] text-[#E29F55] border-l-4 border-[#e0a057]"
                              : "text-gray-600 hover:bg-gray-50"
                            }
                  `}
                        >
                          <span className="text-base font-sans">{section.section}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded">
                            {section.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-sans text-lg mb-4 mt-4 w-59.5 text-[#1A1A1A] h-5.25">Amenities & Services</h3>
                  {hasServices ? (
                    <ul className="space-y-1">
                      {servicesCategories.map(([cat, items], idx) => (
                        <li key={idx} className="flex items-center justify-between px-2 py-2 text-gray-600">
                          <span className="text-base font-sans">{cat}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded">({items.length})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <h2 className="text-base h-6 w-59.5 text-[#212528] font-sans">No Amenities & Services</h2>
                  )}
                </Card>
              </div>
            </div>

            {/* RIGHT FOOD */}
            <div id="food-scroll" className="flex-1 w-full lg:w-[65%] space-y-6 grid grid-cols-1  ">
              <Card className="hidden lg:block ">
                <h1 className="font-sans text-lg mb-4 h-5.25 ">Food Items</h1>

                {menuData.map((section, index) => (
                  <div
                    key={index}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    data-index={index}
                    className="mb-10"
                  >
                    <h2 className="font-sans text-[18.4px] h-11 border-b-2 border-[#e29f55] mb-4 pb-2.5 text-[#1A1A1A]">
                      {section.section}
                    </h2>

                    {section.groups.map((group, gIndex) => (
                      <Card key={gIndex} className="mb-5">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-sans text-lg h-5.5 text-[#060606] mb-2.5">{group.title}</h3>
                          {group.limitLabel && (
                            <span className="bg-[#fce1cb] text-[#FF4000] rounded-full text-xs font-sans px-1.5">
                              {group.limitLabel}
                            </span>
                          )}
                        </div>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                          {group.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <img src={item.isVeg ? Veg : NonVeg} className="w-8 h-8" />
                              <span className="font-sans pr-2.5 text-sm">{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                ))}
              </Card>

              <div>
                <Card className="hidden lg:block ">
                  <div className="mt-5">
                    <h2 className="font-semibold text-xl border-b-2 border-yellow-600 mb-4 pb-2">
                      Amenities & Services
                    </h2>
                  </div>
                  {hasServices ? (
                    servicesCategories.map(([cat, items], catIdx) => (
                      <div key={catIdx} className="mb-5">
                        <h3 className="text-base font-semibold text-[#FF6A3D] mb-3">{cat}</h3>
                        {items.map((svc, svcIdx) => (
                          <Card key={svcIdx} variant="bordered" className="flex items-center justify-between px-4 py-3 mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🎂</span>
                              <div>
                                <span className="font-semibold text-[#060606]">{svc.serviceName}</span>
                                <div className="text-sm text-[#85878C]">
                                  {svc.optionName}{svc.typeName ? `: ${svc.typeName}` : ''}
                                </div>
                              </div>
                            </div>
                            {svc.price === 0 && (
                              <span className="text-sm font-semibold text-[#15B076] bg-[#E8F8F0] px-3 py-1 rounded-full">FREE</span>
                            )}
                            {svc.price > 0 && (
                              <span className="text-sm font-semibold text-[#060606]">₹{svc.price.toLocaleString('en-IN')}</span>
                            )}
                          </Card>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm font-semibold text-gray-400">
                      No Amenities & Services
                    </p>
                  )}
                </Card>
              </div>

              {/**Mobile view */}
              <div className="lg:hidden">
                <h1 className="font-bold text-xl mb-6">Food Items</h1>

                {menuData.map((section, index) => (
                  <div
                    key={index}
                    data-index={index}
                    className="mb-10"
                  >
                    <h2 className="font-semibold text-xl border-b-2 border-yellow-600 mb-4 pb-2">
                      {section.section}
                    </h2>

                    {section.groups.map((group, gIndex) => (
                      <Card key={gIndex} className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-lg">{group.title}</h3>
                          {group.limitLabel && (
                            <span className="bg-[#f3e2dd] text-[#FF6A3D] px-1.5 rounded-full text-xs font-semibold">
                              {group.limitLabel}
                            </span>
                          )}
                        </div>

                        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                          {group.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <img src={item.isVeg ? Veg : NonVeg} className="w-8 h-8" />
                              <span className="font-semibold text-sm">{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                ))}
                <Card>
                  <div className="mt-5">
                    <h2 className="font-semibold text-xl border-b-2 border-yellow-600 mb-4 pb-2">
                      Amenities & Services
                    </h2>
                  </div>
                  {hasServices ? (
                    servicesCategories.map(([cat, items], catIdx) => (
                      <div key={catIdx} className="mb-5">
                        <h3 className="text-base font-semibold text-[#FF6A3D] mb-3">{cat}</h3>
                        {items.map((svc, svcIdx) => (
                          <Card key={svcIdx} variant="bordered" className="flex items-center justify-between px-4 py-3 mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🎂</span>
                              <div>
                                <span className="font-semibold text-[#060606]">{svc.serviceName}</span>
                                <div className="text-sm text-[#85878C]">
                                  {svc.optionName}{svc.typeName ? `: ${svc.typeName}` : ''}
                                </div>
                              </div>
                            </div>
                            {svc.price === 0 && (
                              <span className="text-sm font-semibold text-[#15B076] bg-[#E8F8F0] px-3 py-1 rounded-full">FREE</span>
                            )}
                            {svc.price > 0 && (
                              <span className="text-sm font-semibold text-[#060606]">₹{svc.price.toLocaleString('en-IN')}</span>
                            )}
                          </Card>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm font-semibold text-gray-400">
                      No Amenities & Services
                    </p>
                  )}
                </Card>
              </div>
            </div>
          </div>
        )}



        {/* If no menu data, show a placeholder */}
        {menuData.length === 0 && (
          <div className="p-4 text-center text-gray-400">
            <p>No menu information available for this enquiry.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EnquiriesDetail;
