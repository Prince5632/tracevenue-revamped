import React from 'react'
import MessageBubble from './MessageBubble'

const ChatMessage = ({ userData, isClick }) => {
  return (
    <div className='flex-1 p-4 overflow-y-auto scrollbar-hide space-y-3 '>
      <div className='w-fit mx-auto rounded-[5px] text-center text-xs text-[#9999B3] bg-white px-2.5 py-1'>
        Sat, Mar 1
      </div>
      {
        userData?.map((data) => (
          data.users?.map((user) => (
            (isClick === user.id) ? <>
              {
                user.chats?.map((chat) => (
                  chat.messages?.map((message, msgIndex) => (
                    <React.Fragment key={msgIndex}>
                      {message.sendText?.map((singleMsg) => (
                        <MessageBubble
                          text={singleMsg}
                          time={message.sendTime}
                          isSender
                        />
                      ))}
                      {message.reciveText?.map((singleMsg) => (
                        <MessageBubble
                          text={singleMsg}
                          time={message.reciveTime}
                        />
                      ))}
                    </React.Fragment>
                  ))
                ))
              }
            </> : ""
          ))
        ))
      }
    </div>
  )
}

export default ChatMessage