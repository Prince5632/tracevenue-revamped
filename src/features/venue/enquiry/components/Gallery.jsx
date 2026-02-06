import React, { useState } from "react";
import Gallery1 from "@assets/new images/gallery1.png";
import Gallery2 from "@assets/new images/gallery2.png";
import Gallery3 from "@assets/new images/gallery3.png";
import Gallery4 from "@assets/new images/gallery4.png";
import Gallery5 from "@assets/new images/gallery5.png";

const Gallery = () => {
    const [preview, setPreview] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
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
    );
};

export default Gallery;
