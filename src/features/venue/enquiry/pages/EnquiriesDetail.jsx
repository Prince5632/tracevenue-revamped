import React, { useState, useRef, useEffect } from 'react';
import Map from '@/components/common/Map';
import { LoadScript } from '@react-google-maps/api';
import { Card } from '@shared/components/ui';
import LocationIcon from '@assets/images/locationPin.svg'
import NonVeg from '@assets/images/non-veg.svg';
import ColdDrink from '@assets/images/colddrink.svg';
import Venue from '@assets/images/venue.png';
import Catering from '@assets/images/catering.png';
import Icon from '@assets/images/dotLine.svg';
import { newFormatDate } from "@/utils/date-item";
import FoodItems from "@/features/package/components/FoodItems";
import PackageServices from "@/features/package/components/PackageServices";
import PackageCuisines from "@/features/package/components/PackageCuisines";

const EnquiriesDetail = ({ job }) => {
  const [center, setCenter] = useState(null);

  // Formatters
  const formatRupees = (value) => new Intl.NumberFormat('en-IN').format(value);

  const formatTo12Hour = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
  };

  // Derived Data
  const budgetMin = job?.budget?.min || 0;
  const budgetMax = job?.budget?.max || 0;
  const budgetType = job?.budgetType === 'perPerson' ? 'Per Person' : 'Lump Sum';

  const minPeople = job?.peopleRange?.minPeople || 0;
  const maxPeople = job?.peopleRange?.maxPeople || 0;

  const city = job?.selectedCities?.[0];
  const locationLabel = city
    ? (city.subLocality?.long_name && city.locality?.long_name
      ? `${city.subLocality.long_name}, ${city.locality.long_name}`
      : city.name || city.city || 'Location')
    : 'Location';

  useEffect(() => {
    if (city?.latitude && city?.longitude) {
      setCenter({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) });
    }
  }, [city]);

  const dates = job?.eventDateOptions?.preferredDates || [];
  const alternateDates = job?.eventDateOptions?.alternateDates || [];

  const foodPrefs = job?.dietaryRequirements || [];
  const isVegOnly = foodPrefs.includes('vegOnly');
  const isAlcoholic = foodPrefs.includes('alcoholic');

  const menuData = job?.menuSections || [];
  const servicesList = job?.services || [];

  // Transform menuData for FoodItems component
  const transformedMenu = React.useMemo(() => {
    return menuData.map((section, index) => ({
      categoryId: section.section || `cat-${index}`,
      categoryName: section.section,
      offerings: section.groups?.map(group => ({
        itemTypeId: group.title,
        itemTypeName: group.title,
        items: group.items?.map(item => ({ name: item })) || [],
        selectionLimit: null
      })) || [],
      subcategories: []
    }));
  }, [menuData]);

  /* SCROLL SPY LOGIC  */
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            setActiveSection(id);
          }
        });
      },
      { root: null, threshold: 0.2, rootMargin: "-10% 0px -70% 0px" }
    );

    // Slight delay to ensure refs are set
    setTimeout(() => {
      Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [transformedMenu]);

  const scrollToSection = (categoryId) => {
    const section = sectionRefs.current[categoryId];
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(categoryId);
  };

  const selectedServiceType = job?.serviceType || 'both'; // 'venue', 'catering', 'both'

  return (
    <div className="w-full lg:w-full">
      {/* BASIC INFORMATION + LOCATION */}
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT - Basic Info */}
          <div className="w-full space-y-6">
            <h2 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Basic Information</h2>

            {/* Venue & Catering Service Types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(selectedServiceType === 'venue' || selectedServiceType === 'both') && (
                <Card variant="bordered" padding="sm" className="cursor-pointer border-[#ff8359] relative h-full min-h-39">
                  <span className="absolute top-4 left-4 text-[25px] font-bold bg-[linear-gradient(93.96deg,#F08E45_0%,#EE5763_98.12%)] bg-clip-text text-transparent">Venue</span>
                  <img src={Venue} alt="Venue" className="absolute bottom-4 right-2 w-23 object-contain" />
                </Card>
              )}
              {(selectedServiceType === 'catering' || selectedServiceType === 'both') && (
                <Card variant="bordered" padding="sm" className="cursor-pointer border-[#ff8359] relative h-full min-h-39">
                  <span className="absolute top-4 left-4 text-[25px] font-bold bg-[linear-gradient(93.96deg,#F08E45_0%,#EE5763_98.12%)] bg-clip-text text-transparent">Catering</span>
                  <img src={Catering} alt="Catering" className="absolute bottom-4 right-2 w-23 object-contain" />
                </Card>
              )}
            </div>

            {/* Budget & Gathering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="flat" padding="sm" className="h-full bg-white min-h-39">
                <h1 className="font-sans text-lg">Budget</h1>
                <div className="flex flex-col gap-9">
                  <Card className="border-orange-600 text-xs py-0.5 px-3 w-fit text-[#FF4000]">
                    {budgetType}
                  </Card>
                  <Card padding="sm" className="font-semibold py-1 px-1 text-lg flex items-center whitespace-nowrap w-fit text-[#333333]">
                    <span className="text-gray-500 mx-1">₹</span>{formatRupees(budgetMin)}
                    <span className="text-gray-500 mx-1">-</span>
                    <span className="text-gray-500 mx-1">₹</span>{formatRupees(budgetMax)}
                  </Card>
                </div>
              </Card>

              <Card variant="flat" padding="sm" className="flex flex-col h-full bg-white min-h-39">
                <h1 className="font-sans text-lg whitespace-nowrap">Gathering Size</h1>
                <div className="mt-auto self-end text-right">
                  <h1 className="font-bold text-3xl font-gilroy bg-[linear-gradient(95.9deg,#F08E45_0%,#EE5763_97.38%)] bg-clip-text text-transparent">
                    {minPeople}–{maxPeople}
                  </h1>
                  <h6 className="font-semibold text-gray-500 whitespace-nowrap">Number of Guests</h6>
                </div>
              </Card>
            </div>
          </div>

          {/* RIGHT - Location */}
          <div className="w-full">
            <h3 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Location</h3>
            <div className="relative h-83.5 rounded-2xl overflow-hidden">
              <div className="absolute top-5 left-3 right-3 z-1">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                  <span className="text-orange-500"><img src={LocationIcon} /></span>
                  <input type="text" readOnly value={locationLabel} className="w-full outline-none text-xl font-medium text-gray-950!" />
                </div>
              </div>
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map center={center} radius={center && job?.radius ? (parseInt(job.radius) || 10000) : 0} handleLocation={() => { }} />
              </LoadScript>
            </div>
          </div>
        </div>
      </div>

      {/* DATE & TIME + FOOD PREFERENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        <div className="p-2 text-white rounded-xl">
          <h2 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Date & Time</h2>
          <div className="grid grid-row-2 gap-1">
            {dates.map((dateObj, idx) => {
              const formatted = newFormatDate(dateObj.date || dateObj);
              const dayName = formatted.date;
              const dayNum = formatted.year;

              const isAllDay = dateObj.allDay;
              const timeDisplay = isAllDay ? "Full Day" : `${formatTo12Hour(dateObj.startTime)} - ${formatTo12Hour(dateObj.endTime)}`;

              return (
                <Card key={idx} variant="default" padding="md" className="flex items-center justify-between gap-5">
                  <div className="text-left">
                    <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">{dayName}</div>
                    <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">{dayNum}</div>
                  </div>
                  <div className="h-16 w-[40%] bg-green-100 p-1 rounded-xl flex justify-center items-center text-[#85878C] text-sm font-bold">
                    <img src={Icon} alt="connector" className='pr-2' />
                    <div className="flex flex-col leading-tight text-center">
                      <span>{timeDisplay}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
            {alternateDates.length > 0 && <h2 className="font-gilroy font-bold text-lg mb-2 text-[#6c757d]">Alternate Dates</h2>}
            {alternateDates.map((dateObj, idx) => {
              const formatted = newFormatDate(dateObj.date || dateObj);
              const dayName = formatted.date;
              const dayNum = formatted.year;

              const isAllDay = dateObj.allDay;
              const timeDisplay = isAllDay ? "Full Day" : `${formatTo12Hour(dateObj.startTime)} - ${formatTo12Hour(dateObj.endTime)}`;

              return (
                <Card key={`alt-${idx}`} variant="default" padding="md" className="flex items-center justify-between gap-5">
                  <div className="text-left">
                    <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">{dayName}</div>
                    <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">{dayNum}</div>
                  </div>
                  <div className="h-16 w-[40%] bg-green-100 p-1 rounded-xl flex justify-center items-center text-[#85878C] text-sm font-bold">
                    <img src={Icon} alt="connector" className='pr-2' />
                    <div className="flex flex-col leading-tight text-center">
                      <span>{timeDisplay}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="p-2">
          <h2 className="font-gilroy font-bold text-lg mb-3 text-[#6c757d]">Food Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="py-2.5 px-3.75">
              <Card.Header className="text-lg font-bold">Eating</Card.Header>
              <Card.Body className="flex items-center text-lg font-bold whitespace-nowrap">
                <img src={NonVeg} alt="Veg Non Veg" className="w-9 h-9" />
                <span className='text-sm lg:text-base'>{isVegOnly ? 'Veg Only' : 'Veg & Non Veg'}</span>
              </Card.Body>
            </Card>
            <Card className="py-2.5 px-3.75">
              <Card.Header className="text-lg font-bold">Alcohol</Card.Header>
              <Card.Body className="flex items-center text-lg font-bold whitespace-nowrap">
                <img src={ColdDrink} alt="Alcohol" className="w-9 h-9" />
                <span className='text-sm lg:text-base'>{isAlcoholic ? 'Serves Alcohol' : 'Non Alcohol'}</span>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* CUISINES */}
      <PackageCuisines cuisines={job?.cuisines} />

      {/* MENU + SERVICES — same layout as PackageDetails */}
      <div className="flex flex-col md:flex-row! items-start">
        <div className="flex-1 min-w-0">
          <h2 className="text-[18px] text-[#060606] font-bold px-4 mb-2">Food Items</h2>
          <FoodItems packageMenu={job?.menuSections} sectionRefs={sectionRefs} />
        </div>
        <PackageServices services={job?.services} />
      </div>
    </div>
  );
};
export default EnquiriesDetail;
