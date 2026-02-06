import { Divider } from '@/shared'
import React from 'react'

const ServicesSection = () => {
    return (
        <>
            <tr className='bg-[var(--color-border)] p-3'>
                <td colSpan={4} className='px-2 py-4 font-bold'>Services</td>
            </tr>
            <tr>
                <td className='p-3 pl-10 border-r border-gray-300  text-gray-500 text-sm'>Pastry</td>
                <td className='p-3 text-center border-r border-gray-300  text-gray-500 text-sm'>Pastry(40)-free</td>
            </tr>
            <tr>
                <td colSpan={4} className="p-0">
                    <Divider className="w-full" />
                </td>
            </tr>

            <tr className=' text-gray-500 text-sm'>
                <td className='p-2 pl-10  border-r border-gray-300' rowSpan={2}>Cake</td>
                <td className='p-2  text-center border-r border-b border-gray-300'>Birthday Cake (Eggless) - ₹1,400</td>
            </tr>

            <tr className=' text-gray-500 text-sm'>
                <td className='text-center p-2 border-r border-gray-300'>Wedding Cake(6kg)- ₹1,200</td>
            </tr>

        </>
    )
}

export default ServicesSection