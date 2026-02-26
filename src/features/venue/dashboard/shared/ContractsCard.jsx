import React from 'react'
import { Package, Clock, Eye } from 'lucide-react';
import { Card, Badge, Button } from '@/shared/components/ui';

function ContractsCard({job}) {
    return <>
        <Card variant="default" padding="md" className="rounded-xl flex flex-col border-l-4 border-l-[#ff4000] hover:border-[#ff4000] transition-all duration-300 ease-in">
            <Card.Header className='flex gap-4'>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-[16px] text-[#060606] font-bold'>Looking venue for Birthday Party for 40 people on 2026-02-28</h4>
                    <div className='flex justify-start items-center gap-1'>
                        <Package size={14} color='#5c5f62'/>
                        <p className='!text-[13px] !text-[#5c5f62]'>Gold package</p>
                    </div>
                </div>
                <div>
                    <Badge variant="gradient">Proposed</Badge>
                </div>
            </Card.Header>
            <Card.Body>
                <div className='flex justify-start items-center gap-2 py-3 border-y border-[#d7d9da]'>
                    <div className='bg-[#e74c3c] h-2 w-2 rounded-full'></div>
                    <span className='text-[16px] font-semibold bg-[linear-gradient(99.68deg,#e67e22_0%,#e74c3c_100%)] text-transparent bg-clip-text'>Pending</span></div>
                <div className='w-full flex flex-col sm:!flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center pt-4'>
                    <span className='text-[12px] text-[#85878c] flex gap-1 items-center'>
                        <Clock size={12}/>
                        Updated about 1 hour ago
                    </span>
                    <a href="#" className='w-full sm:w-auto'>
                        <Button variant="outline" className="group w-full sm:w-auto !py-2 !font-semibold hover:!bg-[linear-gradient(99.68deg,#e67e22_0%,#e74c3c_100%)] whitespace-nowrap hover:text-white transition-all duration-300 ease-in">
                            <Eye size={16} className="text-[#ff4000] transition-colors duration-300 group-hover:text-white"/>
                            View Details</Button>
                    </a>
                </div>
            </Card.Body>
        </Card>
    </>
}

export default ContractsCard;
