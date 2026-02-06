function MenuCategories(props){
    let handleMenuClick = props.handleMenuClick();
    return<>
    {/* menu categories */}
          <div className="flex flex-col w-[200px] justify-center ">
            <h2 className="text-[18px] text-[#060606] font-bold mb-2 ">Menu Categories</h2>
            <div className="w-full rounded-[30px] border border-[#D7D9DA] shadow-[0_4px_10px_#0000000d] flex flex-col py-8">

              {
                props.packageMenu?.map((item, index) => (
                  item.id == 1 ? <>
                    <div key={index}>
                      {
                        item.menuButton?.map((subItems) => (
                          <div key={subItems.id} onClick={() => handleMenuClick(subItems.id)} className={`h-[20px] p-[12px] mb-[14px] w-full flex items-center justify-start cursor-pointer hover:border-l-2 border-l-2   ${props.isActive === subItems.id ? "border-l-[#ff4000]" : "border-l-[#ffffff]"}`}>
                            <img className="h-[16px] w-[16px] mr-[3px]" src={subItems.icon} alt="" />
                            <span className={`text-[16px]  font-semibold ${props.isActive === subItems.id ? "text-[#060606]" : "text-[#5C5F62]"} transition-all duration-300`}> {subItems.content}&nbsp;&#40;{subItems.count}&#41; </span></div>
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
export default MenuCategories;