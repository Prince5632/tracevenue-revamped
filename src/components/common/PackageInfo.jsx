import Button from "../common/Button";
function PackageInfo(props) {
    return <>
        <main className="pt-[65px] px-[40px]">
            <div className="lg:flex lg:justify-between pt-[32px]">
                <div>
                    <h1 className="text-[32px] text-[#000000] font-bold mb-2">{props.heading}</h1>
                    <p className="text-[13px] text-[#666666] font-semibold">{props.description}</p>
                </div>
                <div className="lg:flex lg:justify-center lg:items-center">
                    <button className=" border border-[#FF5722] px-[25px]  py-[4px] rounded-[30px] bg-white text-[#Ff5722] text-base font-bold">
                        Plan New Event
                        <i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
            <div className="h-[5px] rounded-[30px] w-full bg-[#F0F0F4] mt-6 mb-[20px]"></div>
            <div>
                <div className="flex justify-between mb-[10px]">
                    <h2 className="text-[20px] text-[#000000] font-bold">{props.subHeading}</h2>
                    <div className="flex flex-col">
                        <span className="text-[22px] text-[#ff6b35] font-bold text-end">&#8377;{props.price}</span>
                        <span className="text-[11px] text-[#888888] font-bold text-end">Per Person</span>
                    </div>
                </div>
                <div className="py-[8px] px-[12px] flex gap-3 mb-[10px] bg-[#f8f9fa] rounded-[6px]">
                    {
                        props.services.map((item)=>( 
                            (item.content == 'Services included')?
                            <div className="flex justify-center items-center gap-[6px] bg-[#fff5f0] text-[#ff6b35] px-[10px] py-[4px] rounded-[12px]">
                                <i className={`${item.class} text-[14px]`}></i>
                                <span className="text-[12px] text-[#555555]">{item.content}</span>
                            </div>:
                            <div className="flex justify-center items-center gap-[6px] text-[#ff6b35]">
                                <i className={`${item.class} text-[14px]`}></i>
                                <span className="text-[12px] text-[#555555]">{item.content}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                    
            </div>
        </main>
    </>
}
export default PackageInfo;