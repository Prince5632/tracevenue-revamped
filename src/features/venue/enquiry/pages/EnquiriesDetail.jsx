import React, { useState, useRef, useEffect } from 'react';
import EnquiryTopview from '@/features/venue/enquiry/components/EnquiryDetailTabs';
import Map from '@/components/common/Map';
import { LoadScript } from '@react-google-maps/api';
import { Card, Button } from '@shared/components/ui';
import Veg from '@assets/images/veg.svg';
import Location from '@assets/images/locationPin.svg'
import NonVeg from '@assets/images/non-veg.svg';
import ColdDrink from '@assets/images/colddrink.svg';
import Venue from '@assets/images/venue.png';
import Catering from '@assets/images/catering.png';
import Icon from '@assets/images/dotLine.svg';
import { ProgressBar } from '@/shared/components/feedback';
import { Download } from 'lucide-react';

import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EnquiriesDetail = () => {
  const [location, setLocation] = useState('');
  const [center, setCenter] = useState(null);
  const navigate = useNavigate();
  const cuisinesData = [
    {
      id: 1,
      label: 'North Indian',
    },
    {
      id: 2,
      label: 'Indian',
    },
    {
      id: 3,
      label: 'Continental',
    },
    {
      id: 4,
      label: 'Indo-Chainese',
    },
    {
      id: 5,
      label: 'Mughlai',
    },
    {
      id: 6,
      label: 'Indian / Continental',
    },
    {
      id: 7,
      label: 'Chinese',
    },
    {
      id: 8,
      label: 'Italian'
    },
  ];

  const menuData = [
    {
      section: "Beverages",
      count: 2,
      icon: ColdDrink,
      groups: [
        {
          title: "Cold Drink(s)",
          items: ["Coke"],
        },
        {
          title: "Welcome Drinks",
          items: ["Tea", "Coffee"],
        },
      ],
    },
    {
      section: "Starter / Snacks",
      count: 4,
      icon: Veg,
      groups: [
        {
          title: "Paneer Items",
          items: [
            "Achari Paneer Tikka",
            "Lemon Paneer Tikka",
            "Multani Paneer Tikka",
          ],
        },
        {
          title: "Veg Items",
          items: [
            "Mushroom Tikka",
            "Rosted Papad",
            "Stuffed Mushroom Tikka",
            "Masala Papad",
            "Peanut Masala",
            "Masala Champ",
            "French Fries",
            "Potato Wedges",
            "Malai Champ",
            "Aloo Chaat",
            "Corn Chaat",
            "Achari Chaap",
            "Veg Seekh Kebab",
            "Corn Seekh Kebab",
            "Bell Pepper Kebab",
            "Spiced Yogurt Cake",
            "Paneer Tikka",
            "Haryali Paneer Tikka",
            "Tandoori Aloo",
            "Tandoori Pine Apple",
            "Khas Veg Kebab",
            "Veg Platter",
            "Tandoori Sizzler",
            "Tandoori Chaap",
          ],
        },
      ],
    },
    {
      section: "Salad",
      count: 2,
      icon: Veg,
      groups: [
        {
          title: "Veg Items",
          items: ["Russian Salad", "Onion Salad"],
        },
      ],
    },
    {
      section: "Main Course",
      count: 6,
      icon: Veg,
      groups: [
        {
          title: "Paneer Items",
          items: ["Paneer Lababdar", "Paneer Butter Masala"],
        },
        {
          title: "Veg Items",
          items: [
            "Chana Masala",
            "Special Fire Wood Pizza",
            "Hakka Noodles",
            "Manchurian Gravy",
            "Pasta",
          ],
        },
        {
          title: "Rice & Biryani",
          items: [
            "Peas Pulao",
            "Veg Pulao",
            "Rice (Steam/Jeera)",
            "Fried Rice",
            "Jeera Rice",
            "Veg Biryani",
          ],
        },
        {
          title: "Raita",
          items: ["Bondi Raita", "Pineapple Raita", "Mix Veg Raita"],
        },
        {
          title: "Breads",
          items: [
            "Tandoori Roti",
            "Missi Roti",
            "Lacha Parantha",
            "Butter Naan",
            "Khastha Roti",
            "Garlic Naan",
            "Masala Naan",
            "Chur Chur Naan",
          ],
        },
      ],
    },
    {
      section: "Desserts",
      count: 1,
      icon: Veg,
      groups: [
        {
          title: "Veg Items",
          items: ["Hot Gulab Jamun", "Rasmalai", "Ice Cream"],
        },
      ],
    },
  ];


  /* SCROLL SPY LOGIC  */
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [isFocus, setIsFoucus] = useState(false);

  let heading = "Looking venue for birthday party for 50 people on 27 feb, 2026.";
  const [value, setValue] = useState(heading);        // saved value
  const [editValue, setEditValue] = useState(heading); // temp value
  const handlePencilButtonClick = () => {
    setEditValue(value);
    setIsClick(true);
  }
  const handleInputCancel = () => {
    setEditValue(value);
    setIsClick(false);
  }
  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  }
  const handleEditInput = () => {
    setValue(editValue);
    setIsClick(false);
  }


  useEffect(() => {
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
  }, []);


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

  const handleLocation = (lat, lng) => {
    setCenter({ lat, lng });

    if (!window.google) return;

    // const geocoder = new window.google.maps.Geocoder();
    // geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    //   if (status === 'OK' && results?.[0]) {
    //     setLocation(results[0].formatted_address);
    //   }
    // });
  };
  return (
    <>
      {/**Main Content */}
      <div className="w-full lg:w-full">
        {/* HEADER SECTION */}
        <div>
          <div className='mb-6 flex items-center justify-between gap-6'>
            <div className='flex-1 w-full flex gap-4 items-center'>
              {
                isClick ? <>
                  <div
                    onFocus={() => setIsFoucus(true)}
                    onBlur={() => setIsFoucus(false)}
                    className={`h-[48px] w-full border-2 rounded-[10px] border-[#e0e0e0] flex items-center px-2 ${isFocus ? "border-[#ff4000]" : "border-[#e0e0e0]"}`}>
                    <input type="text"
                      value={editValue}
                      className='h-[48px] w-full pl-2 !text-[18px] !text-[#060606] !font-bold'
                      onChange={handleInputChange} />
                    <div className='flex gap-2'>
                      <Button onClick={handleEditInput} variant="primary" className="!rounded-[10px] h-[34px] w-[34px] hover:scale-110 transition-all duration-300 ease-in ">
                        <i class="fa-solid fa-check"></i>
                      </Button>
                      <Button onClick={handleInputCancel} variant="secondary" className="!rounded-[10px] h-[34px] w-[34px] hover:scale-110 transition-all duration-300 ease-in">
                        <i class="fa-solid fa-x"></i>
                      </Button>
                    </div>
                  </div>
                </>
                  :
                  <>
                    <Button onClick={handlePencilButtonClick} variant="gradient" className="border-none !rounded-[10px] h-[40px] w-[40px] shadow-[4px_0_8px_#ff400033] transition-all duration-300 ease-in shrink-0 bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)] border border-[rgb(255,64,0)] cursor-pointer hover:translate-y-[-2px] flex justify-center items-center">
                      <i className="fa-solid fa-pen text-[20px]"></i>
                    </Button>
                    <h3 className='text-[20px] text-[#060606] font-bold'>{value}</h3>
                  </>
              }
            </div>
            <Button variant="outline" className="!text-[16px] text-[#ff4000] border border-solid border-[#ff4000] !font-bold rounded-[30px] p-[9px] bg-white hover:!bg-[#ffffff] cursor-pointer">Download as PDF<Download /></Button>
          </div>
          <ProgressBar variant="gradient" value={50} className="mb-6" />
        </div>
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
                      Per Person
                    </Card>

                    <Card
                      padding="sm"
                      className="font-semibold py-1 px-1 text-lg flex items-center whitespace-nowrap w-fit text-[#333333]"
                    >
                      <span className="text-gray-500 mx-1 ">₹</span>
                      2,500
                      <span className="text-gray-500 mx-1">-</span>
                      <span className="text-gray-500 mx-1 ">₹</span>
                      5,500

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
                    >60–80</h1>

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
                Location (10 km)
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
                      placeholder="South West Inn"
                      className="w-full outline-none text-xl font-medium text-gray-950!"
                    />
                  </div>
                </div>
                {/* Map */}
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                  <Map
                    center={center}
                    radius={center ? 10000 : 0}
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
              <Card variant="default" padding="md" className="flex items-center justify-between gap-5">
                <div className="text-left">
                  <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    Saturday
                  </div>
                  <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    10 Jan
                  </div>
                </div>

                <div className="h-16 w-[40%] bg-green-100 p-1 rounded-xl flex justify-center items-center text-[#85878C] text-sm font-bold">
                  <img src={Icon} alt="connector icon" className='pr-2' />
                  <div className="flex flex-col leading-tight text-center">
                    <span>18:00</span>
                    <span>22:00</span>
                  </div>
                </div>
              </Card>

              {/* Alternate Date */}
              <h2 className="font-gilroy font-bold text-lg mb-2 text-[#6c757d]">Alternate Dates</h2>
              <Card variant="default" padding="md" className="flex items-center justify-between gap-5">
                <div className="text-left">
                  <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    Sunday
                  </div>
                  <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    11 Jan
                  </div>
                </div>

                <div className="h-16 w-[40%] bg-green-100 p-1 rounded-xl flex justify-center items-center text-[#85878C] text-sm font-bold">
                  <img src={Icon} alt="connector icon" className='pr-2' />
                  <div className="flex flex-col leading-tight text-center">
                    <span>18:00</span>
                    <span>22:00</span>
                  </div>
                </div>
              </Card>

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
                    src={NonVeg}
                    alt="Veg Non Veg"
                    className="w-9 h-9"
                  />
                  <span className='text-sm lg:text-base'>Veg &amp; Non Veg</span>
                </Card.Body>
              </Card>

              <Card className="py-2.5 px-3.75">
                <Card.Header className="text-lg font-bold">
                  Alcohol
                </Card.Header>
                <Card.Body className="flex items-center  text-lg font-bold whitespace-nowrap">
                  <img
                    src={ColdDrink}
                    alt="Non Alcohol"
                    className="w-9 h-9"
                  />
                  <span className=' text-sm lg:text-base '>Non Alcohol</span>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        {/* CUISINES */}
        <div className='p-2'>
          <Card variant="borderless" className="p-5 mb-3 bg-[#F8F9FA]" hoverable={false}>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-sans text-lg mr-3 mb-2 text-[#1A1A1A]">
                Cuisines
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                {cuisinesData.map((cuisines) => (
                  <Card
                    key={cuisines.id}
                    hoverable={false}
                    className="w-fit py-2 px-4 bg-white lg:w-fit"
                  >
                    <span className="text-sm font-sans text-[#333333]">
                      {cuisines.label}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

        </div>

        {/*  MENU + FOOD */}
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
                <h2 className="text-base h-6 w-59.5  text-[#212528] font-sans">No Amenities & Services</h2>
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
                        <span className="bg-[#fce1cb] text-[#FF4000]  rounded-full text-xs font-sans px-1.5
">Any 2</span>
                      </div>

                      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        {group.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <img src={section.icon} className="w-8 h-8" />
                            <span className="font-sans pr-2.5 text-sm ">{item}</span>
                          </li>
                        ))}
                      </ul >

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
                <p className="text-sm font-semibold text-gray-400">
                  No Amenities & Services
                </p>
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
                        <span className="bg-[#f3e2dd] text-[#FF6A3D] px-1.5 rounded-full text-xs font-semibold">
                          Any 2
                        </span>
                      </div>

                      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        {group.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <img src={section.icon} className="w-8 h-8" />
                            <span className="font-semibold text-sm">{item}</span>
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
                <p className="text-sm font-semibold text-gray-400">
                  No Amenities & Services
                </p>
              </Card>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default EnquiriesDetail;
