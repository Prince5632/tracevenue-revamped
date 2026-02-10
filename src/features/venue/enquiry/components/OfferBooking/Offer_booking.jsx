import React from 'react'
import QuotationCard from '../Quotation/QuotationCard'

const Offer_booking = () => {
  return (
    <div>
        <div>
            <h4 className='p-3 text-orange-600 border-b-4 w-22'>Booking</h4>
        </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
          </div>
        <div>
            <h4 className='p-3 text-orange-600 border-b-4 w-22'>Offers</h4>
        </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
            <div className="flex-1 min-w-[280px]">
              <QuotationCard />
            </div>
          </div>
    </div>
  )
}

export default Offer_booking