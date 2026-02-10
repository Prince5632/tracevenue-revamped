import { Divider } from '@/shared';
import { ChevronRight } from 'lucide-react';
import React from 'react'
import InnerContent from './InnerContent';

const MenuRow = ({ title, data, show, showBtn }) => {

    return (
        <>
            <tr>
                <td className='p-2 bg-[var(--color-label)] border-r border-gray-300 cursor-pointer font-semibold'>
                    <button className='cursor-pointer' onClick={() => {
                        showBtn(!show)
                    }}>
                        <div className='flex pl-5 text-base font-semibold gap-2'>
                            <ChevronRight size={20} />
                            {title}
                        </div>
                    </button>

                </td>
                <td className='text-center border-r border-gray-300 font-semibold text-(--color-text-secondary) text-base tracking-wide  cursor-pointer'>Required: 2</td>
            </tr>

            <tr>
                <td colSpan={4} className="p-0">
                    <Divider className="w-full" />
                </td>
            </tr>

            {show && (
               <InnerContent data={data} /> 
            )}



        </>
    )
}

export default MenuRow