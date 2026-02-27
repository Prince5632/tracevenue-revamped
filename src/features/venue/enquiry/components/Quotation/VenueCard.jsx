import React, { useState } from "react";
import CardImage from "@/assets/QuotationCard/QuotationCardIMG.png";
import RestaurantDetailModal from "../shared/RestaurantDetailModal";
import CelebrationMessage from "../shared/CelebrationMessage";
import ConfirmModal from "../shared/ConfirmModal";
import PackageModal from "../shared/AddPackagemodal";
import Gallery from "../Gallery";
import { MapPin, Users } from "lucide-react";
import useEnquiryDetailStore from "@/features/venue/enquiry/context/useEnquiryDetailStore";
import { useParams } from "react-router-dom";

/**
 * VenueCard — unified card for both Received and Invite tabs.
 *
 * Props:
 *  variant  — quotation object (Received tab, nested shape)
 *  venue    — venue object (Invite tab, flat by-location shape)
 *  mode     — "received" | "invite"  (default: "received")
 */
const VenueCard = ({ variant, venue: venueProp, allVariants = [], mode = "received" }) => {
    const { jobId } = useParams();
    const { sendInvite, invitedVenueIds, fetchRestaurantDetail } = useEnquiryDetailStore();

    const [showModal, setShowModal] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showPackageModal, setShowPackageModal] = useState(false);

    // ── Resolve data from either shape ─────────────────────────────
    const variantData = variant?.variant_id || {};
    const packageData = variantData?.packageId || {};
    const nestedVenue = packageData?.venueId || {};
    const venueData = venueProp || nestedVenue;

    const name = venueData?.restaurantName || variantData?.name || "Restaurant";
    const image = venueData?.bannerUrl?.url || venueData?.mediaUrl?.[0]?.url || CardImage;
    const rating = venueData?.rating || venueData?.averageRating || "4.5";
    const location = venueData?.locality?.short_name || venueData?.district || venueData?.streetAddress || name;

    const minPersons = variantData?.minPersons || venueData?.minPersons || venueData?.capacity?.min;
    const maxPersons = variantData?.maxPersons || venueData?.maxPersons || venueData?.capacity?.max;
    const guestCapacity =
        minPersons && maxPersons ? `${minPersons}–${maxPersons} guests`
            : minPersons ? `${minPersons}+ guests`
                : "– guests";

    const allCuisines = venueData?.allCuisines || [];
    const displayCuisines = allCuisines.slice(0, 2);

    const distanceRaw = variant?.distance || venueData?.distance;
    const distance = distanceRaw ? `${distanceRaw} km` : "";

    const lat = venueData?.location?.lt || venueData?.location?.lat;
    const lng = venueData?.location?.lg || venueData?.location?.lng;
    const directionsUrl = lat && lng
        ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
        : "#";

    const fromPrice = variantData?.cost || variantData?.costPerPerson || variantData?.minCost || null;
    const packageName = packageData?.name || null;

    // Shortlisted / Rejected — booleans on the outer variant wrapper
    const isShortlisted = variant?.isShortlisted ?? false;
    const isRejected = variant?.isRejected ?? false;

    // Gallery images from API
    const galleryImages = venueData?.mediaUrl || [];

    // ── Invite-specific state ───────────────────────────────────────
    const venueId = venueData?._id || venueData?.id;
    const inviteStatus = invitedVenueIds?.[venueId];
    const isSending = inviteStatus === "sending";
    const isSent = inviteStatus === "sent";

    // Reconstruct all variants for this specific venue layout
    const venueVariants = allVariants.filter(
        (v) => v?.variant_id?.packageId?.venueId?._id === venueId
    );

    const handleAskForQuote = () => {
        if (isSending || isSent) return;
        setShowConfirm(true);
    };

    const handleConfirmInvite = async () => {
        setShowConfirm(false);
        await sendInvite(venueId, jobId);
        setShowCelebration(true);
    };

    const isInvite = mode === "invite";

    return (
        <>
            <div className="rounded-[30px] border border-[#d7d9da] bg-[#ffffff] shadow-[0_4px_10px_#0000000d] flex flex-col gap-2 px-2 pb-2">
                {/* ── Status ribbon (Received only) ─── */}
                {!isInvite && (
                    <div className="h-[22px] rounded-br-3xl -ml-1.5 -mt-0.5">
                        <span className="bg-[#573BB6] text-white text-[14px] px-6 py-[2px] inline-block rounded-tl-3xl rounded-br-lg border-r-2 border-r-[#ffffff] -skew-x-12">
                            Shortlisted &#40;{isShortlisted ? 1 : 0}&#41;
                        </span>
                        <span className="bg-[#ff4000] text-white text-[14px] px-6 py-[2px] -skew-x-12 inline-block rounded-br-md">
                            Rejected &#40;{isRejected ? 1 : 0}&#41;
                        </span>
                    </div>
                )}

                <div className={`p-4 flex flex-col gap-4 ${isInvite ? "pt-5" : ""}`}>
                    {/* ── Image + Info ─── */}
                    <div className="flex items-start justify-between gap-4">
                        {/* Image — click opens Gallery */}
                        <img
                            src={image}
                            className="h-[96px] w-[96px] rounded-[16px] object-cover shrink-0 cursor-pointer"
                            alt={name}
                            onError={(e) => { e.target.src = CardImage; }}
                            onClick={() => setShowGallery(true)}
                        />

                        <div className="flex-1 flex justify-between items-start">
                            <div className="flex flex-col h-full items-start gap-1.5">
                                <h1 className="text-[20px] font-bold text-[#060606]">{name}</h1>
                                {packageName && (
                                    <p className="text-[13px] text-[#85878C] -mt-1">{packageName}</p>
                                )}
                                <div className="flex gap-2 flex-wrap">
                                    {displayCuisines.length > 0 ? (
                                        displayCuisines.map((cuisine, idx) => (
                                            <span key={idx} className="px-[12px] py-[2px] rounded-[30px] border border-[#D7D9DA] text-[14px] font-semibold shadow-[0_4px_10px_#0000000d]">
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

                    {/* ── Location + Directions ─── */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-1">
                                <MapPin size={14} color="#85878C" />
                                <p className="text-[16px] text-[#85878C] font-semibold">{location}</p>
                            </div>
                            {<div className="flex items-center gap-1">
                                <Users size={14} color="#85878C" />
                                <p className="text-[16px] text-[#85878C] font-semibold">{guestCapacity}</p>
                            </div>}
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="h-[22px] w-[22px] bg-[#15B076] text-white flex justify-center items-center rounded-full">
                                <i className="fa-solid fa-location-arrow text-[11px]" />
                            </div>
                            <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
                                className="text-[16px] font-semibold underline text-[#15B076]">
                                Directions
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── CTA Footer ─── */}
                {isInvite ? (
                    /* Invite: two buttons — Ask for Quote + View */
                    <div className="flex gap-2 p-2 mt-4">
                        <button
                            onClick={handleAskForQuote}
                            disabled={isSending || isSent}
                            className={`flex-1 py-2 rounded-[16px] text-[15px] font-semibold border transition-all
                                ${isSent
                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "bg-white text-[#FF4000] border-[#FF4000] hover:bg-[#fff5f0]"
                                }`}
                        >
                            {isSending ? "Sending…" : isSent ? "Invite Sent" : "Ask for Quote"}
                        </button>
                        <button
                            onClick={() => {
                                if (venueData?._id) fetchRestaurantDetail(venueData._id);
                                setShowModal(true);
                            }}
                            className="flex-1 py-2 rounded-[16px] text-[15px] font-semibold border border-[#FF4000] text-[#FF4000] bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] hover:opacity-90"
                        >
                            View
                        </button>
                    </div>
                ) : (
                    /* Received: single View Quotations button */
                    <div
                        className="flex items-center w-full py-3 mx-0 my-0 bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] rounded-[20px] cursor-pointer relative"
                        onClick={() => setShowPackageModal(true)}
                    >
                        <div className="flex-1 flex justify-center items-center">
                            <span className="text-[15px] sm:text-[16px] font-bold text-[#FF4000]">
                                View Quotations
                            </span>
                        </div>

                        <div className="w-px h-[20px] bg-[#ff400040]" />

                        <div className="flex-1 flex justify-center items-center pl-2 pr-10 relative">
                            {fromPrice && (
                                <span className="text-[15px] sm:text-[16px] font-bold text-[#FF4000] italic truncate">
                                    From &#8377;{Number(fromPrice).toLocaleString("en-IN")}
                                </span>
                            )}
                            <div className="absolute right-3 h-[24px] w-[24px] border border-[#FF4000] rounded-full flex justify-center items-center bg-white shrink-0">
                                <i className="fa-solid fa-arrow-right text-[12px] text-[#FF4000]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RestaurantDetailModal */}
            {showModal && <RestaurantDetailModal onClose={() => setShowModal(false)} isInvited={isSent} />}

            {/* Package Variants Modal */}
            <PackageModal
                isOpen={showPackageModal}
                onClose={() => setShowPackageModal(false)}
                variants={venueVariants}
                venueName={name}
            />

            {/* ── Confirmation Dialog ── */}
            {showConfirm && (
                <ConfirmModal
                    title="Are you sure?"
                    message={`Let's see what they've got! Proceed with requesting a quote from ${name}?`}
                    onConfirm={handleConfirmInvite}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {/* ── Celebration overlay ── */}
            {showCelebration && (
                <CelebrationMessage
                    title="Invitations sent successfully"
                    onClose={() => setShowCelebration(false)}
                />
            )}

            {/* Gallery overlay */}
            {showGallery && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[24px] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 relative">
                        <button
                            onClick={() => setShowGallery(false)}
                            className="absolute top-3 right-3 bg-white h-8 w-8 rounded-full flex items-center justify-center shadow font-extrabold z-10 text-gray-600 hover:text-[#FF4000]"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-bold mb-3">{name} — Gallery</h2>
                        <Gallery images={galleryImages} onClose={() => setShowGallery(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default VenueCard;
