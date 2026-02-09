import CardImage from "@/assets/package images/card2.jpg";
import PackageCard from "@/features/package/components/PackageCard";
import PackageFooter from "@/features/package/components/PackageFooter";
import MenuCategories from "./MenuCategories";
import FoodItems from "./FoodItems";
import PackageServices from "./PackageServices";
import { useState } from "react";
import { Card, Badge, Button } from "@/shared/components/ui";

function PackageInfo(props) {
  const [active, setActive] = useState(null);
  const [itemId, setItemId] = useState(1)

  const handleMenuClick = (id) => {
    setItemId(id);
    setActive(id);
  };
  return (
    <>
      <main
        className="
          max-w-full p-[10px] pb-[20px] pt-[30px] sm:pt-[0px]
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
                cursor-pointer
                !text-[16px] !font-bold
                lg:mt-0 hover:!bg-white hover:!text-[#ff5722]
              "
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
        <div
          className="
            h-[3px] w-full
            mt-6
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
          </div>
        </div>
        <PackageCard
          cuisines={props.cuisines}
          cardInfo={props.cardInfo}
          cardHeading={props.cardHeading}
          services={props.services}
          CardImage={CardImage}
          subHeading={props.subHeading}
          cardDescription={props.cardDescription}
        />
        <Card variant="default" padding="md" className="border-none shadow-none px-0">
          <Card.Header>
            <h4
              className="
            mb-2
              text-[#060606] text-[18px] font-bold
            "
            >
              Cuisines
            </h4>
          </Card.Header>
          <Card.Body>
            <div
              className="
              flex flex-wrap
              gap-4
            "
            >
              {props.cuisines.map((item, index) => (
                <Badge
                  variant="outline"
                  key={index}
                  className="
                    px-[12px] py-[5px]
                    text-[#060606] text-[14px] font-semibold
                    bg-white
                    rounded-[30px]
                  "
                >
                  {item}
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>
        <PackageFooter />
        <div className="flex flex-col md:!flex-row items-start sticky top-24"
        >
          {/* Menu Categories */}
          <div className="hidden lg:block">
            <MenuCategories packageMenu={props.packageMenu} isActive={active} handleMenuClick={() => handleMenuClick} />
          </div>
          {/* food items */}
          <div className="w-full md:max-w-[600px] ">
            <h2 className="text-[18px] text-[#060606] font-bold mb-2 px-4">Food Items</h2>
            <div className="w-full h-auto max-h-[calc(100vh-8rem)] overflow-y-auto overflow-hidden scrollbar-thin md:pb-[200px]">
              {
                props.packageMenu?.map((item, index) => (
                  <div key={index} className="w-full">
                    {
                      item.menuButton?.map((subItem, index) => (
                        subItem.id == itemId ? <>
                          <div key={index} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 ">
                            {
                              subItem.items?.map((dishes, index) => (
                                <FoodItems foodItems={dishes.foodItems} index={index} subHeading={dishes.subHeading} />
                              ))
                            }
                          </div>
                        </> : ""
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>
          {/* Amenities & Services */}
          <PackageServices packageMenuDetails={props.packageMenu} />
        </div>
      </main>
    </>
  );
}
export default PackageInfo;