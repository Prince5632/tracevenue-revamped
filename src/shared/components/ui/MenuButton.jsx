function MenuButton(props) {
  return (
    <>
      <button
      onClick={props.onclick}
        className="
          flex
          w-full
          px-[16px] py-[12px]
          text-[16px] font-semibold
          bg-transparent
          border-l-[3px] border-l-transparent rounded-[6px]
          cursor-pointer transition-all
          hover:bg-[#f8f9fa] justify-between items-center hover:border-l-[#e29f55] duration-300 ease-initial
        "
      >
        <span
          className="
            text-[#333333] text-[16px] font-semibold
            cursor-pointer text-left
          "
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
