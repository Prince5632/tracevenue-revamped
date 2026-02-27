import React, { useState } from "react";
import CardImage from "@/assets/QuotationCard/QuotationCardIMG.png";
import RestaurantDetailModal from "../shared/RestaurantDetailModal";
import { MapPin, Users } from "lucide-react";

const QuotationCard = ({ variant, venue: venueProp }) => {
  const [showModal, setShowModal] = useState(false);

  // Support two data shapes:
  //  1. Invite tab  → `venue` prop (flat object from by-location API)
  //  2. Received tab → `variant` prop (nested: variant_id → packageId → venueId)
  const variantData = variant?.variant_id || {};
  const packageData = variantData?.packageId || {};
  const nestedVenue = packageData?.venueId || {};
  // flat venue wins when provided
  const venueData = venueProp || nestedVenue;

  const name = venueData?.restaurantName || variantData?.name || "Restaurant";
  const image =
    venueData?.bannerUrl?.url ||
    venueData?.mediaUrl?.[0]?.url ||
    CardImage;
  const rating = venueData?.rating || venueData?.averageRating || "4.5";
  const location =
    venueData?.streetAddress ||
    venueData?.locality?.short_name ||
    venueData?.district ||
    "Location N/A";

  const minPersons = variantData?.minPersons || venueData?.minPersons || venueData?.capacity?.min;
  const maxPersons = variantData?.maxPersons || venueData?.maxPersons || venueData?.capacity?.max;
  const guestCapacity =
    minPersons && maxPersons
      ? `${minPersons}–${maxPersons} guests`
      : minPersons
        ? `${minPersons}+ guests`
        : "– guests";

  const allCuisines = venueData?.allCuisines || [];
  const displayCuisines = allCuisines.slice(0, 2);

  const distanceRaw = variant?.distance || venueData?.distance;
  const distance = distanceRaw ? `${distanceRaw} km` : "";

  const lat = venueData?.location?.lt || venueData?.location?.lat;
  const lng = venueData?.location?.lg || venueData?.location?.lng;
  const directionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : "#";

  const fromPrice = variantData?.costPerPerson || variantData?.minCost || null;

  return (
    <>
      <div className="rounded-[30px] border border-[#d7d9da] bg-[#ffffff] shadow-[0_4px_10px_#0000000d] flex flex-col gap-2 px-2 pb-2">
        {/* Status ribbon */}
        <div className="h-[22px] rounded-br-3xl -ml-1.5 -mt-0.5">
          <span className="bg-[#573BB6] text-white text-[14px] px-6 py-[2px] inline-block rounded-tl-3xl rounded-br-lg border-r-2 border-r-[#ffffff] -skew-x-12">
            Shortlisted &#40;{variant?.shortlistedCount ?? 0}&#41;
          </span>
          <span className="bg-[#ff4000] text-white text-[14px] px-6 py-[2px] -skew-x-12 inline-block rounded-br-md">
            Rejected &#40;{variant?.rejectedCount ?? 0}&#41;
          </span>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Top row: image + info */}
          <div className="flex items-start justify-between gap-4">
            <img
              src={image}
              className="h-[96px] w-[96px] rounded-[16px] object-cover shrink-0"
              alt={name}
              onError={(e) => { e.target.src = CardImage; }}
            />
            <div className="flex-1 flex justify-between items-start">
              <div className="flex flex-col h-full items-start gap-1.5">
                <h1 className="text-[20px] font-bold text-[#060606]">{name}</h1>
                <div className="flex gap-2 flex-wrap">
                  {displayCuisines.length > 0 ? (
                    displayCuisines.map((cuisine, idx) => (
                      <span
                        key={idx}
                        className="px-[12px] py-[2px] rounded-[30px] border border-[#D7D9DA] text-[14px] font-semibold shadow-[0_4px_10px_#0000000d]"
                      >
                        {cuisine}
                      </span>
                    ))
                  ) : (
                    <span className="px-[12px] py-[2px] rounded-[30px] border border-[#D7D9DA] text-[14px] font-semibold shadow-[0_4px_10px_#0000000d]">
                      Restaurant
                    </span>
                  )}
                </div>
                <span className="rounded-[30px] py-[2px] px-[10px] bg-white text-[14px] font-semibold text-[#060606] shadow-[0_4px_10px_#0000000d]">
                  <i className="fa-solid fa-star text-[14px] text-[#FCDA00] mr-1" />
                  {rating}
                </span>
              </div>
              <span className="text-[14px] font-semibold text-[#85878C] shrink-0">{distance}</span>
            </div>
          </div>

          {/* Bottom row: location + directions */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex justify-start items-center gap-1">
                <MapPin size={14} color="#85878C" />
                <p className="text-[16px] text-[#85878C] font-semibold">{location}</p>
              </div>
              <div className="flex justify-start items-center gap-1">
                <Users size={14} color="#85878C" />
                <p className="text-[16px] text-[#85878C] font-semibold">{guestCapacity}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-normal items-center">
              <div className="h-[22px] w-[22px] bg-[#15B076] text-white flex justify-center items-center rounded-full">
                <i className="fa-solid fa-location-arrow text-[11px]" />
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] font-semibold underline text-[#15B076]"
              >
                Directions
              </a>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className="flex justify-between items-center p-2 bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] rounded-[20px] cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <button className="text-[16px] font-semibold text-[#FF4000] pl-4 py-1">
            View Quotations
          </button>
          {fromPrice && (
            <button className="text-[16px] font-semibold text-[#FF4000] italic border-l border-l-[#ff400027] pl-6 py-1">
              From &#8377;{Number(fromPrice).toLocaleString("en-IN")}
            </button>
          )}
          <button className="h-[22px] w-[22px] border border-[#FF4000] rounded-full px-[3px] flex justify-center items-center bg-[#ffffff]">
            <i className="fa-solid fa-arrow-right text-[11px] text-[#FF4000]" />
          </button>
        </div>
      </div>

      {showModal && (
        <RestaurantDetailModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default QuotationCard;
