import { Card, Badge } from "@/shared/components/ui";
import * as lucide from "lucide-react";

/* ── Helpers from PackageInclusions ── */
const formatType = (type) => {
  if (!type) return "";
  const t = type.toLowerCase();
  if (t.includes("vegetarian") && !t.includes("non")) return "Veg";
  if (t.includes("non-vegetarian") || t.includes("non veg")) return "Non-Veg";
  if (t.includes("paneer")) return "Paneer";
  return type.replace(/\s*items?\s*$/i, "").trim();
};

const getCount = (limit) => {
  if (!limit) return 1;
  return limit.min || limit || 1;
};

function PackageCard(props) {
  const { packageMenu = [], services = [], cuisines = [] } = props;

  /* ── Generate Inclusions Data (matching UI structure) ── */
  const inclusions = packageMenu
    .map((category) => {
      const items = [];
      const catLabel = category.categoryName || "";

      // Direct offerings
      category.offerings?.forEach((off) => {
        const hasItems =
          off.items?.length > 0 || off.selectedItems?.length > 0;
        if (hasItems) {
          const count = getCount(off.selectionLimit);
          const type = formatType(off.itemTypeName);
          const typeText = type ? `${type}` : "";
          // e.g. "1 Veg Main course"
          items.push(`${count} ${typeText} ${catLabel}`.trim());
        }
      });

      // Subcategory offerings
      category.subcategories?.forEach((sub) => {
        const subName = sub.subcategoryName || "";
        let subHasItems = false;
        let totalCount = 0;

        sub.offerings?.forEach((off) => {
          const hasItems =
            off.items?.length > 0 || off.selectedItems?.length > 0;
          if (hasItems) {
            subHasItems = true;
            totalCount += getCount(off.selectionLimit);
          }
        });

        if (subHasItems) {
          items.push(`${totalCount} ${subName}`);
        }
      });

      return {
        cardHeading: catLabel,
        cardItems: items,
      };
    })
    .filter((cat) => cat.cardItems.length > 0);

  /* ── Package Quick Stats (Dishes count) ── */
  const totalDishes =
    packageMenu?.reduce((sum, cat) => {
      let catSum = 0;
      cat.offerings?.forEach((off) => {
        catSum +=
          off.items?.length || off.selectedItems?.length || 0;
      });
      cat.subcategories?.forEach((sub) => {
        sub.offerings?.forEach((off) => {
          catSum +=
            off.items?.length || off.selectedItems?.length || 0;
        });
      });
      return sum + catSum;
    }, 0) || 0;

  return (
    <Card
      variant="default"
      padding="md"
      className="!p-0 border-none shadow-none mb-6"
    >
      <Card.Body className="lg:flex gap-[20px]">
        <div
          style={{ background: `url(${props?.CardImage})` }}
          className="
              h-[200px] w-full lg:max-w-[400px]
              bg-center bg-no-repeat
              rounded-[30px]
              relative group !bg-cover
              sm:min-w-[400px]
              lg:h-[272px]
              2xl:max-w-[600px]
            "
        >
          <div className="absolute top-6 right-6">
            <div className="flex h-10 w-10 p-2 bg-white rounded-full opacity-0 transition-all justify-center items-center group-hover:opacity-50 hover:opacity-100 duration-1000 ease-in-out">
              <lucide.Image className="h-6 w-6 text-[#2db9e4]" />
            </div>
            <div className="flex h-10 w-10 mt-2 p-2 bg-white rounded-full opacity-0 transition-all justify-center items-center group-hover:opacity-50 hover:opacity-100 duration-1000 ease-in-out">
              <lucide.Video className="h-6 w-6 text-[#2db9e4]" />
            </div>
            <div className="flex h-10 w-10 mt-2 p-2 bg-white rounded-full opacity-0 transition-all justify-center items-center group-hover:opacity-50 hover:opacity-100 duration-1000 ease-in-out">
              <lucide.MapPin className="h-6 w-6 text-[#2db9e4]" />
            </div>
          </div>
          <div className="flex flex-wrap z-2 absolute bottom-2 left-2 gap-2">
            {props?.cuisines?.map((item, index) => (
              <Badge
                variant="outline"
                key={index}
                className="
                    px-[10px] py-[4px]
                    text-[#333333] text-[12px] font-bold
                    bg-white
                    rounded-[30px]
                  "
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div className="w-full mt-6 sm:mt-0 flex flex-col">
          <div className="m-[16px] px-[16px] border-l-[3px] border-[#ff6b35]">
            <h4
              className="
                  mb-[8px]
                  text-[13px] text-[#ff6b35] font-bold tracking-wide
                "
            >
              INCLUSIONS
            </h4>
            <div
              className="
                  grid grid-cols-2 grid-row-3
                  gap-x-4 gap-y-2
                "
            >
              {inclusions.map((item, index) => (
                <div
                  key={index}
                  className="
                      mb-[2px]
                      text-[12px] text-[#1a1a1a] font-semibold
                    "
                >
                  {item.cardHeading}
                  <ul
                    className="
                        !list-disc marker:text-[#ff6b35] !list-inside
                      "
                  >
                    {item.cardItems.map((list, i) => (
                      <li
                        key={i}
                        className="
                            py-[1px] pl-[12px]
                            text-[12px] text-[#444444]
                          "
                      >
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex items-center gap-6 px-[16px] py-[10px] mt-4 mb-2 bg-[#f8f9fa] rounded-[8px] mx-[16px]">
            <div className="flex items-center gap-2 text-[#ff6b35]">
              <lucide.Utensils size={14} />
              <span className="text-[12px] font-semibold text-[#555555]">
                {totalDishes}+ dishes
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#ff6b35]">
              <lucide.Globe size={14} />
              <span className="text-[12px] font-semibold text-[#555555]">
                {cuisines.length} cuisines
              </span>
            </div>
            {services.length > 0 && (
              <div className="flex items-center gap-2 text-[#ff6b35]">
                <lucide.ConciergeBell size={14} />
                <span className="text-[12px] font-semibold text-[#555555]">
                  Services included
                </span>
              </div>
            )}
          </div>

          {/* Services List (as requested in snippet) */}
          {/* <div className="flex flex-wrap py-[8px] px-[12px] ml-[16px] mb-[10px] bg-[#f8f9fa] rounded-[6px] gap-3">
            {services.map((service, index) => {
              const Icon = lucide[service.serviceIcon] || lucide.Utensils;
              if (index > 4) return null;

              return (
                <div
                  key={index}
                  className="
                       flex
                       text-[#ff6b35]
                       justify-center items-center gap-[6px]
                     "
                >
                  <Icon size={14} className="text-[14px]" />
                  <span className="text-[12px] text-[#555555]">
                    {service.serviceName}
                  </span>
                </div>
              );
            })}
            {services.length > 5 && (
              <div className="flex px-[10px] py-[4px] text-[#ff6b35] bg-[#fff5f0] rounded-[12px] justify-center items-center gap-[6px]">
                <span className="text-[12px] text-[#555555]">
                  +{services.length - 5} more
                </span>
              </div>
            )}
          </div> */}

        </div>
      </Card.Body>
    </Card>
  );
}

export default PackageCard;
