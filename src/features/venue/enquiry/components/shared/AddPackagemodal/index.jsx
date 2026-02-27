import React from "react";
import PackageCard from "../../CustomerCard";
import SearchIcon from "@assets/PackageModal/PackageModalSearchIcon.png";
import { Modal } from "@/shared";
import { createPortal } from "react-dom";
const PackageModal = ({ onClose, isOpen, variants = [] }) => {
  console.log(variants, "dxfgchjb");
  return createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={true}
      title="All Packages"
      description="Select the perfect package variant for this venue."
      className="!fixed !top-0 !right-0 !bottom-0 !h-full !w-full md:!w-[60%] !m-0 !p-0 !max-h-none !inset-y-0 !overflow-hidden !border-none"
    >
      <div className="flex flex-col h-full w-full bg-white overflow-hidden shadow-xl">
        <div className="p-5 flex flex-col shrink-0 bg-white z-10 border-b border-gray-100">
          <div className="max-w-[907px] h-[47px] py-[11px] px-[20px] gap-[10px] bg-white border border-[#D7D9DA] rounded-[30px] flex items-center">
            <img src={SearchIcon} alt="" />
            <input
              type="text"
              placeholder="Search Packages..."
              className="w-full text-[16px] text-[#85878C] outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 bg-white">
          <div className="px-5 pt-4 pb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              {variants.length > 0 ? (
                variants.map((variant, index) => {
                  const pData = variant?.variant_id?.packageId || {};
                  const vData = variant?.variant_id || {};
                  return (
                    <PackageCard
                      key={variant._id || index}
                      title={vData?.name || "Package Variant"}
                      subtitle={variant?.restaurantName || pData?.venueId?.restaurantName || ""}
                      cuisines={pData?.cuisines || pData?.venueId?.allCuisines?.slice(0, 2) || []}
                      priceText={`₹${vData?.cost || vData?.costPerPerson || 0}`}
                      image={pData?.mediaUrl?.[0]?.url || pData?.venueId?.bannerUrl?.url || ""}
                      stats={vData?.stats}
                      description="Per Plate"
                    />
                  );
                })
              ) : (
                <div className="col-span-1 md:col-span-2 text-center text-gray-500 py-10">
                  No package variants available for this venue.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>,
    document.body,
  );
};

export default PackageModal;
