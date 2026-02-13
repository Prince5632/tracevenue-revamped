import React from 'react'
import MessageBubble from './MessageBubble'

const ChatMessage = ({ userData, isClick }) => {
  return (
    <div className='flex-1 p-4 overflow-y-auto space-y-3 '>
      <div className='w-fit mx-auto rounded-xl text-center text-xs text-gray-400 bg-white '>
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
      {/* <MessageBubble
        text="hey there"
        time="09:32 PM"
        isSender
        />
        <MessageBubble
        text="This is your delivery driver from spedy Chow. I'm just around the corner from the place"
        time="09:32 PM"
        isSender
        />
        <MessageBubble
        text="hii"
        time="09:32 PM"
        />
        <MessageBubble
        text="how are you"
        time="09:32 PM"
        />
        <MessageBubble
        text="hey there"
        time="09:32 PM"
        isSender
        />
        <MessageBubble
        text="This is your delivery driver from spedy Chow. I'm just around the corner from the place"
        time="09:32 PM"
        isSender
        />
        <MessageBubble
        text="hii"
        time="09:32 PM"
        />
        <MessageBubble
        text="how are you"
        time="09:32 PM"
        />
        <MessageBubble
        text="hey there"
        time="09:32 PM"
        isSender
        />
        <MessageBubble
        text="This is your delivery driver from spedy Chow. I'm just around the corner from the place"
        time="09:32 PM"
        isSender
        />
        <MessageBubble
        text="hii"
        time="09:32 PM"
        />
        <MessageBubble
        text="how are you"
        time="09:32 PM"
        /> */}
    </div>
  )
}

export default ChatMessage