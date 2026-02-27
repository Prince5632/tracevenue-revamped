import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerCardImage from "@assets/CustomerCard/CustomerCardIMG.png";
import { Badge, Card } from "@/shared";
import Offer from "@assets/images/Offer.png";

/**
 * Dynamic package card for the Discover Packages page.
 * Renders cuisine badges, stats, pricing, and navigates to package details on click.
 */
const PackageCard = ({
  title = "Custom Food Package",
  subtitle = "",
  cuisines = [],
  stats,
  priceText = "",
  image,
  clubbedId,
  jobId,
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
      className="max-w-[600px] !rounded-[29px] border border-[#D7D9DA] p-0! mb-0! cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <Card.Body>
        {/* Image Section with Cuisine Badges */}
        <div
          className="relative max-w-[600px] h-[190px] mb-[12px] rounded-tl-[29px] rounded-tr-[29px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image || CustomerCardImage})`,
            backgroundPosition: "center bottom 20%",
          }}
        >
          <div className="absolute bottom-0 mb-4 ml-4 flex flex-wrap gap-1.5 z-1">
            {cuisines.map((cuisine, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white text-[#060606] text-[12px] px-2.5 py-0.5"
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
            <div className="">
              <div className="font-bold text-[#060606] text-[18px] leading-tight">
                {title}
              </div>
              {subtitle && (
                <div className="text-[15px] font-semibold text-[#060606] mt-1">
                  {subtitle}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="my-4 text-[#85878C] text-[14px] font-semibold flex justify-between">
              <ul className="space-y-1">
                <li>
                  • {stats?.uniqueCategoryCount > 5 ? `${stats?.uniqueCategoryCount - 5}-` : ""}
                  {stats?.uniqueCategoryCount} Food Items
                </li>
                <li>• {stats?.uniqueCategoryCount} Menu</li>
              </ul>
              <ul className="space-y-1 !mr-3">
                <li>• {stats?.uniqueCuisineCount} Cuisines</li>
                <li>• {stats?.uniqueServiceCount} Amenities & Services</li>
              </ul>
            </div>

            <div className="flex gap-2 items-center">
              <img src={Offer} alt="Offer" className="w-[17px] h-[10px]" />
              <span className="font-semibold italic text-[14px] text-[#15B076]">1 restaurant offering this package.</span>
            </div>


          </div>

          {/* Price Section */}
          <div className="w-full rounded-[20px] py-[15px] px-[20px] bg-linear-to-b from-[#FFF3EA] to-[#FDEAED] mt-4">
            <div className="flex gap-[30px]">

              <div>
                <p className="font-bold italic text-[14px] bg-gradient-to-r from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">
                  Starts from
                </p>

                <span className="font-bold italic text-[25px] inline-block pr-1 bg-gradient-to-b from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">
                  {priceText}
                </span>
              </div>

              <div className="flex-1 font-semibold text-[13px] text-[#5C5F62] mt-[10px]">
                Diverse multi-cuisine meal with Indian, Italian, and more
              </div>

            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;
