import MenuButton from "./MenuButton";
function PackageMenu(props) {
  return (
    <>
      <h4
        className="
          my-[20px]
          text-[18px] text-[#1a1a1a] font-bold tracking-[-0.02em]
        "
      >
        {props.heading}
      </h4>
      <div
        className="
          flex flex-col
          w-full
          gap-2
        "
      >
        {props.menuButton.map((item, index) => (
          <MenuButton key={index} content={item.content} count={item.count} />
        ))}
      </div>
    </>
  );
}
export default PackageMenu;
