import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

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
  return (
    <div className="h-screen bg-gray-100 flex flex-col font-sans">
      
      <ChatHeader />

      <div className="flex-1 overflow-y-auto mt-20">
        <ChatMessage />
      </div>

      <ChatInput />
    </div>
  );
};


export default ChatLayout;