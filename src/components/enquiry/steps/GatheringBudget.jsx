import React, { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Input from '../../common/Input';

const GatheringBudget = () => {
  const [budgetType, setBudgetType] = useState('perPerson');
  
    {/**
      * The Card, Input and Button are taken from the Component(Common).
      * Collect Gathering Size.
      * Collect Budget.
      *    -> Budget Can be either.
      *         -> Per Person 
      *         -> Lump Sum
      */}

  return (
    <div className="bg-white grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/**
         * 1- Mobile view -> Columns 
         * 2- Large Screen View -> Rows
         */}

         {/**
          * Gathering Size Card
          */}

      <Card padding="lg" className="w-full">
        <Card.Header>
          <h2 className="text-xl font-semibold justify-start">
            Gathering Size
          </h2>
        </Card.Header>

        <Card.Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500 font-semibold">
                Minimum
              </h3>
              <Input
                type="number"
                min={0}
                fullWidth
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500 font-semibold">
                Maximum
              </h3>
              <Input
                type="number"
                min={0}
                fullWidth
              />
            </div>

          </div>
        </Card.Body>
      </Card>

        {/**
          * Gathering Size Card
          */}
        
      <Card padding="lg" className="w-full">
        <Card.Header>
          <div className="flex flex-row items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">
                Budget
            </h2>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="3xs"
                onClick={() => setBudgetType('perPerson')}
                className={`rounded-full px-2 ${
                  budgetType === 'perPerson'
                    ? 'text-orange-600 border-[#ff4000]'
                    : 'text-gray-700 border-gray-400'
                }`}
              >
                Per Person
              </Button>

              <Button
                variant="outline"
                size="3xs"
                onClick={() => setBudgetType('lumpSum')}
                className={`rounded-full px-2 ${
                  budgetType === 'lumpSum'
                    ? 'text-orange-600 border-[#ff4000]'
                    : 'text-gray-700 border-gray-400'
                }`}
              >
                Lump Sum
              </Button>
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          {budgetType === 'perPerson' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex flex-col gap-2">
                <h3 className="text-gray-500 font-semibold">
                    Minimum Price
                </h3>
                <Input
                  type="number"
                  min={0}
                  fullWidth
                  leftIcon={
                                <span className="font-semibold text-gray-500">
                                    ₹
                                </span>
                            }
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-gray-500 font-semibold ">
                    Maximum Price
                </h3>
                <Input
                  type="number"
                  min={0}
                  fullWidth
                  leftIcon={
                                <span className='font-semibold text-gray-500'>
                                    ₹
                                </span>
                            }
                />
              </div>

            </div>
          )}

          {budgetType === 'lumpSum' && (
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500 font-semibold">
                Total Budget (excl. additional services)
            </h3>
              <Input
                type="number"
                className="sm:max-w-75"
                leftIcon={
                            <span className='font-semibold text-gray-500'>
                                ₹
                            </span>
                        }
              />
            </div>
          )}
        </Card.Body>
      </Card>

    </div>
  );
};

export default GatheringBudget;

