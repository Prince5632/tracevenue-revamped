import React from 'react'
import Row from './Row'
const BasicRequirement = ({title}) => {
  return (
    <>
      <tr className='bg-[var(--color-background)] p-3'>
            <td colSpan={4} className='px-2 py-4 font-semibold'>{title}</td>
        </tr>

        <Row heading="Capacity" count={`100-120`} />
        <Row heading="Cost (PerPerson)" count={`₹1,000 -₹1,500`} />
    </>
  )
}

export default BasicRequirement