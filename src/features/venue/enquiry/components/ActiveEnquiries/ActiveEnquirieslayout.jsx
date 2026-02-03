import React, { useEffect, useRef, useState } from "react";
import {
  CircleArrowLeft,
  MapPin,
  Search,
  LocateFixed,
  X,
  ChevronDown,
  FilterIcon,
} from "lucide-react";

import EnquiryTopview from "@features/venue/enquiry/components/Enquiries/EnquiryTopview";
import { Input, Button } from "@shared/components/ui";
import Card from "@shared/components/ui/Card";
import Filter from '@assets/FilterIcon.svg'
import VenueCard from "./VenueCard";
import QuotationCard from "@features/venue/enquiry/components/Quotation/QuotationCard";

const STATUS_OPTIONS = ["Only-Invited", "Only-Shortlisted", "Hide-Rejected"];

const ActiveEnquirieslayout = ({
  locationInput,
  setLocationInput,
  suggestions,
  setSuggestions,
  fetchSuggestions,
  handleSelectSuggestion,
  detectCurrentLocation,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [activeStatus, setActiveStatus] = useState("Invited");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("received");
  const [isMapView, setIsMapView] = useState(false);

  const debounceTimer = useRef(null);
  const wrapperRef = useRef(null);
  const filterRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      setIsSearching(true);
      await fetchSuggestions(value);
      setIsSearching(false);
    }, 400);
  };

  const clearSelection = () => {
    setLocationInput("");
    setSuggestions([]);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowOptions(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex gap-7.5">
      {/* Sidebar */}
      <div className="hidden lg:block bg-amber-200 w-[25%] h-screen sticky top-0">
        <h1>sidebar</h1>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[75%] flex flex-col">
        <div className="sticky top-0 z-10 bg-white">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <CircleArrowLeft size={37} color="#fd4304" />
            <h2 className="font-bold text-2xl">
              Looking venue for kitty party for 30 people on 10 Jan, 2026
            </h2>
          </div>

          <EnquiryTopview />
        </div>

        {/* Search Bar + Cards */}
        <div className="px-4 pt-6 flex items-center gap-10">
          {/* Search Bar */}
          <div ref={wrapperRef} className="relative w-full max-w-90">
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
              <div className="absolute top-full left-0 w-full mt-2 z-50 bg-white rounded-2xl shadow-lg border overflow-hidden">
                <div
                  className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={detectCurrentLocation}
                >
                  <div className="flex items-center gap-3 text-primary font-medium">
                    <LocateFixed size={18} />
                    Detect current location
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {suggestions.map((item) => (
                    <div
                      key={item.place_id}
                      onClick={() => {
                        handleSelectSuggestion(item);
                        setShowOptions(false);
                      }}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-50"
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
            )}
          </div>

          {/* Status Cards + Filter */}
          <div className="flex gap-3 shrink-0 items-center">
            {STATUS_OPTIONS.map((status) => {
              const isActive = activeStatus === status;
              return (
                <Card
                  key={status}
                  padding="sm"
                  onClick={() => setActiveStatus(status)}
                  className={`rounded-full px-5 py-2 cursor-pointer transition
                    ${
                      isActive
                        ? "bg-[#ff8359] border-[#ff8359]"
                        : "bg-white border border-[#d7d9da]"
                    }
                  `}
                >
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-black" : "text-gray-700"
                    }`}
                  >
                    {status}
                  </span>
                </Card>
              );
            })}

            {/* Filter Card */}
            <div ref={filterRef} className="relative">
              <Card
                padding="sm"
                onClick={() => setShowFilterDropdown((p) => !p)}
                className="rounded-full px-5 py-2 cursor-pointer border border-[#d7d9da] bg-white flex items-center gap-2"
              >
                <img src={Filter}/>
              </Card>

              {showFilterDropdown && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50">
                  {["Rating", "Distance", "Price Range"].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-50 text-sm text-gray-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

    <div className="px-4 pt-6 flex items-center justify-between">
      {/* Left Tabs */}
      <div className="flex gap-8">
        {["received", "invite"].map((tab) => {
          const isActive = activeTab === tab;

          return (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative cursor-pointer"
            >
              <h4
                className={`font-bold text-base transition
                  ${isActive ? "text-[#fd4304]" : "text-gray-700"}
                `}
              >
                {tab === "received" ? "Received" : "Invite"}
              </h4>

              {isActive && (
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#fd4304] rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/*Map View*/}
      <div
      onClick={() => setIsMapView(!isMapView)}
      className="flex items-center gap-4 px-5 py-2 rounded-full border border-[#d7d9da] cursor-pointer bg-white"
    >
      <span className="text-gray-500 font-medium text-sm">
        Map View
      </span>
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition
          ${isMapView ? "bg-[#fd4304]" : "bg-gray-300"}
        `}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
            ${isMapView ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </div>
     </div>
     </div>
     </div>
     <div className="flex-1 overflow-y-auto px-4 mt-4">
     <div className="grid grid-cols-2 gap-6 mt-5">
        <QuotationCard/>
        <QuotationCard/>
        <QuotationCard/>
        <QuotationCard/>
        <QuotationCard/>
        <QuotationCard/>
     </div>

     </div>
     </div>
    </div>
  );
};

export default ActiveEnquirieslayout;
