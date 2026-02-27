import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Input, Button } from "@shared/components/ui";
import Card from "@shared/components/ui/Card";
import Filter from "@assets/FilterIcon.svg";
import VenueCard from "@features/venue/enquiry/components/Quotation/VenueCard";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import MapView from "./MapView";
import useEnquiryDetailStore from "@/features/venue/enquiry/context/useEnquiryDetailStore";
import SearchDropdown from "./SearchDropdown";
import FilterDropdown from "./FilterDropdown";
import Tabs from "./Tabs";
import MapToggle from "./MapToggle";

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
  const { jobId } = useParams();
  const { venues, venuesLoading, variants = [] } = useEnquiryDetailStore();

  const [showOptions, setShowOptions] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Only-Invited");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Received");
  const [isMapView, setIsMapView] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const debounceTimer = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopFilterRef = useRef(null);
  const mobileFilterRef = useRef(null);

  const isInviteTab = activeTab === "Invite";

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
            {/* <EnquiryDetailTabs/> */}
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
                      className={`rounded-full px-5 py-2 cursor-pointer ${isActive
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
                      className={`rounded-full px-5 py-2 cursor-pointer ${isActive
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
        {isMapView ? <MapView /> : <div className="flex-1 px-4 mt-2">
          {!showDetailPage ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
              {isInviteTab ? (
                // ── Invite tab: venue cards from store ──
                venuesLoading ? (
                  <div className="col-span-2 flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#fd4304]" />
                  </div>
                ) : venues.length > 0 ? (
                  venues.map((venue, i) => (
                    <VenueCard
                      key={venue?._id || venue?.id || i}
                      venue={venue}
                      mode="invite"
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <p className="text-lg font-semibold">No nearby venues found.</p>
                  </div>
                )
              ) : (
                // ── Received tab: quotation cards ──
                variants.length > 0 ? (
                  // Deduplicate variants by venueId before rendering
                  variants
                    .filter((v, i, a) => {
                      const venueId = v?.variant_id?.packageId?.venueId?._id;
                      if (!venueId) return true;
                      return a.findIndex(vt => vt?.variant_id?.packageId?.venueId?._id === venueId) === i;
                    })
                    .map((variant, i) => (
                      <VenueCard
                        key={variant?._id || variant?.id || i}
                        variant={variant}
                        allVariants={variants}
                        mode="received"
                      />
                    ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <p className="text-lg font-semibold">No quotations available yet.</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <EnquiriesDetail />
          )}
        </div>}



      </div>
    </div>
  );
};

export default Quotationpage;
