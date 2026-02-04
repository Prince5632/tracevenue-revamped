function MenuButton(props) {
  return (
    <>
      <button
      onClick={props.onclick}
        className={`
          flex
          w-full
          px-[16px] py-[12px]
          text-[16px] font-semibold
          border-l-[3px] rounded-[6px]
          cursor-pointer transition-all
          hover:bg-[#f8f9fa] justify-between items-center  duration-300 ease-initial
          ${props.isActive?"bg-[#fff8f0] hover:bg-[#fff8f0] text-[#ff6b35] border-l-[#e29f55] text-[#e29f55]":"bg-transparent border-l-transparent hover:border-l-[#e29f55] "}
  `}
      >
        <span
          className={`
             text-[16px] font-semibold
            cursor-pointer text-left
            ${props.isActive?"text-[#e29f55]":"text-[#333333]"}
          `}
        >
          {props.content}
        </span>
        <span
          className="
            text-[#6b7280] text-[11px] font-semibold
            cursor-pointer
          "
        >
          {props.count}
        </span>
      </button>
    </>
  );
}
export default MenuButton;
