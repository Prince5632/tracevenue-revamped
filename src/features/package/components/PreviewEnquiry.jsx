import { Button, Modal } from "@shared/components/ui";
import { useState } from "react";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import { ProgressBar } from '@/shared/components/feedback';
import { Download, Pencil } from 'lucide-react';
import jsPDF from "jspdf";

function PreviewEnquiry({ isModalOpen, setIsModalOpen }) {
    const [isClick, setIsClick] = useState(false);
    const [isFocus, setIsFoucus] = useState(false);

    let heading = "Looking venue for birthday party for 50 people on 27 feb, 2026.";
    const [value, setValue] = useState(heading);        // saved value
    const [editValue, setEditValue] = useState(heading); // temp value

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
    const handleEditInput = () => {
        setValue(editValue);
        setIsClick(false);
    }

    // download pdf
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text("Hello, this is a dynamic PDF", 10, 10);
        doc.save("my-file.pdf");
    };
    return <>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Preview Enquiry"
            size="md"
            className="!w-[80%]"
        >
            <Modal.Header>
                <div className='mb-6 flex flex-col lg:!flex-row items-center justify-between gap-6'>
                    <div className='flex-1 w-full flex gap-4 items-center'>
                        {
                            isClick ? <>
                                <div
                                    onFocus={() => setIsFoucus(true)}
                                    onBlur={() => setIsFoucus(false)}
                                    className={`h-[48px] w-full border-2 rounded-[10px] border-[#e0e0e0] flex items-center px-2 ${isFocus ? "border-[#ff4000]" : "border-[#e0e0e0]"}`}>
                                    <input type="text"
                                        value={editValue}
                                        className='h-[48px] w-full pl-2 !text-[18px] !text-[#060606] !font-bold'
                                        onChange={handleInputChange} />
                                    <div className='flex gap-2'>
                                        <Button onClick={handleEditInput} variant="primary" className="!rounded-[10px] h-[34px] w-[34px] hover:scale-110 transition-all duration-300 ease-in ">
                                            <i class="fa-solid fa-check"></i>
                                        </Button>
                                        <Button onClick={handleInputCancel} variant="secondary" className="!rounded-[10px] h-[34px] w-[34px] hover:scale-110 transition-all duration-300 ease-in">
                                            <i class="fa-solid fa-x"></i>
                                        </Button>
                                    </div>
                                </div>
                            </>
                                :
                                <>
                                    <Button onClick={handlePencilButtonClick} variant="gradient" className="border-none !rounded-[10px] h-[40px] w-[40px] shadow-[4px_0_8px_#ff400033] transition-all duration-300 ease-in shrink-0 bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)] !text-[#ffffff] border border-[rgb(255,64,0)] cursor-pointer hover:translate-y-[-2px] flex justify-center items-center" leftIcon={<Pencil />}>
                                    </Button>
                                    <h3 className='text-[20px] text-[#060606] font-bold'>{value}</h3>
                                </>
                        }
                    </div>
                    <Button variant="outline" onClick={downloadPdf} className="w-full lg:w-auto !text-[16px] text-[#ff4000] border border-solid border-[#ff4000] !font-bold rounded-[30px] p-[9px]  bg-white hover:!bg-[#ffffff] cursor-pointer">Download as PDF<Download /></Button>
                </div>
                <ProgressBar variant="gradient" value={100} className="mb-6" />
            </Modal.Header>
            <Modal.Body>
                <EnquiriesDetail />
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="!text-[16px] !font-semibold text-[#ff4000] !px-[30px] !py-[12px]"
                >
                    Close
                </Button>
                <Button
                    variant="gradient"
                    className="
                  flex items-center justify-center
                  w-full
                  px-[20px] py-[12px]
                  text-[#ffffff] text-[16px]
                  bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)]
                  rounded-[30px] border border-[rgb(255,64,0)]
                  cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                  !font-bold  
                  sm:px-[32px] sm:py-[16px]
                  md:w-auto
                "
                >
                    Get Best Quotes
                    <i
                        class="
                    ml-1
                    text-[14px] text-[#ffffff]
                    transition-transform transition-all
                    fa-solid fa-arrow-right group-hover:translate-x-1 duration-300 ease-in !font-extrabold
                  "
                    ></i>
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default PreviewEnquiry;