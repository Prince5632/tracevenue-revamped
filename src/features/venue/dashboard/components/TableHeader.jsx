import { CirclePlus } from 'lucide-react'
import React from 'react'

const TableHeader = () => {
    return (
        <>
            <thead className='mt-2 rounded-2xl'>
                <tr className='border border-transparent rounded-2xl'>
                    <th className="w-1/4 bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start)  text-center p-1 whitespace-nowrap">
                        Comparison Criteria</th>
                    <th className="w-1/4 bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start) text-center p-1 whitespace-nowrap">My Requirements</th>
                    <th className="w-1/4 bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start)  text-center p-1 whitespace-nowrap">
                        <div className='flex flex-col items-center justify-center cursor-pointer'>
                            <CirclePlus className='text-primary-light' size={20} />
                            <p className='text-secondary font-normal'>Add Package</p>
                        </div>
                    </th>

                    <th className="w-1/4 bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start) text-center p-1 whitespace-nowrap">
                        <div className='flex flex-col items-center justify-center cursor-pointer'>
                            <CirclePlus className='text-primary-light' size={20} />
                            <p className='text-secondary font-normal'>Add Package</p>
                        </div>
                    </th>
                </tr>
            </thead>
        </>
    )
}

export default TableHeader