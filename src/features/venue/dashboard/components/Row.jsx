import { Divider } from '@/shared'
import React from 'react'

const Row = ({heading,count,symbol}) => {
    return (
        <>
            <tr className='bg-white text-gray-500 text-sm'>
                <td className='pl-10 capitalize'>{heading}</td>
                <td className='p-3 text-center'>{count}</td>
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