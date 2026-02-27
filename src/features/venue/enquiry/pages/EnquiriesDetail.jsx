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
import { useNavigate } from 'react-router-dom';
import MenuCategories from '@/features/package/components/MenuCategories';
import FoodItems from '@/features/package/components/FoodItems';
import PackageServices from '@/features/package/components/PackageServices';
import PackageCuisines from '@/features/package/components/PackageCuisines';

const EnquiriesDetail = ({ enquiryData }) => {
  const [location, setLocation] = useState('');
  const [center, setCenter] = useState(null);
  const navigate = useNavigate();

  // ─── Extract data from enquiryData (with safe defaults) ───
  const eventName = enquiryData?.eventType?.eventName || 'N/A';
  const budgetType = enquiryData?.budgetType || 'perPerson';
  // API always stores amounts in budget.min/max regardless of budgetType
  const budgetMin = enquiryData?.budget?.min ?? enquiryData?.perPersonBudget?.min;
  const budgetMax = enquiryData?.budget?.max ?? enquiryData?.perPersonBudget?.max;
  const budgetLabel = budgetType === 'perPerson' ? 'Per Person' : 'Lump Sum';

  const gatheringMin = enquiryData?.peopleRange?.minPeople || '';
  const gatheringMax = enquiryData?.peopleRange?.maxPeople || '';
  const gatheringDisplay = gatheringMin && gatheringMax
    ? `${gatheringMin}–${gatheringMax}`
    : gatheringMin || gatheringMax || 'N/A';

  const serviceType = enquiryData?.serviceType || '';

  // Location
  const locationRadius = enquiryData?.radius || 10;
  const locationName = enquiryData?.selectedCities?.[0]?.locality?.short_name
    || enquiryData?.selectedCities?.[0]?.name
    || 'N/A';

  // Event dates — uses eventDateOptions structure
  const preferredDates = enquiryData?.eventDateOptions?.preferredDates || enquiryData?.eventDate || [];
  const alternateDates = enquiryData?.eventDateOptions?.alternateDates || [];

  const formatDateObj = (dateObj) => {
    if (!dateObj) return null;

    let dateKey, timeRange;
    // New format: { date: "2026-02-28", startTime: "09:00", endTime: "17:00" }
    if (dateObj.date) {
      dateKey = dateObj.date;
      timeRange = dateObj.startTime && dateObj.endTime
        ? `${dateObj.startTime} - ${dateObj.endTime}`
        : '';
    } else {
      // Old format: { "2026-02-28": "09:00 - 17:00" }
      dateKey = Object.keys(dateObj)[0];
      timeRange = dateObj[dateKey] || '';
    }

    if (!dateKey) return null;
    const d = new Date(dateKey);
    if (isNaN(d.getTime())) return null;
    const dayName = d.toLocaleDateString('en-IN', { weekday: 'long' });
    const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
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
  const eating = enquiryData?.vegOnly === true
    ? 'Veg Only'
    : enquiryData?.vegOnly === false
      ? 'Veg & Non Veg'
      : 'N/A';

  const alcohol = enquiryData?.nonAlcoholicOnly === true
    ? 'Non Alcohol'
    : enquiryData?.nonAlcoholicOnly === false
      ? 'Alcohol'
      : 'N/A';

  // Cuisines — simple string array
  const cuisinesData = (enquiryData?.cuisines || []).map((c, i) => ({
    id: i + 1,
    label: typeof c === 'string' ? c : c?.name || c?.label || '',
  }));

  // ─── Menu data — transform menuSections into display format ───
  const menuData = (enquiryData?.menuSections || []).map((section) => {
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
  const servicesGrouped = (enquiryData?.services || []).reduce((acc, svc) => {
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

  /* ── PACKAGE COMPONENT SCROLL SPY (mirrors PackageDetails.jsx) ── */
  const pkgSectionRefs = useRef({});
  const [pkgActive, setPkgActive] = useState(null);

  useEffect(() => {
    if (!enquiryData?.menuSections?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            setPkgActive(id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -70% 0px',
        threshold: 0,
      }
    );

    setTimeout(() => {
      Object.values(pkgSectionRefs.current).forEach((section) => {
        if (section) observer.observe(section);
      });
    }, 100);

    return () => observer.disconnect();
  }, [enquiryData?.menuSections]);

  const handlePkgMenuClick = (id) => {
    setPkgActive(id);
    pkgSectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Set initial map center from enquiryData location
  useEffect(() => {
    if (enquiryData?.location?.latitude && enquiryData?.location?.longitude) {
      setCenter({
        lat: Number(enquiryData.location.latitude),
        lng: Number(enquiryData.location.longitude),
      });
    } else if (enquiryData?.selectedCities?.[0]?.latitude && enquiryData?.selectedCities?.[0]?.longitude) {
      setCenter({
        lat: Number(enquiryData.selectedCities[0].latitude),
        lng: Number(enquiryData.selectedCities[0].longitude),
      });
    }
  }, [enquiryData]);

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
                <Card variant="default" padding="md" className="flex items-center justify-center gap-10 !p-3">
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
                      <div className="h-full bg-[#C6FBE580] px-4 py-2 rounded-xl flex gap-4 justify-center items-center text-[#85878C] text-sm font-bold">
                        <div className='h-full flex flex-col items-center justify-center '>
                          <div className='h-[10px] w-[10px] bg-[#15B076] rounded-[30px]'></div>
                          <div className='h-[40%] !bg-[#B1F4D8] w-[4px]'></div>
                          <div className='h-[10px] w-[10px] bg-[#15B076] rounded-[30px]'></div>
                        </div>
                        <div className='h-full flex flex-col justify-between items-center'>
                          <div className='text-[16px] font-medium text-[#85878C] mb-4 '>{times.start}</div>
                          <div className='text-[16px] font-medium text-[#85878C] '>{times.end}</div>
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
            <div className="grid sm:grid-cols-2 gap-4">
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

        {/* ── PACKAGE COMPONENTS (Cuisines / Menu / Services) ── */}

        {/* Cuisines */}
        {enquiryData?.cuisines?.length > 0 && (
          <div className="px-2 mt-2">
            <PackageCuisines cuisines={enquiryData?.cuisines} />
          </div>
        )}

        {/* Menu Categories + Food Items + Services (same layout as PackageDetails) */}
        <div className="flex flex-col md:flex-row! items-start sticky top-24 mt-4">
          {/* Menu Categories */}
          <div className="hidden lg:block">
            <MenuCategories
              packageMenu={enquiryData?.menuSections}
              isActive={pkgActive}
              handleMenuClick={() => handlePkgMenuClick}
            />
          </div>
          {/* Food Items */}
          <div className="w-full md:max-w-[600px]">
            <h2 className="text-[18px] text-[#060606] font-bold px-4">Food Items</h2>
            <div className="w-full h-auto max-h-[calc(100vh-8rem)] overflow-y-auto overflow-hidden scrollbar-hide md:pb-[200px]">
              <FoodItems packageMenu={enquiryData?.menuSections} sectionRefs={pkgSectionRefs} />
            </div>
          </div>
          {/* Amenities & Services */}
          <PackageServices
            services={enquiryData?.services}
            handleMenuClick={() => handlePkgMenuClick}
          // sectionRefs={pkgSectionRefs}
          />
        </div>




        {/* If no menu data, show a placeholder */}
        {menuData.length === 0 && (
          <div className="p-4 text-center text-gray-400">
            <p>No menu information available for this enquiry.</p>
          </div>
        )}
      </div >
    </>
  );
};

export default EnquiriesDetail;











