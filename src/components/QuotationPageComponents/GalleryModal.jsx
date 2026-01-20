import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GalleryModal = ({ images, activeIndex, setActiveIndex, onClose }) => {
  const prev = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const next = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
     
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white cursor-pointer"
      >
        <X size={28} />
      </button>

      
      <div className="w-24 h-[80%] overflow-y-auto flex flex-col gap-2 mr-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActiveIndex(i)}
            className={`h-16 w-full object-cover rounded cursor-pointer border-2 ${
              i === activeIndex
                ? "border-orange-500"
                : "border-transparent"
            }`}
          />
        ))}
      </div>

      
      <div className="relative max-w-4xl w-full flex items-center justify-center">
        <img
          src={images[activeIndex]}
          className="max-h-[80vh] w-full object-contain rounded"
        />

        
        <button
          onClick={prev}
          className="absolute left-2 text-white bg-black/50 p-2 rounded-full cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-2 text-white bg-black/50 p-2 rounded-full cursor-pointer"
        >
          <ChevronRight />
        </button>

        
        <div className="absolute bottom-3 text-white text-sm">
          {activeIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
