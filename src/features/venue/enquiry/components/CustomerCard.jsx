import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerCardImage from "@assets/CustomerCard/CustomerCardIMG.png";
import { Badge, Card } from "@/shared";

/**
 * Dynamic package card for the Discover Packages page.
 * Renders cuisine badges, stats, pricing, and navigates to package details on click.
 */
const PackageCard = ({
  title = "Custom Food Package",
  subtitle = "",
  cuisines = [],
  foodItemCount = 0,
  menuCount = 0,
  cuisineCount = 0,
  amenitiesCount = 0,
  priceText = "",
  description = "",
  image,
  clubbedId,
  jobId,
  venueCount = 0,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (clubbedId && jobId) {
      window.open(`/package/${clubbedId}/${jobId}`, "_blank");
    }
  };

  return (
    <Card
      variant="default"
      className="max-w-[444px] rounded-[30px] border border-[#D7D9DA] p-0! mb-0! cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <Card.Body>
        {/* Image Section with Cuisine Badges */}
        <div
          className="relative max-w-[442px] h-[206px] mb-[10px] rounded-tl-[29px] rounded-tr-[29px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image || CustomerCardImage})`,
            backgroundPosition: "center bottom 20%",
          }}
        >
          <div className="absolute bottom-0 mb-4 ml-4 flex flex-wrap gap-1.5 z-10">
            {cuisines.map((cuisine, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white text-[#060606] text-[13px] px-2.5 py-0.5"
              >
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2">
          <div className="px-4">
            {/* Title */}
            <div className="pl-[8px] mr-2">
              <div className="font-bold text-[#060606] text-[20px] leading-tight">
                {title}
              </div>
              {subtitle && (
                <div className="text-[16px] font-semibold text-[#060606] mt-1.5">
                  {subtitle}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mt-4 pl-[12px] text-[#85878C] text-[14px] font-semibold flex justify-between mb-4 mr-2">
              <ul className="space-y-1">
                <li>
                  • {foodItemCount > 5 ? `${foodItemCount - 5}-` : ""}
                  {foodItemCount} Food Items
                </li>
                <li>• {menuCount} Menu</li>
              </ul>
              <ul className="space-y-1">
                <li>• {cuisineCount} Cuisines</li>
                <li>• {amenitiesCount} Amenities & Services</li>
              </ul>
            </div>

            {/* Price Section */}
            <div className="w-full rounded-[20px] py-[15px] px-[20px] bg-linear-to-b from-[#FFF3EA] to-[#FDEAED] mt-2 mb-2">
              <div className="flex gap-[40px]">
                <div>
                  <span className="font-bold italic text-[14px] bg-linear-to-b from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">
                    Starts from
                  </span>
                  <div>
                    <span className="font-bold italic text-[25px] bg-linear-to-b from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">
                      {priceText}
                    </span>
                  </div>
                </div>
                <div className="max-w-[200px] font-semibold text-[13px] text-[#5C5F62] mt-[10px]">
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;
