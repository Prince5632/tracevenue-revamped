import React from "react";
import CustomerCardImage from "@assets/CustomerCard/CustomerCardIMG.png";
import CustomerCardMessageImage from "@assets/CustomerCard/CustomerCardMessageIcon.png";
import { Badge, Button, Card } from "@/shared";
const PackageCard = () => {
  return (
    <>
      <Card
        variant="default"
        className="max-w-[444px] rounded-[30px] border border-[#D7D9DA] !p-0 !mb-0 ml-0 mt-3 "
      >
        <Card.Body className="">
          <div
            className="
        relative max-w-[442px]  h-[206px] mb-[10px] rounded-tl-[29px] rounded-tr-[29px] !bg-cover"
            style={{
              background: `url(${CustomerCardImage})`,
              backgroundPosition: "center bottom 20%",
            }}
          >
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
              <Button
                variant="ghost"
                className="w-[44px] h-[44px] bg-white !rounded-[14px] !p-[10px] !text-center"
              >
                <i className="fa-regular fa-heart text-[#EB5757] text-[20px]"></i>
              </Button>
              <Button
                variant="ghost"
                className="w-[44px] h-[44px] bg-white !rounded-[14px] !p-[10px] !text-center flex justify-center items-center"
              >
                <i class="fa-solid fa-ban text-[18px]"></i>
              </Button>
            </div>

            {/* <img className="!h-[206px] w-full rounded-tl-[29px] rounded-tr-[29px]" src={} alt="" /> */}
            <div className="z-50 absolute bottom-0 mb-6 ml-4 ">
              <Badge
                variant="outline"
                className="flex bg-white mr-4 text-[#060606]  text-[14px]"
              >
                Continental
              </Badge>

              <Badge
                variant="outline"
                className="text-[#060606] bg-white text-[14px]"
              >
                Fast Food{" "}
              </Badge>
            </div>
          </div>
          <div className="p-2">
            <div className="px-4">
              <div className="max-w-[385px]   pl-[8px] mr-2 ">
                <div className="max-w-[full] font-bold text-[#060606] text-[20px]">
                  Mega 10-Cuisine Celebration Spread
                </div>
                <div className="max-w-full  text-[16px] font-semibold text-[#060606] mt-1.5">
                  Featuring Indian & Italian
                </div>
              </div>

              <div className="max-w-[350px]  mt-4.5 pl-[12px] text-[#85878C] text-[14px] font-semibold flex justify-between mb-4.5 mr-2">
                <div className="max-w-[155px] ">
                  <ul>
                    <li className="mb-1">• 35 - 48 Food Items</li>
                    <li>• 7 Menu Categories</li>
                  </ul>
                </div>

                <div className="max-w-[185px]">
                  <ul>
                    <li className="mb-1">• 8 Cuisines</li>
                    <li>• 4 Amenities & Services</li>
                  </ul>
                </div>
              </div>

              <div className="w-full pl-[8px] mt-[20px] flex justify-between mr-2 mb-4">
                <div className="max-w-[96px] text-[14px] text-[#15B076] font-semibold italic ">
                  <span>78% Matched</span>

                  <div className="w-[125px] h-[4px] rounded-[5px] bg-[#F0F0F4] ">
                    <div className="w-[100px] h-[4px] bg-[#15B076] rounded-[3px]"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                <div className="bg-[#EEEBF8] px-[16px] py-[6px] rounded-[10px] cursor-pointer flex justify-center items-center">

                  <button className="cursor-pointer ">
                    <img src= {CustomerCardMessageImage} alt="" />
                  </button>
                </div>

                <div className=" bg-[#573BB6] rounded-[10px] text-[#FFFFFF] flex justify-center items-center py-[4px] px-[16px]  cursor-pointer">
                  <button className="font-semibold w-[70px]  text-[16px] cursor-pointer mr-1.5 ">
                    Compare
                  </button>
                  <i class="fa-solid fa-plus text-[16px]"></i>
                 
                </div>
                </div>
              </div>
            </div>

            <div className="w-full  rounded-[20px]  py-[15px] px-[20px] bg-gradient-to-b from-[#FFF3EA] to-[#FDEAED] ">
              <div className="mx-w-[340px] flex gap-[40px]">
                <div className="max-w-[80px] h-full ">
                  <span className="max-w-[53px] font-bold italic text-[14px] bg-gradient-to-b from-[#F08E45] to-[#EE5763] bg-clip-text pr-2 text-transparent">
                    Fixed at
                  </span>

                  <div className="max-w-[92px] ">
                    <span className="max-w-[53px]  font-bold italic text-[14px] bg-gradient-to-b from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent text-[25px] pr-2">
                      ₹1,300
                    </span>
                  </div>
                </div>

                <div className="max-w-[200px] font-semibold text-[13px] text-[#5C5F62] mt-[10px]">
                  Diverse multi-cuisine meal with Indian, Italian, and more
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PackageCard;
