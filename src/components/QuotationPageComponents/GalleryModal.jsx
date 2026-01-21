import { X } from "lucide-react";

const GalleryModal = ({ images, activeIndex, setActiveIndex, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-6xl h-[90vh] p-3 grid grid-rows-[auto_1fr_auto]">

        
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-[22px] font-semibold truncate pr-3">
            ABS - Media Gallery
          </h5>
          <button onClick={onClose}>
            <X size={22} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-3 min-h-0">

          
          <div
            className="
              flex flex-row md:flex-col
              gap-2
              overflow-x-auto md:overflow-y-auto
              max-h-[92px] md:max-h-full
              shrink-0
              min-h-0
            "
          >
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-20 w-32 md:w-full md:h-16 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0
                  ${i === activeIndex ? "border-blue-500" : "border-transparent"}
                `}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain bg-gray-200"
                />
              </div>
            ))}
          </div>

          
          <div className="flex items-center justify-center bg-gray-100 rounded-xl min-h-0">
            <img
              src={images[activeIndex]}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        
        <div className="text-center pt-1">
          <small className="text-gray-500 font-medium">
            {activeIndex + 1} of {images.length}
          </small>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
