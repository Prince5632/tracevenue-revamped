import React, { useEffect, useRef, useState } from "react";
import {
  CircleArrowLeft,
  MapPin,
  Search,
  LocateFixed,
  X,
} from "lucide-react";

// import EnquiryTopview from "@features/venue/enquiry/components/Enquiries/EnquiryTopview";
import EnquiryDetailTabs from "@features/venue/enquiry/components/EnquiryDetailTabs"
import { Input, Button } from "@shared/components/ui";
import Card from "@shared/components/ui/Card";
import Filter from "@assets/FilterIcon.svg";
import QuotationCard from "@features/venue/enquiry/components/Quotation/QuotationCard";
import Eyeicon from '@assets/images/eyeicon.svg'
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
const STATUS_OPTIONS = ["Only-Invited", "Only-Shortlisted", "Hide-Rejected"];




const Quotationpage = ({
  locationInput,
  setLocationInput,
  suggestions,
  setSuggestions,
  fetchSuggestions,
  handleSelectSuggestion,
  detectCurrentLocation,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Only-Invited");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("received");
  const [isMapView, setIsMapView] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const debounceTimer = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopFilterRef = useRef(null);
  const mobileFilterRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400);
  };

  const clearSelection = () => {
    setLocationInput("");
    setSuggestions([]);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }

      if (
        desktopFilterRef.current &&
        !desktopFilterRef.current.contains(e.target) &&
        mobileFilterRef.current &&
        !mobileFilterRef.current.contains(e.target)
      ) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex gap-8">
      {/* Sidebar */}
      {/* <div className="hidden lg:block w-[25%] h-screen sticky top-0 bg-amber-200">
        <h1>sidebar</h1>
      </div> */}

      {/* Main */}
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="p-1">
            {/* <div className="flex items-center gap-3 mb-2">
              <CircleArrowLeft size={36} color="#fd4304" />
              <h2 className="font-bold text-2xl">
                Looking venue for kitty party for 30 people on 10 Jan, 2026
              </h2>
              <img src={Eyeicon}   
              className={
                `w-8 h-8 ml-20 cursor-pointer transition 
                  ${
                    showDetailPage ? "opacity-50 grayscale" : ""
                  }`
                } 
                onClick={() => setShowDetailPage(prev =>!prev)}
              />
          </div>
            <EnquiryDetailTabs/> */}
          <div className="hidden lg:flex px-4 items-center gap-10">
             {/* Search */}
             <div
               ref={desktopSearchRef}
               className="relative w-full max-w-105"
             >
               <Input
                 type="text"
                 placeholder="Type to Search..."
                 value={locationInput}
                 onChange={handleInputChange}
                 onFocus={() => setShowOptions(true)}
                 inputClassName="text-secondary text-[14px] h-[44px] pr-20"
                 leftIcon={<MapPin size={25} />}
                 rightIcon={<Search size={18} />}
               />

               {locationInput && (
                 <Button
                   onClick={clearSelection}
                   size="sm"
                   variant="ghost"
                   className="absolute right-10 top-1/2 -translate-y-1/2 p-1"
                 >
                   <X size={16} />
                 </Button>
               )}

               {showOptions && (
                 <SearchDropdown
                   suggestions={suggestions}
                   detectCurrentLocation={detectCurrentLocation}
                   handleSelectSuggestion={handleSelectSuggestion}
                   setShowOptions={setShowOptions}
                 />
               )}
             </div>

             {/* Status + Filter */}
             <div className="flex gap-3 items-center shrink-0">
               {STATUS_OPTIONS.map((status) => {
                 const isActive = activeStatus === status;
                 return (
                   <Card
                     key={status}
                     padding="sm"
                     onClick={() => setActiveStatus(status)}
                     className={`rounded-full px-5 py-2 cursor-pointer ${
                       isActive
                         ? "bg-[#ff8359] border-[#ff8359]"
                         : "bg-white border border-[#d7d9da]"
                     }`}
                   >
                     <span className="text-sm font-medium">
                       {status}
                     </span>
                   </Card>
                 );
               })}

               <div ref={desktopFilterRef} className="relative">
                 <Card
                   padding="sm"
                   onClick={() => setShowFilterDropdown((p) => !p)}
                  className="rounded-full px-5 py-2 cursor-pointer border border-[#d7d9da] bg-white"
                 >
                   <img src={Filter} />
                 </Card>

                 {showFilterDropdown && <FilterDropdown />}
               </div>
             </div>
           </div>

           {/* Desktop Tabs + Map */}
           <div className="hidden lg:flex px-4 pt-6 justify-between items-center">
             <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <MapToggle isMapView={isMapView} setIsMapView={setIsMapView} />
           </div>

          {/* Mobile */}
          <div className="lg:hidden px-4 pt-1 space-y-4">
            {/* Search + Filter */}
            <div className="flex gap-3">
              <div ref={mobileSearchRef} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Type to Search..."
                  value={locationInput}
                  onChange={handleInputChange}
                  onFocus={() => setShowOptions(true)}
                  inputClassName="text-[14px] h-[44px] pr-20"
                  leftIcon={<MapPin size={22} />}
                  rightIcon={<Search size={18} />}
                />
                {showOptions && (
                  <SearchDropdown
                    suggestions={suggestions}
                    detectCurrentLocation={detectCurrentLocation}
                    handleSelectSuggestion={handleSelectSuggestion}
                    setShowOptions={setShowOptions}
                  />
                )}
              </div>

              <div ref={mobileFilterRef} className="relative">
                <Card
                  onClick={() => setShowFilterDropdown((p) => !p)}
                  className="rounded-full px-5 py-2 border border-[#d7d9da]"
                >
                  <img src={Filter} className="w-8 h-8" />
                </Card>
                {showFilterDropdown && <FilterDropdown />}
              </div>
            </div>

            {/* Status scroll */}
            <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-1">
              {STATUS_OPTIONS.map((status) => {
                 const isActive = activeStatus === status;
                 return (
                   <Card
                     key={status}
                     padding="sm"
                     onClick={() => setActiveStatus(status)}
                     className={`rounded-full px-5 py-2 cursor-pointer ${
                       isActive
                         ? "bg-[#ff8359] border-[#ff8359]"
                         : "bg-white border border-[#d7d9da]"
                     }`}
                   >
                     <span className="text-sm font-medium">
                       {status}
                     </span>
                   </Card>
                 );
               })}
            </div>

            {/* Tabs + Map inline */}
            <div className="flex items-center justify-between">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <MapToggle isMapView={isMapView} setIsMapView={setIsMapView} />
            </div>
          </div>
        </div>
      </div>
        {/* Cards */}

        {/* Cards / Detail Page */}
        <div className="flex-1 px-4 mt-2">
          {!showDetailPage ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
              {Array.from({ length: 15 }).map((_, i) => (
                <QuotationCard key={i} />
              ))}
            </div>
          ) : (
            <EnquiriesDetail />
          )}
        </div>
        </div>
    </div>
  );
};

