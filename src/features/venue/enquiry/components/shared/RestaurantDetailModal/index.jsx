import React, { useState, useEffect } from "react";
import Overview from "../../Overview";
import Gallery from "../../Gallery";
import VenueMap from "../../VenueMap";
import { createPortal } from "react-dom";
import useEnquiryDetailStore from "@/features/venue/enquiry/context/useEnquiryDetailStore";
import { Loader2 } from "lucide-react";

const RestaurantDetailModal = ({ onClose }) => {
    const { restaurantDetail, restaurantDetailLoading, restaurantDetailError, clearRestaurantDetail } = useEnquiryDetailStore();
    const [tab, setTab] = useState("overview");

    useEffect(() => {
        // Cleanup store data on unmount
        return () => clearRestaurantDetail();
    }, [clearRestaurantDetail]);

    return createPortal(
        <div className="w-screen h-screen bg-[#00000030] fixed z-[9999] top-0 left-0 flex justify-end">
            <div className="h-full md:w-1/2 sm:w-full w-full bg-white p-5 overflow-y-auto">
                {restaurantDetailLoading && (
                    <div className="flex h-full items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#FF4000]" />
                    </div>
                )}

                {!restaurantDetailLoading && restaurantDetailError && (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
                            <p className="text-gray-600">Failed to load restaurant details.</p>
                            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Close</button>
                        </div>
                    </div>
                )}

                {!restaurantDetailLoading && !restaurantDetailError && restaurantDetail && (
                    <>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-[#060606] text-[24px] font-bold">
                                    {restaurantDetail.restaurantName}
                                </h2>
                                <p className="text-[#85878C] text-[14px] font-semibold pb-4">
                                    {restaurantDetail.streetAddress || `${restaurantDetail.district || ''}, ${restaurantDetail.state || ''}`}
                                </p>
                            </div>
                            <div
                                onClick={onClose}
                                className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer font-bold text-gray-500 transition-colors"
                            >
                                ✕
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <span
                                onClick={() => setTab("overview")}
                                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${tab === "overview" ? " text-black" : "text-[#5C5F62]"}`}
                            >
                                Overview
                            </span>

                            <span
                                onClick={() => setTab("gallery")}
                                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${tab === "gallery" ? " text-black" : "text-[#5C5F62]"}`}
                            >
                                Gallery
                            </span>

                            <span
                                onClick={() => setTab("map")}
                                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${tab === "map" ? "text-black" : "text-[#5C5F62]"}`}
                            >
                                Map
                            </span>
                        </div>

                        <div className="w-full h-[4px] bg-gray-200 mt-1 rounded-full relative">
                            <div
                                className={`absolute left-0 top-0 h-full bg-[#FF4000] rounded-full transition-all duration-300 ${tab === "overview" ? "w-[85px] translate-x-1" :
                                        tab === "gallery" ? "w-[65px] translate-x-[102px]" :
                                            "w-[50px] translate-x-[185px]"
                                    }`}
                            />
                        </div>

                        <div className="mt-6">
                            {tab === "overview" && <Overview details={restaurantDetail} />}
                            {tab === "gallery" && <Gallery images={restaurantDetail?.mediaUrl} />}
                            {tab === "map" && <VenueMap location={restaurantDetail?.location} address={restaurantDetail?.streetAddress} />}
                        </div>
                    </>
                )}
            </div>
        </div>
        , document.body
    );
};

export default RestaurantDetailModal;
