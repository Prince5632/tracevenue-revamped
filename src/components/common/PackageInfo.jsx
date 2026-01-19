import CardImage from "../../assets/packageCard/card1.jpeg";
function PackageInfo(props) {
    return <>
        <main className="pt-[65px] p-[10px] lg:px-[40px]">
            <div className="lg:flex lg:justify-between pt-[32px]">
                <div>
                    <h1 className="text-[18px] md:text-[32px] text-[#000000] font-bold mb-2">{props.heading}</h1>
                    <p className="text-[13px] text-[#666666] font-semibold">{props.description}</p>
                </div>
                <div className="lg:flex lg:justify-center lg:items-center">
                    <button className=" min-w-[190px] border border-[#FF5722] px-[25px]  py-[4px] rounded-[30px] bg-white text-[#Ff5722] !text-[16px] !font-bold mt-2 lg:mt-0">
                        Plan New Event
                        <i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
            <div className="h-[3px] sm:h-[5px] rounded-[30px] w-full bg-[#F0F0F4] mt-6 mb-[20px]"></div>
            <div>
                <div className="md:flex md:justify-between mb-[10px]">
                    <h2 className="text-[18px] md:text-[20px] text-[#000000] font-semibold">{props.subHeading}</h2>
                    <div className="flex flex-col mt-2">
                        <span className="text-[22px] text-[#ff6b35] font-bold text-start md:text-end">&#8377;{props.price}</span>
                        <span className="text-[11px] text-[#888888] font-bold text-start md:text-end">Lumpsum</span>
                    </div>
                </div>
                <div className="py-[8px] px-[12px] flex flex-wrap gap-3 mb-[10px] bg-[#f8f9fa] rounded-[6px]">
                    {
                        props.services.map((item) => (
                            (item.content == 'Services included') ?
                                <div className="flex justify-center items-center gap-[6px] bg-[#fff5f0] text-[#ff6b35] px-[10px] py-[4px] rounded-[12px]">
                                    <i className={`${item.class} text-[14px]`}></i>
                                    <span className="text-[12px] text-[#555555]">{item.content}</span>
                                </div> :
                                <div className="flex justify-center items-center gap-[6px] text-[#ff6b35]">
                                    <i className={`${item.class} text-[14px]`}></i>
                                    <span className="text-[12px] text-[#555555]">{item.content}</span>
                                </div>
                        ))
                    }
                </div>
            </div>
            <div className="lg:flex  py-[16px] gap-[20px]">
                <div className="relative h-[200px] lg:h-[272px] w-full sm:min-w-[400px] 2xl:max-w-[600px] rounded-[30px] !bg-cover bg-center bg-no-repeat" style={{background:`url(${CardImage})`}}>
                    <div className='absolute bottom-2 left-2 flex gap-2 flex-wrap z-20'>
                    {
                        props.cuisines.map((item, index)=>(
                            <span key={index} className=" bg-white text-[#333333] text-[11px] rounded-[30px] px-[10px] py-[4px] font-bold">{item}</span>
                        ))
                    }
                    </div>
                </div>
                <div className="w-full mt-6 sm:mt-0">
                    <div className="m-[16px] px-[16px] border-l-[3px] border-[#ff6b35] ">
                        <h4 className="mb-[8px] text-[13px] text-[#ff6b35]">INCLUSIONS</h4>
                        <div className="grid grid-cols-2 grid-row-3 gap-x-4 gap-y-2">
                            {
                                props.cardInfo.map((item, i) => (
                                    <div key={i} className="text-[12px] mb-[2px] text-[#1a1a1a] font-semibold">{item.cardHeading}
                                        <ul className="!list-disc marker:text-[#ff6b35] !list-inside">
                                            {
                                                item.cardItems.map((list, index) => (
                                                    <li key={index} className="text-[12px] text-[#444444] py-[1px] pl-[12px]">{list}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="py-[8px] px-[12px] flex flex-wrap gap-3 mb-[10px] bg-[#f8f9fa] rounded-[6px]">
                        {
                            props.services.map((item) => (
                                (item.content == 'Services included') ?
                                    <div className="flex justify-center items-center gap-[6px] bg-[#fff5f0] text-[#ff6b35] px-[10px] py-[4px] rounded-[12px]">
                                        <i className={`${item.class} text-[14px]`}></i>
                                        <span className="text-[12px] text-[#555555]">{item.content}</span>
                                    </div> :
                                    <div className="flex justify-center items-center gap-[6px] text-[#ff6b35]">
                                        <i className={`${item.class} text-[14px]`}></i>
                                        <span className="text-[12px] text-[#555555]">{item.content}</span>
                                    </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    </>
}
export default PackageInfo;