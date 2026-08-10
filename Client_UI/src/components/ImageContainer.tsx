import React from "react";
import type { Images } from "../types";

interface ImageContainerProps {
  data: Images[];
}

const ImageContainer = ({ data }: ImageContainerProps) => {
  const [selectedImage, setSelectedImage] = React.useState( data[0]?.image_url || "");

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-100">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
      {/*  Desktop */}
      <div className="hidden md:flex gap-4 w-full">
        {/* left - images*/}
        <div className=" w-24 shrink-0 flex flex-col gap-4 overflow-y-auto max-h-125 pr-2">
          {data.map((image) => (
            <button
              key={image._id}
              onMouseOver={() => setSelectedImage(image.image_url)}
              className={` w-20 h-15 shrink-0 rounded-lg overflow-hidden border-2 transition cursor-pointer
                ${ selectedImage === image.image_url ? "border-blue-500" : "border-gray-200"}`}>
              <img
                src={image.image_url}
                alt="Product thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* big image */}
        <div className=" flex-1 h-100 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={selectedImage}
            alt="Selected product"
            className=" w-full h-full object-contain hover:scale-105 transition-transform duration-300 "
          />
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden flex-col gap-4 p-2">
        {/* BIG IMAGE */}
        <div className=" w-full h-80 rounded-xl overflow-hidden bg-gray-100 ">
          <img
            src={selectedImage}
            alt="Selected product"
            className=" w-full h-full object-contain"
          />
        </div>

        <div className=" flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {data.map((image) => (
            <button
              key={image._id}
              onClick={() => setSelectedImage(image.image_url)}
              className={` w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2
                ${
                  selectedImage === image.image_url ? "border-blue-500" : "border-gray-200"}`} >
              <img
                src={image.image_url}
                alt="Product thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
