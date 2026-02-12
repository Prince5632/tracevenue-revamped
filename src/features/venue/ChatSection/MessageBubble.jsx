import React from "react";

const MessageBubble = ({ text, time, isSender }) => {
  return (
    <div
      className={`max-w-[60%] px-3 py-2 rounded-2xl text-sm wrap-break-word w-fit z-0
        ${isSender
          ? "ml-auto bg-[#e63900] text-[#ffffff] rounded-br-md"
          : "bg-white text-gray-800 rounded-bl-md"
        }`}
    >
      <p className={`${isSender ? "!text-[#ffffff]" : "!text-gray-800"
        }`}>{text}</p>

      <span
        className={`block text-[10px] mt-1 text-right
          ${isSender ? "text-violet-200" : "text-gray!"}`}
      >
        {time}
      </span>
    </div>
  );
};

export default MessageBubble;