export default Quotationpage;



const SearchDropdown = ({
  suggestions,
  detectCurrentLocation,
  handleSelectSuggestion,
  setShowOptions,
}) => (
  <div className="absolute top-full left-0 w-full mt-2 z-50 bg-white rounded-2xl shadow-lg border">
    <div
      onClick={detectCurrentLocation}
      className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 flex gap-3"
    >
      <LocateFixed size={18} />
      Detect current location
    </div>

    <div className="max-h-60 overflow-y-auto">
      {suggestions.map((item) => (
        <div
          key={item.place_id}
          onClick={() => {
            handleSelectSuggestion(item);
            setShowOptions(false);
          }}
          className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
        >
          <p className="text-sm font-medium">
            {item.structured_formatting.main_text}
          </p>
          <p className="text-xs text-gray-500">
            {item.structured_formatting.secondary_text}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const FilterDropdown = () => (
  <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl z-50">
    {["Rating", "Distance", "Price Range"].map((item) => (
      <div
        key={item}
        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
      >
        {item}
      </div>
    ))}
  </div>
);

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-6">
    {["received", "invite"].map((tab) => (
      <div
        key={tab}
        onClick={() => setActiveTab(tab)}
        className="relative cursor-pointer"
      >
        <h4
          className={`font-bold ${
            activeTab === tab ? "text-[#fd4304]" : "text-gray-700"
          }`}
        >
          {tab === "received" ? "Received" : "Invite"}
        </h4>
        {activeTab === tab && (
          <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#fd4304]" />
        )}
      </div>
    ))}
  </div>
);

const MapToggle = ({ isMapView, setIsMapView }) => (
  <div
    onClick={() => setIsMapView(!isMapView)}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d7d9da] bg-white cursor-pointer"
  >
    <span className="text-sm text-gray-500 whitespace-nowrap">Map View</span>
    <div
      className={`w-9 h-5 rounded-full p-[2px] ${
        isMapView ? "bg-[#fd4304]" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
          isMapView ? "translate-x-4" : ""
        }`}
      />
    </div>
  </div>
);