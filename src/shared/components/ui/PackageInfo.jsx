import CardImage from "../../../assets/package images/card1.jpeg";
import PackageCard from "./PackageCard.jsx";
import PackageFooter from "./PackageFooter.jsx";
import PackageMenu from "./PackageMenu.jsx";
import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import { useRef,useState, useEffect } from "react";

function PackageInfo(props) {
    const sectionRefs = useRef({});
    const [active, setActive] = useState(null);
    useEffect(()=>{
      const observer = new IntersectionObserver(
        (entries)=>{
          entries.forEach((entry)=>{
            if(entry.isIntersecting){
              const id = entry.target.getAttribute("data-id");
              setActive(Number(id));
            }
          });
        },
        {
          root: null,
          rootMargin: "-15% 0px -70% 0px",
          threshold: 0,
        }
      );
      Object.values(sectionRefs.current).forEach((section)=>{
        if (section) observer.observe(section);
      });
      return ()=>observer.disconnect();
    },[]);

    const handleMenuClick = (id) => {
        setActive(id);
  sectionRefs.current[id]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

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
                      text-[12px] text-[#ff6b35]
                    "
                  >
                    {item.content}
                  </span>
                </div>
              ) : (
                <div
                  key={index}
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
        <PackageCard
          cuisines={props.cuisines}
          cardInfo={props.cardInfo}
          cardHeading={props.cardHeading}
          services={props.services}
          CardImage={CardImage}
        />
        <div
          className="
            mb-[16px] p-[20px]
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
        <PackageFooter />
        <div
          className="
            flex
            w-full
            relative justify-between gap-6
          "
        >
          <div
            className="
              overflow-y-auto
              w-[280px] max-h-[calc(100vh-6rem)]
              px-[20px] pb-[20px]
              text-[16px] text-[#212529]
              bg-[#ffffff]
              rounded-[12px] border border-[#e5e7eb]
              scrollbar-thin sticky top-24 hidden lg:inline
            "
          >
            {props.packageMenu.map((item, index) => (
              <PackageMenu
                key={index}
                heading={item.heading}
                menuButton={item.menuButton}
                active={active}
                onclick={handleMenuClick}
              />
            ))}
          </div>
          <div className="flex-1 w-full">
            <div>
              {props.packageMenu?.map((item, index) => (
                <div
                  key={index}
                  className="
                w-full max-w-full lg:max-w-[805px] p-[6px]
                lg:p-[24px]
                bg-[#ffffff]
                lg:border lg:border-[#e5e7eb] rounded-[12px] mb-8
              "
                >
                  {item.id === 1 ? (
                    <>
                      <h4
                        className="
                          mb-[16px]
                          text-[18px] text-[#1a1a1a] tracking-[-0.02em] font-bold
                        "
                      >
                        Food Items
                      </h4>
                      {/* <h4>{item.heading}</h4> */}
                      {item.menuButton?.map((subItem, index) => (
                        <div 
                        key={index} 
                        ref={(el)=>(sectionRefs.current[subItem.id]=el)}
                        data-id={subItem.id}
                        className="scroll-mt-[80px]"
                        >
                          <h5
                            className="
                              mb-[16px] p-[10px]
                              text-[#1a1a1a] text-[18.4px] font-bold
                              bg-white
                              border-b-[2px] border-[#e29f55]
                            "
                          >
                            {subItem.content}
                          </h5>
                          <Card
                            variant="default"
                            padding="lg"
                            className="
                              max-w-[444px] p-[20px] mb-[20px]
                            "
                          >
                            <Card.Header>
                              <h4
                                className="
                                  mb-[10px]
                                  text-[18px] text-[#060606] font-semibold
                                "
                              >
                                {subItem.subHeading}
                                <Badge
                                  variant="soft"
                                  className="
                                    ml-[6px] px-[6px] py-[2px] text-[11.2px] !font-bold
                                  "
                                >
                                  Any {subItem.count}
                                </Badge>
                              </h4>
                            </Card.Header>
                            <Card.Body>
                              <div
                                className="
                                  grid grid-cols-2
                                  w-full
                                  gap-2
                                "
                              >
                                {subItem.subContent?.map((cardItem, index) => (
                                  <div
                                    key={index}
                                    className="
                                      flex
                                      gap-4 mt-[10px] sm:mb-0
                                    "
                                  >
                                    {subItem.id === 1 ? (
                                      <>
                                        <div
                                          className="
                                            flex
                                            h-[20px] w-[20px]
                                            border rounded-[4px] border-[#683eb8]
                                            justify-center items-end
                                          "
                                        >
                                          <i
                                            className="
                                              text-[14px] text-[#683eb8]
                                              fa-solid fa-wine-glass
                                            "
                                          ></i>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          className="
                                            flex
                                            h-[20px] w-[20px]
                                            border rounded-[4px] border-[#15B076]
                                            justify-center items-center
                                          "
                                        >
                                          <div
                                            className="
                                              h-[10px] w-[10px]
                                              bg-[#15B076]
                                              rounded-[30px]
                                            "
                                          ></div>
                                        </div>
                                      </>
                                    )}

                                    <span
                                      className="
                                        text-[#060606] text-[12px] font-semibold
                                      "
                                    >
                                      {cardItem}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h4
                        className="
                              mb-[16px] p-[10px]
                              text-[#1a1a1a] text-[18.4px] font-bold
                              bg-white
                              border-b-[2px] border-[#e29f55]
                            "
                      >
                        {item.heading}
                      </h4>
                      {item.menuButton?.map((subItem, index) => (
                        <div key={index}
                        ref={(el)=>(sectionRefs.current[subItem.id]=el)}
                        data-id={subItem.id}
                         className="mb-[8px] scroll-mt-[80px] w-full">
                          <h5
                            className="
                              mb-[8px] p-[10px]
                              text-[#212529] text-[16px] font-semibold
                              bg-white
                            "
                          >
                            {subItem.content}
                          </h5>
                          <div
                            className="
                              w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2
                              sm:gap-4
                            "
                          >
                            {subItem.children?.map((child, index) => (
                              <Card
                                key={index}
                                variant="default"
                                padding="lg"
                                hoverable
                                className="
                                  w-[100%]
                                  !bg-[#f8f9fa] !border !border-[#e5e7eb] !p-[16px] !rounded-[10px] hover:!border-[#e29f55] mb-4 md:mb-0
                                "
                              >
                                <Card.Body
                                  className="
                                    !w-full !flex !gap-2
                                  "
                                >
                                  <div
                                    className="
                                        flex
                                        h-[48px] w-[48px]
                                        bg-[#ffffff]
                                       rounded-[8px]
                                        justify-center items-center
                                      "
                                  >
                                    <i
                                      className={`${child.icon} text-[#e29f55] text-[18px]`}
                                    ></i>
                                  </div>
                                  <div className="w-full flex flex-col">
                                    <div className="flex justify-between">
                                      <h4
                                        className="
                                        mb-[8px]
                                        text-[15px] text-[#1a1a1a] font-semibold
                                      "
                                      >
                                        {child.subHeading}
                                      </h4>
                                      <div>
                                        <Badge
                                          variant="softSuccess"
                                          size="sm"
                                          className="
                                      !bg-[#d1fae5] !text-[#065f46] !px-[12px] !py-[4px]
                                    "
                                        >
                                          FREE
                                        </Badge>
                                      </div>
                                    </div>
                                    <span
                                      className="
                                        w-full
                                        text-[#212529] text-[16px] font-semibold
                                      "
                                    >
                                      {child.subContent}
                                    </span>
                                  </div>
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default PackageInfo;