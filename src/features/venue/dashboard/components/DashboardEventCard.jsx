import { Badge, Card, GradientText } from '@/shared'
import React from 'react'

const DashboardEventCard = () => {
  return (
    <>
     <Card className='relative p-4'>
                <Card.Header>
                   <div className="flex justify-between relative">
                    <GradientText className="text-xl font-bold tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis">Looking venue for birthday party </GradientText>
                    <div className="absolute right-1">
                      <Badge variant="success">Active</Badge>
                    </div>
                   </div>
                </Card.Header>

                <Card.Body className="flex justify-between">
                    {/* locate */}
                    <div className="flex gap-2">
                      <img src="src\assets\dashboard\location.svg" alt="location"  className='w-3 h-3 sm:w-5 sm:h-5'/>
                      <h4 className='text-gray-400 font-semibold '>Sector 73, Mohali</h4>
                    </div>

                    {/* calender */}
                    <div className="flex gap-2">
                      <img src="src\assets\dashboard\calendar.svg" alt="calender" className='w-3 h-3 sm:w-5 sm:h-5'/>
                      <h4 className="font-bold">28 january, 2026</h4>
                    </div>
                </Card.Body>
            </Card>
    </>
  )
}

export default DashboardEventCard