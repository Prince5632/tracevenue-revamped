import React from 'react'
import Row from './Row'

const Subsections = ({title,heading1,heading2,count1,count2}) => {
  return (
    <>
        <tr className='bg-[#f0f0f4] p-3'>
            <td colSpan={4} className='px-2 py-4 font-bold'>{title}</td>
        </tr>
        <Row heading={heading1} count={count1}/>
        <Row heading={heading2} count={count2}/>
    </>
  )
}

export default Subsections