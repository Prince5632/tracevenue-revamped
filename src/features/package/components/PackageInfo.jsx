import CardImage from "@/assets/package images/card1.jpeg";
import PackageCard from "@/features/package/components/PackageCard";
import PackageFooter from "@/features/package/components/PackageFooter";
import PackageMenu from "@/features/package/components/PackageMenu";
import { useRef, useState, useEffect } from "react";
import { Button, Card, Badge } from "@/shared/components/ui";
import { ProgressBar } from "@/shared/components/feedback";
import MenuCategories from "./MenuCategories";
import PackageServices from "./PackageServices";
import FoodItems from "./FoodItems";
import { useNavigate } from "react-router-dom";

function PackageInfo(props) {
  const sectionRefs = useRef({});
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            setActive(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

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
          max-w-full p-[10px]
          lg:px-[40px]
        "
      >
        <div
          className="
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
            <Button
              variant="outline"
              className="
                min-w-[190px]
                px-[25px] py-[4px] mt-2
                text-[#Ff5722]
                bg-white
                border border-[#FF5722] rounded-[30px]
                hover:!bg-[#ffffff] hover:!text-[#ff5722]
                cursor-pointer
                !text-[16px] !font-bold
                lg:mt-0
              "
              onClick={() => navigate("/")}
            >
              Plan New Event
              <i
                className="
                  fa-solid fa-arrow-right
                "
              ></i>
            </Button>
          </div>
        </div>
        <ProgressBar value={0} className="mt-6 mb-[20px]" />
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
              {props.packageName}
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
                {props.price}
              </span>
              <span
                className="
                  text-[11px] text-[#888888] font-bold text-start
                  md:text-end
                "
              >
                {props.budgetType}
              </span>
            </div>
          </div>
        </div>
        <PackageCard
          cuisines={props.cuisines}
          cardInfo={props.cardInfo}
          cardHeading={props.cardHeading}
          services={props.services}
          packageMenu={props.packageMenu}
          CardImage={CardImage}
        />

        <Card variant="flat" padding="md" className="border-none !bg-[#f8f9fa] mb-4">
          <Card.Header>
            <h4 className="mb-[16px] text-[#1a1a1a] text-[18px] font-bold">
              Cuisines
            </h4>
          </Card.Header>
          <Card.Body>
            {props?.cuisines?.map((item, index) => (
              <Badge
                variant="outline"
                key={index}
                className="
                            px-[16px] py-[8px]
                  text-[#333333] text-[14px] font-semibold
                  !bg-[#ffffff]
                  rounded-[30px] border border-[#e0e0e0]
                  transition-all
                  duration-200 ease-in mr-2
                          "
              >
                {item}
              </Badge>
            ))}
          </Card.Body>
        </Card>
        <PackageFooter job={props.job} />
        <div className="flex flex-col md:!flex-row items-start sticky top-24"
        >
          {/* Menu Categories */}
          <div className="hidden lg:block">
            <MenuCategories packageMenu={props?.packageMenu} isActive={active} handleMenuClick={() => handleMenuClick} />
          </div>
          {/* food items */}
          <div className="w-full md:max-w-[600px] ">
            <h2 className="text-[18px] text-[#060606] font-bold px-4">Food Items</h2>
            <div className="w-full h-auto max-h-[calc(100vh-8rem)] overflow-y-auto overflow-hidden scrollbar-hide md:pb-[200px]">
              <FoodItems packageMenu={props?.packageMenu} sectionRefs={sectionRefs} />
            </div>
          </div>
          {/* Amenities & Services */}
          <PackageServices services={props?.services} handleMenuClick={() => handleMenuClick} sectionRefs={sectionRefs} />
        </div>
      </main>
    </>
  );
}
export default PackageInfo;