import React from 'react';
import { Card } from '@shared/components/ui';
import Alcohol from '@assets/step6/Serves_Alcohol.png'
const FoodPreferences = () => {
    return (
        <>
            <main>
                <div className='w-full sm:flex  sm:items-stretch sm:flex-col sm:gap-2 px-2 pb-30'>
                    <Card variant="default" padding="md" className='sm:w-[50%] sm:min-h-26 mb-4 sm:mb-0'>
                        <Card.Header>
                            <h4 className='font-semibold'>Eating</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className='w-full h-full flex justify-between items-center pb-4'>
                                <div className='w-full flex gap-2'>
                                    <div className='h-5 w-5 border-2 border-[#15B076] rounded-sm flex justify-center items-center'>
                                        <div className='h-2.5 w-2.5 bg-[#15B076] rounded-[30px]'></div>
                                    </div>
                                    <label className='text-[14px] font-semibold' htmlFor="eating">Pure Veg</label>
                                </div>
                                <input type="radio" className='h-4 w-4 accent-[#ff4000]' name="eating" id="eating" />
                            </div>
                            <div className='w-full h-full flex justify-between items-center'>
                                <div className='w-full flex gap-2'>
                                    <div className='h-5 w-5 border-2 border-[#FF4000] rounded-sm flex justify-center items-center'>
                                        <div className='h-2.5 w-2.5 bg-[#FF4000] rounded-[30px]'></div>
                                    </div>
                                    <label className='text-[14px] font-semibold' htmlFor="eating">Veg & Non Veg</label>
                                </div>
                                <input type="radio" className='h-4 w-4 accent-[#ff4000]' name="eating" id="eating" />
                            </div>
                        </Card.Body>
                    </Card>
                    <Card variant="default" padding="md" className='sm:w-1/2 sm:min-h-26 '>
                        <Card.Header>
                            <h4 className='font-semibold'>Alcohol</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className='flex justify-between items-center'>
                                <div className='flex justify-center items-center'>
                                    <img src={Alcohol} alt="Serves_Alcohol image" className='mr-2 h-[22px] w-[22px]' />
                                    <label htmlFor="alcohol" className='text-[14px] font-semibold'>Serves Alcohol</label>
                                </div>
                                <input type="checkbox" className='h-4 w-4 accent-[#ff4000]' />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default FoodPreferences;
