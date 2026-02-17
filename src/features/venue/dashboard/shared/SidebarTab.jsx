function SidebarTab({ active, Icon, value, dropdown, onclick, classname }) {
    return <>
        <div
            onClick={onclick}
            className={`w-full flex justify-between items-center h-14.5 font-medium px-7.5 border-t border-[#D7D9DA] bg-[#ffffff] transition-all duration-300 ease-in cursor-pointer ${classname}`}
        >
            <div className="flex items-center gap-4">
                <img
                    src={Icon}
                    alt="Tab Icon"
                    className="w-6 h-6"
                />
                <div className=" h-4.5 font-bold text-[18px] leading-none tracking-normal">
                    {value}
                </div>
            </div>
            <div classname="">
                {dropdown}
            </div>
        </div>
    </>
}
export default SidebarTab;