import React, { useState } from "react";
import { X } from "lucide-react";

const ChatHeader = ({ userData, isClick, setIsClick, chatBox, setChatBox }) => {
  const [open, setopen] = useState(true);
  if (!open) return null;

  const handleCancle = () => {
    // setopen(false);
    setChatBox(false);
  }
  return <>
    {/* // <div className="fixed top-0 w-7xl mr-30 flex items-center gap-3 border-b-gray-50 p-3 bg-white"> */}

    {
      userData?.map((user) => (
        user.users?.map((oneUser) => (
          (isClick === oneUser.id) ? <>
            <div className="h-[80px] mx-auto w-full max-w-7xl flex items-center gap-3 border-b border-b-gray-200 p-3 bg-white" key={oneUser.id}>
              <div className="h-10 w-10 rounded-full bg-[#15B076] text-white flex items-center justify-center font-semibold">
                {oneUser.username.charAt(0)}
              </div>

              <div className="flex-1 w-full">
                <p className="font-bold! text-lg! text-black!">{oneUser.username}</p>
                <p className="text-sm! text-gray-400 whitespace-wrap text-ellipsis font-semibold!">
                  Regarding: {oneUser.description}
                </p>
              </div>

              <X
                size={18}
                className="cursor-pointer"
                onClick={handleCancle}
              />
            </div>
          </> : ""
        ))
      ))
    }
  </>;
};


export default ChatHeader;
