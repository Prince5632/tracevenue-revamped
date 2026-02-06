import React, { useState } from "react";
import { X } from "lucide-react";

const ChatHeader = () => {
    const [open, setopen] = useState(true);
    if(!open) return null;
  return (
    // <div className="fixed top-0 w-7xl mr-30 flex items-center gap-3 border-b-gray-50 p-3 bg-white">
    <div className="fixed top-0 left-1 right-1 mx-auto w-full max-w-7xl flex items-center gap-3 border-b border-b-gray-200 p-3 bg-white">


      <div className="h-10 w-10 rounded-full bg-[#15B076] text-white flex items-center justify-center font-semibold">
        M
      </div>

      <div className="flex-1">
        <p className="font-bold! text-lg! text-black!">Moti Mahal Delux</p>
        <p className="text-sm! text-gray-400 truncate font-semibold!">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <X 
      size={18} 
      className="cursor-pointer" 
      onClick={()=> setopen(false)}
      />
    </div>
  );
};


export default ChatHeader;
