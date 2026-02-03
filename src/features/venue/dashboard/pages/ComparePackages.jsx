import React, { useState } from 'react'
import { CircleDot, CirclePlus, SquareDot } from 'lucide-react';
import { Divider } from '@/shared';
import { ChevronRight } from 'lucide-react';
import { CornerDownRight } from 'lucide-react';
import InnerContent from '../components/InnerContent';
import Subsections from '../components/Subsections';
import MenuRow from '../components/MenuRow';


const ComparePackages = () => {

    const menuData = [
        {
            title: "Beverages",
            required: "Required: 2",
            sections: [
                {
                    title: "Welcome Drinks",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "Soft",
                            required: "Required: 1",
                            items: [
                                { name: "Fizz", type: "veg" },
                                { name: "Sprite", type: "veg" }
                            ]
                        }
                    ]
                },
                {
                    title: "Rum",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "Alcoholic",
                            required: "Required: 1",
                            items: [{ name: "Old Monk Rum", type: "nonveg" }]
                        }
                    ]
                }
            ]
        },

        {
            title: "Starters",
            required: "Required: 3",
            sections: [
                {
                    title: "Vegetarian",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "",
                            required: "",
                            items: [
                                { name: "Veg Spring Rolls", type: "veg" },
                                { name: "Soya Malai Chaap", type: "veg" },
                                { name: "Veg Manchurian", type: "veg" }
                            ]
                        }
                    ]
                },
                {
                    title: "Non-Vegetarian",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "",
                            required: "",
                            items: [
                                { name: "Murg Malai Tikka", type: "nonveg" },
                                { name: "Chicken Lollipop", type: "nonveg" }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            title: "Main Course",
            required: "Required: 5",
            sections: [
                {
                    title: "Rice & Biryani",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "Vegetarian",
                            required: "Required: 1",
                            items: [
                                { name: "Veg Pulao", type: "veg" },
                                { name: "Jeera Rice", type: "veg" },
                                { name: "Veg Fried Rice", type: "veg" }
                            ]
                        }
                    ]
                },
                {
                    title: "Breads",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "",
                            required: "",
                            items: [{ name: "Missi Roti", type: "veg" }]
                        }
                    ]
                }
            ]
        },

        {
            title: "Complimentary",
            required: "Required: 1",
            sections: [
                {
                    title: "Vegetarian",
                    required: "Required: 1",
                    subSections: [
                        {
                            label: "",
                            required: "",
                            items: [{ name: "Papad", type: "veg" }]
                        }
                    ]
                }
            ]
        }
    ];

    const [openMenus, setOpenMenus] = useState({
        beverages: false,
        starters: false,
        mainCourse: false,
        complimentary: false,
    })


    function titleCase(str) {
        return str.trim()
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }

    return (
        <>
            <div className='border border-gray-300 rounded-2xl w-full overflow-hidden mt-20 h-120 overflow-y-auto hide-scrollbar'>
                <table className='w-full rounded-2xl'>
                    <thead className='mt-2 rounded-2xl'>
                        <tr className='border border-transparent rounded-2xl p-3'>
                            <th className="w-1/4 bg-linear-to-r from-[#FFF3EA] to-[#FDEAED] text-center p-2 whitespace-nowrap">Comparison Criteria</th>
                            <th className="w-1/4 bg-linear-to-r from-[#FFF3EA] to-[#FDEAED] text-center p-2">My Requirements</th>
                            <th className="w-1/4 hidden sm:table-cell text-center p-2  bg-linear-to-r from-[#FFF3EA] to-[#FDEAED]">
                                <div className='flex flex-col items-center justify-center cursor-pointer'>
                                    <CirclePlus className='text-primary-light' size={20} />
                                    Add Package
                                </div>
                            </th>

                            <th className="w-1/4 hidden md:table-cell text-center p-2 bg-linear-to-r from-[#FFF3EA] to-[#FDEAED]">
                                <div className='flex flex-col items-center justify-center cursor-pointer'>
                                    <CirclePlus className='text-primary-light' size={20} />
                                    Add Package
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className='w-full'>
                        <Subsections title="Basic Requirements" heading1="Capacity" heading2="cost" count1="100-120" count2="₹1,000-₹1,500" />

                        <tr className='bg-[#f0f0f4]'>
                            <td colSpan={4} className='p-3 px-2 py-4 font-bold'>Menu Catgories</td>
                        </tr>

                        <tr>
                            <td colSpan={4} className="p-0">
                                <Divider className="w-full" />
                            </td>
                        </tr>

                        {menuData.map((elem, idx) => {
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

                        <tr className='bg-[#f0f0f4]'>
                            <td colSpan={4} className='p-3 px-2 py-4 font-bold'>Services</td>
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
                            <td className='p-3 pl-10  border-r border-gray-300' rowSpan={2}>Cake</td>
                            <td className='p-3  text-center border-r border-b border-gray-300'>Birthday Cake (Eggless) - ₹1,400</td>
                        </tr>

                        <tr className=' text-gray-500 text-sm'>
                            <td className='text-center p-3 border-r border-gray-300'>Wedding Cake(6kg)- ₹1,200</td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </>
    )
}

export default ComparePackages