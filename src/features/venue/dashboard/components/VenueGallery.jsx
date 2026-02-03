import React, { useState } from "react";
import Gallery1 from "../../../../assets/new images/gallery1.png";
import Gallery2 from "../../../../assets/new images/gallery2.png";
import Gallery3 from "../../../../assets/new images/gallery3.png";
import Gallery4 from "../../../../assets/new images/gallery4.png";
import Gallery5 from "../../../../assets/new images/gallery5.png";



const VenueGallery = () => {
  const [click, setClick] = useState(false);
  const [tab, setTab] = useState("overview");
  const [preview, setPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setClick(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const images = [
    {
      id: 1,
      image: Gallery1,
      title: "Picture1",
    },
    {
      id: 2,
      image: Gallery2,
      title: "Picture2",
    },
    {
      id: 3,
      image: Gallery1,
      title: "Picture3",
    },
    {
      id: 4,
      image: Gallery3,
      title: "Picture4",
    },
    {
      id: 5,
      image: Gallery1,
      title: "Picture5",
    },
    {
      id: 6,
      image: Gallery4,
      title: "Picture6",
    },
    {
      id: 7,
      image: Gallery1,
      title: "Picture7",
    },
    {
      id: 8,
      image: Gallery5,
      title: "Picture8",
    },
  ];

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-green-300 px-4 py-2 rounded-full cursor-pointer"
      >
        Venue Gallery
      </button>

      {click && (
        <div className="w-screen h-screen bg-[#00000030] fixed z-50 top-0 left-0 flex justify-end">
          <div className="h-full md:w-1/2 sm:w-full w-full bg-white p-5 overflow-y-auto">
            <div className="flex justify-between">
              <div>
                <h2 className="text-[#060606] text-[24px] font-bold">
                  Moti Mahal Delux
                </h2>
                <p className="text-[#85878C] text-[14px]font-semibold pb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard.
                </p>
              </div>
              <div
                onClick={() => setClick(false)}
                className="h-6 w-6 cursor-pointer font-bold"
              >
                ✕
              </div>
            </div>

            <div className="flex gap-4">
              <span
                onClick={() => setTab("overview")}
                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${
                  tab === "overview" ? " text-black" : "text-[#5C5F62]"
                }`}
              >
                Overview
              </span>

              <span
                onClick={() => setTab("gallery")}
                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${
                  tab === "gallery" ? " text-black" : "text-[#5C5F62]"
                }`}
              >
                Gallery
              </span>

              <span
                onClick={() => setTab("map")}
                className={`px-2 ml-1 text-[16px] font-semibold cursor-pointer ${
                  tab === "map" ? "text-black" : "text-[#5C5F62]"
                }`}
              >
                Map
              </span>
            </div>

            <div className="w-full h-[4px] bg-gray-200 mt-1 rounded-full">
              <div
                className={`h-full bg-orange-500 rounded-full transition-all duration-300
        ${
          tab === "overview"
            ? "w-[95px]"
            : tab === "gallery"
              ? "w-[80px] ml-[102px]"
              : "w-[50px] ml-[194px]"
        }`}
              ></div>
            </div>

            {tab === "overview" && <div className=""></div>}
            
            {tab === "gallery" && (
              <div className="mt-4">
                {/* ===== PREVIEW MODE ===== */}
                {preview ? (
                  <div className="relative">
                    {/* MAIN IMAGE */}
                    <img
                      src={images[currentIndex].image}
                      className="w-full h-full sm:rounded-[20px] rounded-[12px] sm:!h-[413px] !h-[228px] object-cover"
                    />

                    {/* CLOSE BUTTON */}
                    <div
                      onClick={() => setPreview(false)}
                      className="absolute top-3 right-3 bg-white  h-6 w-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center cursor-pointer shadow font-extrabold"
                    >
                      ✕
                    </div>

                    {/* LEFT ARROW */}
                    <div
                      onClick={prevImage}
                      className="absolute bottom-2 sm:bottom-4 sm:left-[43%] left-[41%] bg-white  w-6 h-6 sm:h-7 sm:w-7 md:w-9 md:h-9 rounded-full flex items-center justify-center cursor-pointer shadow text font-bold border-[1.5px] text-[#FF4000] border-[#FF4000]"
                    >
                      ←
                    </div>

                    {/* RIGHT ARROW */}
                    <div
                      onClick={nextImage}
                      className="absolute bottom-2 sm:bottom-4 sm:right-[43%] right-[41%] bg-white w-6 h-6 sm:h-7 sm:w-7 md:w-9 md:h-9 rounded-full flex items-center justify-center cursor-pointer shadow font-bold border-[1.5px] border-[#FF4000] text-[#FF4000]"
                    >
                      →
                    </div>
                  </div>
                ) : (
                  /* ===== GRID VIEW ===== */
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 ">
                    {images.map((item, index) => (
                      <div key={item.id}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="md:rounded-[18px] rounded-[10px] cursor-pointer "
                          onClick={() => {
                            setCurrentIndex(index);
                            setPreview(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "map" && <div className=""></div>}
          </div>
        </div>
      )}
    </>
  );
};

export default VenueGallery;
