import React, { useState } from "react";
import Overview from "../../Overview";
import Gallery from "../../Gallery";
import VenueMap from "../../VenueMap";
import { createPortal } from "react-dom";

const RestaurantDetailModal = ({onClose}) => {

    const [tab, setTab] = useState("overview");

   

    return createPortal(
        
   
       
                <div className="w-screen h-screen bg-[#00000030] fixed z-[9999] top-0 left-0 flex justify-end">
                    <div className="h-full md:w-1/2 sm:w-full w-full bg-white p-5 overflow-y-auto">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-[#060606] text-[24px] font-bold">
                                    Moti Mahal Delux
                                </h2>
                                <p className="text-[#85878C] text-[14px]font-semibold pb-4">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard.
                                </p>
                            </div>
                            <div
                                onClick={() => onClose(false)}
                                className="h-6 w-6 cursor-pointer font-bold"
                            >
                                ✕
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <span
                                onClick={() => setTab("overview")}
                                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${tab === "overview" ? " text-black" : "text-[#5C5F62]"
                                    }`}
                            >
                                Overview
                            </span>

                            <span
                                onClick={() => setTab("gallery")}
                                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${tab === "gallery" ? " text-black" : "text-[#5C5F62]"
                                    }`}
                            >
                                Gallery
                            </span>

                            <span
                                onClick={() => setTab("map")}
                                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${tab === "map" ? "text-black" : "text-[#5C5F62]"
                                    }`}
                            >
                                Map
                            </span>
                        </div>

                        <div className="w-full h-[4px] bg-gray-200 mt-1 rounded-full">
                            <div
                                className={`h-full bg-orange-500 rounded-full transition-all duration-300 ${tab === "overview"
                                    ? "w-[95px]"
                                    : tab === "gallery"
                                        ? "w-[80px] ml-[102px]"
                                        : "w-[50px] ml-[194px]"
                                    }`}
                            ></div>
                        </div>

                        {tab === "overview" && <Overview />}
                        {tab === "gallery" && <Gallery />}
                        {tab === "map" && <VenueMap />}
                    </div>
                </div>
                ,document.body
     
        
    );
};

export default RestaurantDetailModal;
