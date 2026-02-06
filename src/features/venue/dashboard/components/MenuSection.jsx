import React, { useState } from 'react'
import MenuRow from './MenuRow';

const MenuSection = ({ data, titleCase }) => {
    
     const [openMenus, setOpenMenus] = useState({
        beverages: false,
        starters: false,
        mainCourse: false,
        complimentary: false,
    })
    return (
        <>
        <tr className='bg-[var(--color-border)] p-3'>
            <td colSpan={4} className='px-2 py-4 font-bold'>Menu Categories</td>
        </tr>

            {data.map((elem, idx) => {
                const key = titleCase(elem.title);
            
                return <MenuRow
                    key={idx}
                    title={elem.title}
                    data={elem}
                    show={openMenus[key]}
                    showBtn={() =>
                        setOpenMenus(prev => ({
                            ...prev,
                            [key]: !prev[key]
                        }))
                    } />
            })}
            
        </>
    )
}

export default MenuSection