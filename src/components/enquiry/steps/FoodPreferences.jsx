import React from 'react';
import Card from '../../common/Card'
import Alcohol from '../../../assets/step6/Serves_Alcohol.png'
const FoodPreferences = () => {
    return (
        <>
            <main>
                {/* <div className='pb-4'>
                    <h2 className='text-lg font-bold'>Food & Venue Preferences</h2>
                    <p>Choose pure veg or a mix of veg and non-veg, and alcohol preferences to match you with suitable caterers or venues</p>
                </div> */}
                <div className='w-full sm:flex  sm:items-stretch sm:flex-col sm:gap-2'>
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
                                    <label className='text-[13px]' htmlFor="eating">Pure Veg</label>
                                </div>
                                <input type="radio" className='h-4 w-4 accent-[#ff4000]' name="eating" id="eating" />
                            </div>
                            <div className='w-full h-full flex justify-between items-center'>
                                <div className='w-full flex gap-2'>
                                    <div className='h-5 w-5 border-2 border-[#FF4000] rounded-sm flex justify-center items-center'>
                                        <div className='h-2.5 w-2.5 bg-[#FF4000] rounded-[30px]'></div>
                                    </div>
                                    <label className='text-[13px]' htmlFor="eating">Veg & Non Veg</label>
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
                                    <img src={Alcohol} alt="Serves_Alcohol image" />
                                    <label htmlFor="alcohol">Serves Alcohol</label>
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
