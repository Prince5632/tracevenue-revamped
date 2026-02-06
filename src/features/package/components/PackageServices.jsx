function PackageServices(props) {
    return <>
        <div className="w-full md:w-[344px] border-l border-l-[#D7D9DA] flex flex-col justify-start mt-6 md:mt-0">
            <h2 className="text-[18px] text-[#060606] font-bold mb-2 mx-4">Amenities & Services</h2>
            <div className="w-full max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin pb-[200px]">
                {
                    props.packageMenuDetails.map((item, index) => (
                        item.id == 2 ? <>
                            <div key={index} className="w-full px-4">
                                {
                                    item.menuButton.map((subItem, index) => (
                                        <div key={index} className="flex gap-4 w-full rounded-[30px] border border-[#D7D9DA] bg-[#ffffff] shadow-[4px_0_10px_#0000000d] mb-2 p-2">
                                            <div className="h-[78px] w-[78px] rounded-[20px] bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] flex justify-center items-center">
                                                <img className="h-[40px] w-[40px]" src={subItem.icon} alt="" />
                                            </div>
                                            <div className="flex flex-col justify-between my-2">
                                                <h3 className="text-[16px] font-semibold text-[#060606]" >{subItem.content}</h3>
                                                {
                                                    subItem.available == "Free" ? <span className="bg-[#c6fbe5] h-[26px] w-[58px] rounded-[5px] text-center text-[#15B076] text-[14px] font-semibold">{subItem.available}</span> : <span className="bg-[#EEEBF8] h-[26px] w-[58px] rounded-[5px] text-center text-[#573BB6] text-[14px] font-semibold">{subItem.available}</span>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </> : ""
                    ))
                }
            </div>
        </div>
    </>
}
export default PackageServices;