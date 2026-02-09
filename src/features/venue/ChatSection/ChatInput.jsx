
// import React from "react";
// import sendButton from "@assets/sendButton.svg";


// const ChatInput = () => {
//   return (
//     <div className="flex items-center gap-2 p-3 pl-15 pr-15 box-border w-full">
//         <div className="relative flex-1">
//      <input
//         type="text"
//         placeholder="Type a message"
//         className="flex-1 border border-gray-300  bg-white rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 box-border"
//         />
//         </div>
//       <button type="button" className="shrink-0">
//         <img src={sendButton} alt="Send" />
//       </button>
//     </div>
//   );
// };

// export default ChatInput;




import React from "react";
import sendButton from "@assets/sendButton.svg";
import attachment from "@assets/attachment.svg";

const ChatInput = () => {
  return (
    <div className="flex items-center gap-2 p-3 px-15 w-full box-border">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full border border-gray-300 bg-white rounded-md pl-3 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 box-border"
        />
        <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
          <img src={attachment} alt="attachment" className="w-2 h-2" />
        </div>
      </div>

      <button type="button" className="shrink-0">
        <img src={sendButton} alt="Send" />
      </button>
    </div>
  );
};

export default ChatInput;
