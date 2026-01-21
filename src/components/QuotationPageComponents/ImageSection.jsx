import { useState } from "react";
import img1 from "../../assets/quotation-card/1.png";
import img2 from "../../assets/quotation-card/2.png";
import img3 from "../../assets/quotation-card/3.png";
import img4 from "../../assets/quotation-card/4.png";
import img5 from "../../assets/quotation-card/5.png";
import img6 from "../../assets/quotation-card/6.png";
import img7 from "../../assets/quotation-card/7.png";
import GalleryModal from "./GalleryModal";

const ImageSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [img1, img2, img3, img4, img5, img6, img7];

  const categories = [
    "North Indian",
    "Mughlai / North Indian",
    "Asian / Chinese",
    "Indo-Chinese",
    "Indian",
    "American",
  ];

  const visibleTags = showAll ? categories : categories.slice(0, 2);
  const hiddenCount = categories.length - 2;

  return (
    <div className="relative flex gap-1 !h-[180px]">
      <div className="absolute bottom-4 left-2 z-10 flex flex-wrap gap-2 max-w-[100%]">
        {visibleTags.map((tag, index) => (
          <span
            key={index}
            className="bg-white !text-[#333] !text-[12px] font-semibold px-3 py-1.5 rounded-full shadow"
          >
            {tag}
          </span>
        ))}

        {!showAll && hiddenCount > 0 && (
          <span
            onClick={() => setShowAll(true)}
            className="bg-[#ff4000] text-white text-[12px] font-semibold px-3 py-1.5 rounded-full shadow cursor-pointer"
          >
            +{hiddenCount} more
          </span>
        )}

        {showAll && (
          <span
            onClick={() => setShowAll(false)}
            className="bg-[#6c757d] text-white !text-[12px] font-semibold px-3 py-1 rounded-full shadow cursor-pointer"
          >
            Show less
          </span>
        )}
      </div>

      <div className="relative overflow-hidden rounded cursor-pointer !h-full w-[40%]">
        <img
          src={images[0]}
          alt="Media 0"
          className="w-full !h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => {
            setActiveIndex(0);
            setIsGalleryOpen(true);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-1 !w-[60%] !h-full">
        {images.slice(1, 5).map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{
              width: "calc(50% - 0.125rem)",
              height: "calc(50% - 0.125rem)",
            }}
          >
            <img
              src={img}
              alt={`Media ${index + 1}`}
              className="w-full !h-full object-cover"
              onClick={() => {
                setActiveIndex(0);
                setIsGalleryOpen(true);
              }}
            />

            {index === 3 && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white font-bold text-sm cursor-pointer"
              onClick={() => {
            setActiveIndex(0);
            setIsGalleryOpen(true);
          }}>
                +3
              </div>
            )}
          </div>
        ))}
      </div>
      {isGalleryOpen && (
  <GalleryModal
    images={images}
    activeIndex={activeIndex}
    setActiveIndex={setActiveIndex}
    onClose={() => setIsGalleryOpen(false)}
  />
)}

    </div>
    
  );
};

export default ImageSection;
