import React from 'react'

const EmptyContracts = ({ status }) => {
    const getEmptyStateContent = () => {
        const lower = status?.toLowerCase();
        
        switch(lower) {
            case 'active':
                return {
                    message: "No contracts available"
                };
            case 'proposed':
                return {
                    message: "No contracts available"
                };
            case 'completed':
                return {
                    message: "No contracts available"
                };
            default:
                return {
                    message: "No contracts available"
                };
        }
    };

    const content = getEmptyStateContent();

    return (
        <div className='w-full'>
            <div className='rounded-[20px] px-6 py-16 md:py-20 lg:py-24 bg-[#F5F5F5] w-full'>
                <div className='flex flex-col items-center text-center'>
                    <p className='text-[#FF8B3D] text-lg md:text-xl font-medium'>
                        {content.message}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmptyContracts
