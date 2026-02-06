function FoodItems(props) {
    return <>
        <div key={props.index} className=" border border-[#D7D9DA] rounded-[30px] shadow-[4px_0_10px_#0000000d] p-4 mt-4 lg:mt-0">
            <h4 className="text-[18px] text-[##060606] font-semibold mb-2">{props.subHeading}</h4>
            <div className="w-full bg-[#C6FBE5] rounded-[5px] text-[#15B076] font-semibold italic text-[12px] text-center p-[2px] mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                Venues are offering 3-5 items to choose
            </div>
            {
                props.foodItems?.map((meals) => ((
                    meals.foodCategories == "veg" ? <>
                        {
                            meals.vegItems?.map((vegItem, index) => (
                                <div key={index} className="flex gap-2 mb-4">
                                    <div className="h-[24px] w-[24px] border border-[#15B076] rounded-[5px] flex justify-center items-center">
                                        <div className="h-[12px] w-[12px] rounded-[30px] bg-[#15B076] border border-[#15B076]"></div>
                                    </div>
                                    <span>
                                        {vegItem}
                                    </span>
                                </div>
                            ))
                        }
                    </> : ""
                )))
            }
            {
                props.foodItems?.map((meals) => ((
                    meals.foodCategories == "non-veg" ? <>
                        {
                            meals.nonVegItems?.map((nonVegItem, index) => (
                                <div key={index} className="flex gap-2 mb-4">
                                    <div className="h-[24px] w-[24px] border border-[#FF4000] rounded-[5px] flex justify-center items-center">
                                        <div className="h-[12px] w-[12px] rounded-[30px] bg-[#FF4000] border border-[#FF4000]"></div>
                                    </div>
                                    <span>
                                        {nonVegItem}
                                    </span>
                                </div>
                            ))
                        }
                    </> : ""
                )))
            }
        </div>
    </>
}
export default FoodItems;