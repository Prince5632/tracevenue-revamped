import React from 'react'
import { SquareDot } from 'lucide-react';
import { Divider } from '@/shared';
import { CornerDownRight } from 'lucide-react';

const InnerContent = ({ data }) => {
    return (
        <>
       
                {data.sections.map((section) => (
                    <React.Fragment key={section.title}>
                        {/* section row */}
                        <tr>
                            <td className="p-3 pl-10 border-r border-gray-300 text-gray-500 text-sm text-center">
                                {section.title}
                            </td>
                            <td className="text-center border-r border-gray-300 text-gray-500 text-sm">
                                {section.required}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={4} className="p-0">
                                <Divider className="w-full" />
                            </td>
                        </tr>

                        {section.subSections.map((sub, i) => (
                            <React.Fragment key={i}>
                                {sub.label && (
                                    <>
                                        <tr>
                                            <td className="p-3 border-r border-gray-300 text-sm text-center text-gray-500">
                                                <div className="flex pl-5 justify-center gap-2">
                                                    <CornerDownRight />
                                                    {sub.label}
                                                </div>
                                            </td>
                                            <td className="text-center border-r border-gray-300 text-gray-500 text-sm">
                                                {sub.required}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={4} className="p-0">
                                                <Divider className="w-full" />
                                            </td>
                                        </tr>
                                    </>
                                )}

                                {sub.items.map((item) => (
                                    <tr key={item.name}>
                                        <td className='border-r border-gray-300'></td>
                                        <td className="pl-5 py-2 text-left text-sm text-gray-500 border-r border-gray-300">
                                            <div className="flex gap-2 items-center">
                                                <SquareDot
                                                    size={16}
                                                    className={
                                                        item.type === "veg"
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }
                                                />
                                                {item.name}
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                                <tr>
                                    <td colSpan={4} className="p-0">
                                        <Divider className="w-full" />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
          
      

        </>
    )
}

export default InnerContent

