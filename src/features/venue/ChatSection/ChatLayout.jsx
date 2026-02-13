import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';
import { useState, useEffect } from 'react';
import { userData } from "@shared/services";

// const ChatLayout = () => {
//   return (
//     <div className='bg-gray-100 rounded-xl overflow-hidden flex flex-col font-sans'>
//         {/* <ChatHeader/> */}
//         <ChatMessage/>
//         {/* <ChatInput/> */}
//     </div>
//   )
// }

const ChatLayout = () => {
  const [isClick, setIsClick] = useState(null);
  const [chatBox, setChatBox] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  const handleUserClick = (id) => {
    setIsClick(id);
    if (isSmallScreen) {
      setChatBox(true); // Only toggle chatBox on small screens
    }
  }

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return <>
    <div className='flex h-[calc(100vh-64px)] mt-14 sm:mt-16 md:-mt-8'>
      <div className={`relative h-full w-full md:w-[300px] px-1 bg-[#f0f0f4] overflow-y-auto scrollbar-hide ${chatBox ? "hidden" : "block"} `}>
        <ChatSidebar userData={userData} handleUserClick={handleUserClick} setIsClick={setIsClick} />
      </div>
      <div className={` relative flex-1 h-full bg-gray-100 md:flex md:flex-col font-sans overflow-hidden ${chatBox ? "block" : "hidden"} `}>
        <div className=''>
          <ChatHeader userData={userData} isClick={isClick} setIsClick={setIsClick} chatBox={chatBox} setChatBox={setChatBox} />
        </div>
        <div className="flex-1 h-full overflow-y-auto scrollbar-hide pb-34 bg-[#f0f0f4]">

          <ChatMessage userData={userData} isClick={isClick} setIsClick={setIsClick} />
        </div>
        <div className='border-t border-t-[#d7d9da] bg-white'>
          <ChatInput />
        </div>
      </div>
    </div>
  </>;
};


export default ChatLayout;