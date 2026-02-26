import { Button, Modal } from "@shared/components/ui";
import { useState, useEffect, useRef } from "react";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import { ProgressBar } from '@/shared/components/feedback';
import { Download, Pencil, Loader2, X } from 'lucide-react';
import { updateJob } from "@/features/venue/services/jobService";
import { useAuth } from "@/features/auth/context/useAuthStore.jsx";
import { useRaiseEnquiry } from "@/features/venue/enquiry/utils/raiseEnquiry";
import { handleEnquiryDownloadPDF } from "@/features/venue/enquiry/utils/enquiryPdfGenerator";
import Login from "@/features/auth/components/Login";

/** Auto-generate a title like "Looking for Wedding for 50 people on 28 Feb." */
const generateEnquiryTitle = (enquiry) => {
    const eventName =
        enquiry?.eventType?.eventName ||
        enquiry?.eventType?.label ||
        (typeof enquiry?.eventType === "string" ? enquiry.eventType : null);
    const maxPeople = enquiry?.peopleRange?.maxPeople;
    const firstDate = enquiry?.eventDateOptions?.preferredDates?.[0]?.date;
    const dateStr = firstDate
        ? new Date(firstDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
        : null;

    if (!eventName) return enquiry?.name || "My Enquiry";
    return `Looking for ${eventName}${maxPeople ? ` for ${maxPeople} people` : ""}${dateStr ? ` on ${dateStr}` : ""}.`;
};

function PreviewEnquiry({ enquiry, cuisineMenu, cuisineServices, cuisineNames, isModalOpen, setIsModalOpen }) {
    const [isClick, setIsClick] = useState(false);
    const [isFocus, setIsFoucus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { isLoggedIn } = useAuth();
    const { raiseEnquiry } = useRaiseEnquiry();
    const pendingActionRef = useRef(null);

    // After inline login succeeds — fire pending raise enquiry
    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        if (pendingActionRef.current) {
            const action = pendingActionRef.current;
            pendingActionRef.current = null;
            action();
        }
    };

    // Use saved name if set and not the default, otherwise auto-generate
    const getTitle = (e) =>
        e?.name && e.name !== "Untitled Enquiry" ? e.name : generateEnquiryTitle(e);

    const [value, setValue] = useState(() => getTitle(enquiry));
    const [editValue, setEditValue] = useState(() => getTitle(enquiry));

    useEffect(() => {
        const t = getTitle(enquiry);
        setValue(t);
        setEditValue(t);
    }, [enquiry]);

    // Merge enquiry data with cuisine-package fallbacks
    const mergedEnquiry = {
        ...enquiry,
        name: value,
        menuSections: enquiry?.menuSections?.length ? enquiry.menuSections : (cuisineMenu || []),
        services: enquiry?.services?.length ? enquiry.services : (cuisineServices || []),
        cuisines: enquiry?.cuisines?.length ? enquiry.cuisines : (cuisineNames || []),
    };

    const handlePencilButtonClick = () => {
        setEditValue(value);
        setIsClick(true);
    };
    const handleInputCancel = () => {
        setEditValue(value);
        setIsClick(false);
    };
    const handleInputChange = (e) => setEditValue(e.target.value);

    const handleEditInput = async () => {
        if (!editValue.trim()) return;
        setLoading(true);
        try {
            await updateJob(enquiry._id, { name: editValue });
            setValue(editValue);
            setIsClick(false);
        } catch (error) {
            console.error("Error updating title:", error);
        } finally {
            setLoading(false);
        }
    };

    const doRaiseEnquiry = async () => {
        setLoading(true);
        try {
            await raiseEnquiry(value, mergedEnquiry, enquiry._id);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error raising enquiry:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRaiseEnquiry = async () => {
        if (!isLoggedIn) {
            pendingActionRef.current = doRaiseEnquiry;
            setShowLoginModal(true);
            return;
        }
        doRaiseEnquiry();
    };

    const downloadPdf = async () => {
        if (pdfLoading) return;
        setPdfLoading(true);
        try {
            await handleEnquiryDownloadPDF({
                job: mergedEnquiry,
                logoUrl: "/logo.png",
                userName: undefined,
            });
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            setPdfLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Preview Enquiry"
                size="md"
                className="w-[80%]!"
            >
                <Modal.Header>
                    {/* Top row: title editor + close button */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex-1 flex gap-3 items-center min-w-0">
                            {isClick ? (
                                <div
                                    onFocus={() => setIsFoucus(true)}
                                    onBlur={() => setIsFoucus(false)}
                                    className={`h-[48px] w-full border-2 rounded-[10px] flex items-center px-2 ${isFocus ? "border-[#ff4000]" : "border-[#e0e0e0]"}`}
                                >
                                    <input
                                        type="text"
                                        value={editValue}
                                        autoFocus
                                        className="h-[48px] w-full pl-2 text-[18px]! text-[#060606]! font-bold!"
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => e.key === "Enter" && handleEditInput()}
                                    />
                                    <div className="flex gap-2 shrink-0">
                                        <Button onClick={handleEditInput} variant="primary" disabled={loading} className="rounded-[10px]! h-[34px] w-[34px] hover:scale-110 transition-all duration-300">
                                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <i className="fa-solid fa-check" />}
                                        </Button>
                                        <Button onClick={handleInputCancel} variant="secondary" className="rounded-[10px]! h-[34px] w-[34px] hover:scale-110 transition-all duration-300">
                                            <i className="fa-solid fa-x" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        onClick={handlePencilButtonClick}
                                        variant="gradient"
                                        className="border-none rounded-[10px]! h-[36px] w-[36px] shrink-0 bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)] text-[#ffffff]! cursor-pointer hover:translate-y-[-2px] flex justify-center items-center transition-all duration-300"
                                        leftIcon={<Pencil className="w-4 h-4" />}
                                    />
                                    <h3 className="text-[18px] text-[#060606] font-bold truncate">{value}</h3>
                                </>
                            )}
                        </div>

                        {/* Download + Close buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                            <Button
                                variant="outline"
                                onClick={downloadPdf}
                                disabled={pdfLoading}
                                className="hidden sm:flex text-[14px]! text-[#ff4000] border border-solid border-[#ff4000] font-bold! rounded-[30px] px-[14px] py-[8px] bg-white hover:bg-[#ffffff]! cursor-pointer items-center gap-2"
                            >
                                {pdfLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Download className="w-4 h-4" /> Download PDF</>}
                            </Button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex items-center justify-center h-[36px] w-[36px] rounded-full bg-[#f5f5f5] hover:bg-[#ffe5de] text-[#666] hover:text-[#ff4000] transition-all duration-200 cursor-pointer"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile: Download button full-width */}
                    <Button
                        variant="outline"
                        onClick={downloadPdf}
                        disabled={pdfLoading}
                        className="sm:hidden w-full text-[14px]! text-[#ff4000] border border-solid border-[#ff4000] font-bold! rounded-[30px] py-[9px] bg-white hover:bg-[#ffffff]! cursor-pointer mb-4"
                    >
                        {pdfLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Download className="w-4 h-4" /> Download as PDF</>}
                    </Button>

                    <ProgressBar variant="gradient" value={100} className="mb-2" />
                </Modal.Header>

                <Modal.Body>
                    <EnquiriesDetail
                        jobData={mergedEnquiry}
                        packageMenu={cuisineMenu}
                        packageServices={cuisineServices}
                        packageCuisines={cuisineNames}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        className="text-[16px]! font-semibold! text-[#ff4000] px-[30px]! py-[12px]!"
                    >
                        Close
                    </Button>
                    <Button
                        variant="gradient"
                        onClick={handleRaiseEnquiry}
                        disabled={loading}
                        className="flex items-center justify-center w-full px-[20px] py-[12px] text-[#ffffff] text-[16px] bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)] rounded-[30px] border border-[rgb(255,64,0)] cursor-pointer transition-all shadow-[0_6px_28px_#ff400073] font-bold! sm:px-[32px] sm:py-[16px] md:w-auto"
                    >
                        {loading ? "Processing..." : "Get Best Quotes"}
                        {!loading && <i className="ml-1 text-[14px] text-[#ffffff] fa-solid fa-arrow-right group-hover:translate-x-1 duration-300 ease-in font-extrabold!" />}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Inline login modal — no page reload */}
            {showLoginModal && (
                <div
                    className="fixed inset-0 z-999999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setShowLoginModal(false)}
                >
                    <Login
                        onLoginSuccess={handleLoginSuccess}
                        onClose={() => setShowLoginModal(false)}
                        type="login"
                    />
                </div>
            )}
        </>
    );
}
export default PreviewEnquiry;
