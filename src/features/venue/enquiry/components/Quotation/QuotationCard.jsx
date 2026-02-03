import React from 'react'
import CardImage from "@/assets/QuotationCard/QuotationCardIMG.png"
import ArrowImage from "@assets/QuotationCard/QuotationsArrow.png"
import RatingImage from "@assets/QuotationCard/QuotationRating.png"
import DirectionImage from "@assets/QuotationCard/QuotationDirectionLogo.png"
const QuotationCard = () => {
    return <>
        <div className=" w-full max-w-[446px] mt-[80px] ml-[40px] h-[271px] top-[346px] rounded-[30px] p-6  border-[1px] border-[#D7D9DA] shadow-[0_4px_10px_#000000]">
            <div className="flex  w-full">

                <div className="w-[96px] h-[96px]  left-[30px] ">
                    <img className="w-full h-full " src={CardImage} alt="" />
                    <div className="flex mt-4.5 ">


                        <svg className="mt-1 shrink-0" width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3334 6.00008C11.3334 9.32875 7.64075 12.7954 6.40075 13.8661C6.28523 13.9529 6.14461 13.9999 6.00008 13.9999C5.85555 13.9999 5.71493 13.9529 5.59941 13.8661C4.35941 12.7954 0.666748 9.32875 0.666748 6.00008C0.666748 4.58559 1.22865 3.22904 2.22885 2.22885C3.22904 1.22865 4.58559 0.666748 6.00008 0.666748C7.41457 0.666748 8.77112 1.22865 9.77132 2.22885C10.7715 3.22904 11.3334 4.58559 11.3334 6.00008Z" stroke="#85878C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.99878 8C7.10335 8 7.99878 7.10457 7.99878 6C7.99878 4.89543 7.10335 4 5.99878 4C4.89421 4 3.99878 4.89543 3.99878 6C3.99878 7.10457 4.89421 8 5.99878 8Z" stroke="#85878C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="ml-2 text-[16px]  text-[#85878C] w-[170px] shrink-0">Sector 7, Chandigarh</span>

                         <img className="ml-[80px] w-[22px] h-[22px] rounded-[11px]" src={DirectionImage} alt="" />

                         <a className=" font-semibold !underline !text-[#15B076] ml-1" href="#">Directions</a>

                    </div>
                    <div className="flex mt-1">
                        <svg className="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6654 14V12.6667C10.6654 11.9594 10.3844 11.2811 9.88432 10.781C9.38422 10.281 8.70594 10 7.9987 10H3.9987C3.29145 10 2.61318 10.281 2.11308 10.781C1.61298 11.2811 1.33203 11.9594 1.33203 12.6667V14" stroke="#85878C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.668 2.08545C11.2398 2.2337 11.7462 2.56763 12.1078 3.03482C12.4693 3.50202 12.6654 4.07604 12.6654 4.66678C12.6654 5.25752 12.4693 5.83154 12.1078 6.29874C11.7462 6.76594 11.2398 7.09987 10.668 7.24812" stroke="#85878C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.668 13.9998V12.6664C14.6675 12.0756 14.4709 11.5016 14.1089 11.0346C13.7469 10.5677 13.2401 10.2341 12.668 10.0864" stroke="#85878C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.9987 7.33333C7.47146 7.33333 8.66536 6.13943 8.66536 4.66667C8.66536 3.19391 7.47146 2 5.9987 2C4.52594 2 3.33203 3.19391 3.33203 4.66667C3.33203 6.13943 4.52594 7.33333 5.9987 7.33333Z" stroke="#85878C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="ml-2 text-[16px]  text-[#85878C] w-[170px] shrink-0">200-500 guests</span>

                    </div>
                    <div className="w-[420px] h-[50px]  rounded-[20px] mt-6 pt-[15px] pr-[20px] pb-[15px]  bg-gradient-to-b from-[#FFF3EA] to-[#FDEAED] flex justify-between -ml-3">

                        <button
                            className="font-semibold w-full ml-3 items-center text-[#FF4000] flex justify-between cursor-pointer ">
                            <span className="pl-1.5">View Quotations</span>

                            <img src={ArrowImage} alt="" />
                        </button>
                    </div>

                </div>

                <div>

                    <div className="w-full h-[25px] ml-3 text-[20px] font-bold flex-1 ">Moti Mahal Delux</div>

                    <div className="flex gap-2 ml-3.5 mt-3.5">


                        <div className="w-[101px] h-[27px] rounded-[30px] border-[1px] border-[#D7D9DA] ">
                            <span className="px-[5px] py-[12px] font-semibold text-[#060606]">Continental</span>

                            <img src="" alt="" />
                        </div>

                        <div className="w-[88px] h-[27px] border-[1px] border-[#D7D9DA] rounded-[30px]" >

                            <span className="px-[5px] py-[12px] font-semibold text-[#060606]">Fast Food</span>
                        </div>
                    </div>
                    <div><img src={RatingImage} alt="" /></div>
                </div>

                <div className=" ml-[40px] w-[50px] h-[17px] text-[14px] font-semibold text-[#85878C]">2.4 km</div>
            </div>

        </div>
    </>
}

export default QuotationCard
