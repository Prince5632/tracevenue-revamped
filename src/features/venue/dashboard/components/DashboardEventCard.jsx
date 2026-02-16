import { Badge, Card, GradientText } from '@/shared'
import React from 'react'

const DashboardEventCard = ({ data }) => {

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      .replace(' ', ' ');

  };

  return (
    <>
      <Card className='relative'>
        <Card.Header>
          <div className="flex justify-between relative">
            <GradientText className="text-[18px] font-bold tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis">{data?.name}</GradientText>
            <div className="absolute right-1">
              <Badge variant="success">{data?.status}</Badge>
            </div>
          </div>
        </Card.Header>

        <Card.Body className="flex justify-between">
          {/* locate */}
          <div className="flex gap-2">
            <img src="src\assets\dashboard\location.svg" alt="location" className='w-3 h-3' />
            <h4 className='text-gray-400 font-semibold text-[16px]'>{data?.location?.[0] ? [data?.location[0]?.subLocality,data?.location[0]?.locality].filter(Boolean).join(',') : null}</h4>
          </div>

          {/* calender */}
          <div className="flex gap-2">
              <img src="src\assets\dashboard\calendar.svg" alt="calender" className='w-3 h-3 sm:w-5 sm:h-5' />
              <span className="font-bold tracking-tighter">{(data?.preferredEventDate) ? formatDate(data.preferredEventDate):null }</span>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default DashboardEventCard