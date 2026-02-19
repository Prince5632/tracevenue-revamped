import { Button, Modal } from "@shared/components/ui";
import { useState, useEffect } from "react";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import { ProgressBar } from '@/shared/components/feedback';
import { Download, Pencil, Loader2 } from 'lucide-react';
import jsPDF from "jspdf";
import { updateJob } from "@/features/venue/services/jobService";
import { useNavigate } from "react-router-dom";

function PreviewEnquiry({ job, isModalOpen, setIsModalOpen }) {
    const [isClick, setIsClick] = useState(false);
    const [isFocus, setIsFoucus] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [value, setValue] = useState(job?.name || "");
    const [editValue, setEditValue] = useState(job?.name || "");

    useEffect(() => {
        if (job?.name) {
            setValue(job.name);
            setEditValue(job.name);
        }
    }, [job]);

    const handlePencilButtonClick = () => {
        setEditValue(value);
        setIsClick(true);
    }
    const handleInputCancel = () => {
        setEditValue(value);
        setIsClick(false);
    }
    const handleInputChange = (e) => {
        setEditValue(e.target.value);
    }
    const handleEditInput = async () => {
        if (!editValue.trim()) return;
        setLoading(true);
        try {
            await updateJob(job._id, { name: editValue });
            setValue(editValue);
            setIsClick(false);
        } catch (error) {
            console.error("Error updating title:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRaiseEnquiry = async () => {
        setLoading(true);
        try {
            // Update job status to Active if it's Draft, or just proceed
            await updateJob(job._id, { status: "Active" });
            navigate(`/service/venues/enquiry/details/${job._id}`);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error raising enquiry:", error);
        } finally {
            setLoading(false);
        }
    };

    // download pdf
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text(value || "Enquiry Details", 10, 10);
        // TODO: Implement full PDF generation similar to customer side if needed
        doc.save(`${value || "enquiry"}.pdf`);
    };

    return <>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Preview Enquiry"
            size="md"
            className="w-[80%]!"
        >
            <Modal.Header>
                <div className='mb-6 flex flex-col lg:flex-row! items-center justify-between gap-6'>
                    <div className='flex-1 w-full flex gap-4 items-center'>
                        {
                            isClick ? <>
                                <div
                                    onFocus={() => setIsFoucus(true)}
                                    onBlur={() => setIsFoucus(false)}
                                    className={`h-[48px] w-full border-2 rounded-[10px] border-[#e0e0e0] flex items-center px-2 ${isFocus ? "border-[#ff4000]" : "border-[#e0e0e0]"}`}>
                                    <input type="text"
                                        value={editValue}
                                        className='h-[48px] w-full pl-2 text-[18px]! text-[#060606]! font-bold!'
                                        onChange={handleInputChange} />
                                    <div className='flex gap-2'>
                                        <Button onClick={handleEditInput} variant="primary" disabled={loading} className="rounded-[10px]! h-[34px] w-[34px] hover:scale-110 transition-all duration-300 ease-in ">
                                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <i class="fa-solid fa-check"></i>}
                                        </Button>
                                        <Button onClick={handleInputCancel} variant="secondary" className="rounded-[10px]! h-[34px] w-[34px] hover:scale-110 transition-all duration-300 ease-in">
                                            <i class="fa-solid fa-x"></i>
                                        </Button>
                                    </div>
                                </div>
                            </>
                                :
                                <>
                                    <Button onClick={handlePencilButtonClick} variant="gradient" className="border-none rounded-[10px]! h-[40px] w-[40px] shadow-[4px_0_8px_#ff400033] transition-all duration-300 ease-in shrink-0 bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)] text-[#ffffff]! border border-[rgb(255,64,0)] cursor-pointer hover:translate-y-[-2px] flex justify-center items-center" leftIcon={<Pencil />}>
                                    </Button>
                                    <h3 className='text-[20px] text-[#060606] font-bold'>{value}</h3>
                                </>
                        }
                    </div>
                    <Button variant="outline" onClick={downloadPdf} className="w-full lg:w-auto text-[16px]! text-[#ff4000] border border-solid border-[#ff4000] font-bold! rounded-[30px] p-[9px]  bg-white hover:bg-[#ffffff]! cursor-pointer">Download as PDF<Download /></Button>
                </div>
                <ProgressBar variant="gradient" value={100} className="mb-6" />
            </Modal.Header>
            <Modal.Body>
                <EnquiriesDetail job={job} />
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
                    className="
                  flex items-center justify-center
                  w-full
                  px-[20px] py-[12px]
                  text-[#ffffff] text-[16px]
                  bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)]
                  rounded-[30px] border border-[rgb(255,64,0)]
                  cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                  font-bold!  
                  sm:px-[32px] sm:py-[16px]
                  md:w-auto
                "
                >
                    {loading ? "Processing..." : "Get Best Quotes"}
                    {!loading && <i
                        class="
                    ml-1
                    text-[14px] text-[#ffffff]
                    transition-transform transition-all
                    fa-solid fa-arrow-right group-hover:translate-x-1 duration-300 ease-in font-extrabold!
                  "
                    ></i>}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default PreviewEnquiry;