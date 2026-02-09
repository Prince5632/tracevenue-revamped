import { Divider } from '@/shared'
import React from 'react'

const Row = ({heading,count}) => {
    return (
        <>
            <tr className='bg-white text-gray-500 text-sm'>
                <td className='pl-10 capitalize text-base text-[var(--color-text-muted)]'>{heading}</td>
                <td className='p-3 text-center font-semibold text-(--color-text-secondary) text-base'>{count}</td>
            </tr>
            <tr>
                <td colSpan={4} className="p-0">
                    <Divider className="w-full" />
                </td>
            </tr>
            
        </>

    )
}

export default Row