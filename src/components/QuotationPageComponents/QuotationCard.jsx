import img1 from '../../assets/quotation-card/1.png';
import ImageSection from './ImageSection.jsx';

const QuotationCard = () => {
  return  (
    <>
    <div className=" w-full 
      sm:w-[48%] 
      lg:w-[380px] 
      bg-white 
      rounded-xl 
      shadow-md 
      overflow-hidden 
      mt-5
      cursor-pointer">
        
      <ImageSection />
      <div className="p-3 flex justify-between items-center">
        <p className='!text-black !text-[18px] font-bold hover:!text-[#ff4000]'>ABS </p>
        <span className="text-[#666] text-[13px]">1.1 km</span>
      </div>

      <div className='px-3 flex items-center gap-2 mb-6'>
        <span className='text-[#666] text-[14px] !font-semibold'>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin info-icon" aria-hidden="true">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
            </path>
          <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </span>
        
        <span className='text-[#666] text-[14px] !font-semibold'>2nd Floor, Mann Bhawan, SCO 958, Mataur, Sector 70, Sahibzada Ajit Singh Nagar, mohali</span>
      </div>

      <div className="px-3 flex items-center gap-1 hover:gap-1.5 cursor-pointer">

        <svg className='!text-[#00a991]' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="m21.41 10.59-7.99-8c-.78-.78-2.05-.78-2.83 0l-8.01 8c-.78.78-.78 2.05 0 2.83l8.01 8c.78.78 2.05.78 2.83 0l7.99-8c.79-.79.79-2.05 0-2.83zM13.5 14.5V12H10v3H8v-4c0-.55.45-1 1-1h4.5V7.5L17 11l-3.5 3.5z"></path></svg>
        <p className='!text-[#00a991] font-bold'>Directions</p>
      </div>

      <div className='flex items-center p-3 justify-between mb-2 gap-2 h-auto w-full'>

        <button className='bg-[#fff5f0] border border-[#ff4000] text-[#ff4000] px-3 py-3 !rounded-[7px] !text-[14px] w-full  !font-bold hover:bg-[#ff4000] hover:text-white cursor-pointer'>Ask for Quote</button>

        <button className='bg-[#fff5f0] border border-[#ff4000] text-[#ff4000] px-3 py-3 !rounded-[7px] !text-[14px] w-full  !font-bold hover:bg-[#ff4000] hover:text-white cursor-pointer'>View</button>
      </div>

    </div>
    </>
  )
}

export default QuotationCard;