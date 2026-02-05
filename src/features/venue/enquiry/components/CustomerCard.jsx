import React from 'react'
import CustomerCardImage from '@assets/CustomerCard/CustomerCardIMG.png'
const PackageCard = () => {
  return (
    <div className="max-w-[395px]  rounded-[30px] border-[1px] border-[#D7D9DA] mx-2 pb-2 ">

      <div className="w-full h-[206px] top-[1px] left-[1px] ">
        <img src={CustomerCardImage} alt="" />
      </div>

      <div className="max-w-[385px]   pl-[12px] mr-2 ">
        <div className="max-w-[full] font-bold text-[#060606] text-[20px]">Mega 10-Cuisine Celebration Spread
        </div>
        <div className="max-w-full  text-[16px] font-semibold text-[#060606] mt-1.5">Featuring Indian & Italian</div>
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

      <div className="max-w-[350px]  pl-[12px] mt-[20px] flex justify-between mr-2">

        <div className="max-w-[96px] text-[14px] text-[#15B076] font-semibold italic ">
          <span >78% Matched</span>

          <div className="w-[180px] h-[4px] rounded-[5px] bg-[#F0F0F4] ">

            <div className="w-[100px] h-[4px] bg-[#15B076] rounded-[3px]"></div>
          </div>
        </div>
        <div className="max-w-[96px]  rounded-[3px] text-[#573BB6] flex justify-center items-center ">
          <span className="font-semibold text-[16px] ">Compare</span>
          <input type="checkbox"
            className="max-w-[16px] h-[16px] accent-[#573BB6] cursor-pointer ml-2" />
        </div>



      </div>

      <div className="max-w-[380px]  rounded-[20px]  py-[15px] px-[20px] bg-gradient-to-b from-[#FFF3EA] to-[#FDEAED] ml-[6px] mt-[30px] mr-2">

        <div className="mx-w-[340px] flex gap-[40px]">
          <div className="max-w-[80px] h-full ">
            <span className="max-w-[53px] font-bold italic text-[14px] bg-gradient-to-b from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">Fixed at</span>

            <div className="max-w-[92px] ">
              <span className="max-w-[53px]  font-bold italic text-[14px] bg-gradient-to-b from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent text-[25px]">₹1,300</span>
            </div>
          </div>

          <div className="max-w-[200px] font-semibold text-[13px] text-[#5C5F62] mt-[10px]">Diverse multi-cuisine meal with Indian, Italian, and more</div>

        </div>



      </div>


    </div>
  )
}

export default PackageCard
