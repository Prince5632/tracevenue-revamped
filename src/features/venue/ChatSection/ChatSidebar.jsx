import { MessageSquare, ChevronDown, ChevronUp, CircleUser } from 'lucide-react';
import { Badge } from '@/shared/components/ui';
import { useState } from 'react';

function ChatSidebar({ userData, handleUserClick, setIsClick }) {
    const [tabOpen, setTabOpen] = useState(null);
    const [isStatus, setIsStatus] = useState(false);

    const handleTabOpen = (id) => {
        setTabOpen((prev) => (prev === id ? null : id));
    }
    return <>
        <h1 className='sticky flex gap-2 p-6 bg-[#ffffff] border-b border-b-[#e0e0e0] items-center justify-start text-[22px] font-bold tracking-wider text-[#ff4000] -mx-1  mb-1'><MessageSquare size={24} color='#4f709c' />Messages</h1>
        {
            userData?.map((user) => (

                user.users?.map((oneUser) => (
                    <div>
                        <div key={user.id} onClick={() => handleTabOpen(user.id)} className='flex justify-between items-start px-4 py-[12px] cursor-pointer bg-[#EEEBF8] text-[#5c5f62] backdrop-blur-lg hover:shadow-lg  transition-all duration-300 ease-in-out mb-1 rounded-lg bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-xl  hover:bg-white'>
                            <div className='flex justify-center items-start'>

                                <h3 key={oneUser.id} className='flex-1 text-[14.4px] text-[#5c5f62] font-semibold transition-all duration-300 ease-in-out'>{oneUser.description}</h3>

                                {
                                    user.status == "Active" &&
                                    <Badge variant="softSuccess" className="!text-[12px] !font-medium px-[8px] py-[2px]">{user.status}</Badge>
                                }
                                {
                                    user.status == "Closed" && <Badge variant="outline" className="!text-[12px] !font-medium px-[8px] py-[2px]">{user.status}</Badge>
                                }
                                {
                                    user.status == "Pending" && <Badge variant="soft" className="!text-[12px] !font-medium px-[8px] py-[2px]">{user.status}</Badge>
                                }
                            </div>
                            {
                                tabOpen === user.id ? <>
                                    <ChevronUp size={14} />
                                </>
                                    :
                                    <>
                                        <ChevronDown size={14} />
                                    </>
                            }
                        </div>
                        {
                            tabOpen === user.id ? <>
                                {
                                    user.users?.map((oneUser) => (
                                        <div key={oneUser.id} onClick={() => handleUserClick(oneUser.id)} className='flex items-center gap-3 px-4 py-[12px] rounded-lg bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] cursor-pointer mb-1 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-xl'>
                                            <CircleUser size={40} color='#4f709c' />
                                            <div className='flex-1 flex flex-col'>
                                                <div className='w-full flex justify-between '>

                                                    <h3 className='text-[14.4px] font-semibold text-[#ff4000] '>{oneUser.username}</h3>
                                                    <span className='text-[#666666] text-[12px] font-light'>{user.durations}</span>
                                                </div>
                                                <p className='text-[#666666] text-[13.6px] font-medium'>{user.lastMessage}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </> : ""
                        }
                    </div>
                ))
            ))
        }

    </>
}
export default ChatSidebar;