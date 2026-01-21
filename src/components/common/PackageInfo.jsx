import CardImage from "../../assets/packageCard/card1.jpeg";
import Button from "../../components/common/Button.jsx";
import PackageCard from "./PackageCard.jsx";
import PackageFooter from "./PackageFooter.jsx";
function PackageInfo(props) {
  return (
    <>
      <main
        className="
          pt-[65px] p-[10px] pb-[200px]
          lg:px-[40px]
        "
      >
        <div
          className="
            pt-[32px]
            lg:flex lg:justify-between
          "
        >
          <div>
            <h1
              className="
                mb-2
                text-[18px] text-[#000000] font-bold
                md:text-[32px]
              "
            >
              {props.heading}
            </h1>
            <p
              className="
                text-[13px] text-[#666666] font-semibold
              "
            >
              {props.description}
            </p>
          </div>
          <div
            className="
              lg:flex lg:justify-center lg:items-center
            "
          >
            <button
              className="
                min-w-[190px]
                px-[25px] py-[4px] mt-2
                text-[#Ff5722]
                bg-white
                border border-[#FF5722] rounded-[30px]
                cursor-pointer
                !text-[16px] !font-bold
                lg:mt-0
              "
            >
              Plan New Event
              <i
                className="
                  fa-solid fa-arrow-right
                "
              ></i>
            </button>
          </div>
        </div>
        <div
          className="
            h-[3px] w-full
            mt-6 mb-[20px]
            bg-[#F0F0F4]
            rounded-[30px]
            sm:h-[5px]
          "
        ></div>
        <div>
          <div
            className="
              mb-[10px]
              md:flex md:justify-between
            "
          >
            <h2
              className="
                text-[18px] text-[#000000] font-semibold
                md:text-[20px]
              "
            >
              {props.subHeading}
            </h2>
            <div
              className="
                flex flex-col
                mt-2
              "
            >
              <span
                className="
                  text-[22px] text-[#ff6b35] font-bold text-start
                  md:text-end
                "
              >
                &#8377;{props.price}
              </span>
              <span
                className="
                  text-[11px] text-[#888888] font-bold text-start
                  md:text-end
                "
              >
                Lumpsum
              </span>
            </div>
          </div>
          <div
            className="
              flex flex-wrap
              py-[8px] px-[12px] mb-[10px]
              bg-[#f8f9fa]
              rounded-[6px]
              gap-3
            "
          >
            {props.services.map((item, index) =>
              item.content == "Services included" ? (
                <div
                key={index}
                  className="
                    flex
                    px-[10px] py-[4px]
                    text-[#ff6b35]
                    bg-[#fff5f0]
                    rounded-[12px]
                    justify-center items-center gap-[6px]
                  "
                >
                  <i
                    className={`
                      text-[14px]
                      ${item.class}
                    `}
                  ></i>
                  <span
                    className="
                      text-[12px] text-[#555555]
                    "
                  >
                    {item.content}
                  </span>
                </div>
              ) : (
                <div
                  className="
                    flex
                    text-[#ff6b35]
                    justify-center items-center gap-[6px]
                  "
                >
                  <i
                    className={`
                      text-[14px]
                      ${item.class}
                    `}
                  ></i>
                  <span
                    className="
                      text-[12px] text-[#555555]
                    "
                  >
                    {item.content}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <PackageCard cuisines={props.cuisines} cardInfo={props.cardInfo} cardHeading={props.cardHeading} services={props.services} CardImage={CardImage} />
        <div
          className="
            mb-[32px] p-[20px]
            bg-[#f8f9fa]
            rounded-[12px]
          "
        >
          <h4
            className="
              mb-[16px]
              text-[#1a1a1a] text-[18px] font-bold
            "
          >
            Cuisines
          </h4>
          <div
            className="
              flex flex-wrap
              gap-4
            "
          >
            {props.cuisines.map((item, index) => (
              <span
                key={index}
                className="
                  px-[16px] py-[8px]
                  text-[#333333] text-[14px] font-semibold
                  bg-[#ffffff]
                  rounded-[30px] border border-[#e0e0e0]
                  transition-all
                  duration-200 ease-in gam
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <PackageFooter/>
      </main>
    </>
  );
}
export default PackageInfo;
