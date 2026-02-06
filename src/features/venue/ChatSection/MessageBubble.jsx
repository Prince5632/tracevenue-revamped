import React from "react";

const MessageBubble = ({ text, time, isSender }) => {
  return (
    <div
      className={`max-w-[30%] px-3 py-2 rounded-2xl text-sm wrap-break-word w-fit
        ${
          isSender
            ? "ml-auto bg-[#573BB6] text-white rounded-br-md"
            : "bg-white text-gray-800 rounded-bl-md"
        }`}
    >
      <p>{text}</p>

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
