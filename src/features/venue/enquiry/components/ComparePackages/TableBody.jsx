import React, { useState } from 'react'
import { Divider } from '@/shared';
import BasicRequirement from './BasicRequirement';
import MenuSection from './MenuSection';
import ServicesSection from './ServicesSection';

const TableBody = ({ data }) => {
    function titleCase(str) {
        return str.trim()
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }

   

    return (
        <tbody className='w-full'>
            <BasicRequirement title="Basic Requirements" />
            <MenuSection data={data} titleCase={titleCase} />
            <ServicesSection/>
        </tbody>
    )
}

export default TableBody