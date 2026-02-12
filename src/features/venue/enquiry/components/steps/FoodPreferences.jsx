import React from 'react';
import { Card } from '@shared/components/ui';
import Alcohol from '@assets/step6/Serves_Alcohol.png'
const FoodPreferences = ({ formData, updateFormData }) => {

    // Helper to safely access boolean values (default to false if undefined)
    const isVegOnly = formData.vegOnly === true;
    const isAlcoholic = formData.alcoholic === true;

    const handleVegChange = (isVeg) => {
        updateFormData('vegOnly', isVeg);
    };

    const handleAlcoholChange = (e) => {
        updateFormData('alcoholic', e.target.checked);
    };

    return (
        <>
            <main>
                <div className='w-full sm:flex  sm:items-stretch sm:flex-col sm:gap-2 px-2 pb-30 md:pb-6'>
                    <div className='mb-2'>
                        <h3 className='!text-[18px] text-[#060606] font-bold mb-[8px]'>Food & Venue Preferences</h3>
                        <p className='!text-[14px] text-[#85878C] font-semibold'>Select your food preference &#40;Veg / Non-Veg&#41;. You may also share any special dietary needs or venue-related preferences.</p>
                    </div>

                    {/* Eating Preferences Card */}
                    <Card variant="default" padding="md" className='sm:w-[50%] sm:min-h-26 !mb-4 sm:mb-0'>
                        <Card.Header>
                            <h4 className='font-semibold'>Eating</h4>
                        </Card.Header>
                        <Card.Body>
                            {/* Pure Veg Option */}
                            <div
                                className='w-full h-full flex justify-between items-center pb-4 cursor-pointer'
                                onClick={() => handleVegChange(true)}
                            >
                                <div className='w-full flex gap-2'>
                                    <div className='h-5 w-5 border-2 border-[#15B076] rounded-sm flex justify-center items-center'>
                                        <div className='h-2.5 w-2.5 bg-[#15B076] rounded-[30px]'></div>
                                    </div>
                                    <label className='text-[14px] font-semibold cursor-pointer'>Pure Veg</label>
                                </div>
                                <input
                                    type="radio"
                                    className='h-4 w-4 accent-[#ff4000] cursor-pointer'
                                    name="eating"
                                    checked={isVegOnly}
                                    onChange={() => handleVegChange(true)}
                                />
                            </div>

                            {/* Veg & Non Veg Option */}
                            <div
                                className='w-full h-full flex justify-between items-center cursor-pointer'
                                onClick={() => handleVegChange(false)}
                            >
                                <div className='w-full flex gap-2'>
                                    <div className='h-5 w-5 border-2 border-[#FF4000] rounded-sm flex justify-center items-center'>
                                        <div className='h-2.5 w-2.5 bg-[#FF4000] rounded-[30px]'></div>
                                    </div>
                                    <label className='text-[14px] font-semibold cursor-pointer'>Veg & Non Veg</label>
                                </div>
                                <input
                                    type="radio"
                                    className='h-4 w-4 accent-[#ff4000] cursor-pointer'
                                    name="eating"
                                    checked={!isVegOnly}
                                    onChange={() => handleVegChange(false)}
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Alcohol Preferences Card */}
                    <Card variant="default" padding="md" className='sm:w-1/2 sm:min-h-26 !mb-4'>
                        <Card.Header>
                            <h4 className='font-semibold'>Alcohol</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className='flex justify-between items-center cursor-pointer' onClick={() => updateFormData('alcoholic', !isAlcoholic)}>
                                <div className='flex justify-center items-center'>
                                    <img src={Alcohol} alt="Serves_Alcohol image" className='mr-2 h-[22px] w-[22px]' />
                                    <label className='text-[14px] font-semibold cursor-pointer'>Serves Alcohol</label>
                                </div>
                                <input
                                    type="checkbox"
                                    className='h-4 w-4 accent-[#ff4000] cursor-pointer'
                                    checked={isAlcoholic}
                                    onChange={handleAlcoholChange}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default FoodPreferences;
