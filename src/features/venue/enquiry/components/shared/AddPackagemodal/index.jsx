import React from "react";
import PackageCard from "../../CustomerCard";
import SearchIcon from "@assets/PackageModal/PackageModalSearchIcon.png";
import { Modal } from "@/shared";
import { createPortal } from "react-dom";
const PackageModal = ({ onClose, isOpen }) => {
  const dummyPackages = [1, 2, 3, 4, 5, 6];

  return createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={true}
      title="All Packages"
      description=" Lorem Ipsum is simply dummy text of the printing and typesetting
            industry."
      className="!fixed !top-0 !right-0 !bottom-0 !h-full !w-full md:!w-[60%] !m-0 !p-0 !max-h-none !inset-y-0 !overflow-hidden !border-none"
    >
      <div className="flex flex-col h-full w-full bg-white overflow-hidden shadow-xl">
        <div className="p-5 flex flex-col shrink-0 bg-white z-10 border-b border-gray-100">
          {/* <h2 className="text-[#060606] text-[24px] font-bold">All Packages</h2>
          <p className="text-[#85878C] text-[14px] font-semibold pb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}

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
              {dummyPackages.map((item, index) => (
                <PackageCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>,
    document.body,
  );
};

export default PackageModal;
