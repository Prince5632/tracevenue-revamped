import React, { useState } from 'react';
import { Card, Button, Input } from '@shared/components/ui';
import { Info } from 'lucide-react';

const GatheringBudget = () => {
  const [budgetType, setBudgetType] = useState('perPerson');
  const [minPeople, setMinPeople] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [budget, setBudget] = useState("");



  {/**This Line of Code tell us if maxPeople and maxBudget is less than we have to put the warning. */ }
  const isInvalidPeopleRange =
    minPeople !== "" &&
    maxPeople !== "" &&
    Number(maxPeople) < Number(minPeople);

  const isInvalidBudgetRange =
    minBudget !== "" &&
    maxBudget !== "" &&
    Number(maxBudget) < Number(minBudget);

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
           * Gathering Size Card
        */}

      <Card padding="md" className="max-w-full pb-10">
        <Card.Header>
          <h2 className="text-xl font-semibold text-gray-800">Gathering Size</h2>
        </Card.Header>

        <Card.Body>
          <div className="flex flex-row sm:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500 font-semibold">Minimum</h3>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                fullWidth
                value={minPeople}
                required
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setMinPeople(value)
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500 font-semibold">Maximum</h3>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                fullWidth
                required
                value={maxPeople}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setMaxPeople(value);
                }}
              />
            </div>
          </div>

          {isInvalidPeopleRange && (
            <p className="mt-3!  flex items-start gap-1 text-sm  text-orange-600!">
              <Info size={16} className="shrink-0" />Max people range should be greater than min people range
            </p>
          )}
        </Card.Body>

      </Card>


      {/**
        *  Budget Card
        */}
      <Card padding="md" className="w-full ">
        <Card.Header>
          <div className="flex items-center justify-between gap-3 text-gray-800">
            <h2 className="text-xl font-semibold">Budget</h2>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="3xs"
                onClick={() => {
                  setBudgetType('perPerson')
                  if (maxBudget) {
                    const eightyPercentage = Math.floor(Number(maxBudget) * 0.8);
                    setMinBudget(String(eightyPercentage))
                  }
                }}
                className={`rounded-full px-3 ${budgetType === 'perPerson'
                  ? 'text-orange-600 border-[#ff4000]'
                  : 'text-gray-700 border-gray-400'
                  }`}
              >
                Per Person
              </Button>

              <Button
                variant="outline"
                size="3xs"
                onClick={() => {
                  setBudgetType('lumpSum');

                  if (maxPeople && maxBudget) {
                    setBudget(String(Number(maxPeople) * Number(maxBudget)));
                  } else {
                    setBudget("");
                  }
                }}
                className={`rounded-full px-3 ${budgetType === 'lumpSum'
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
            <>
              <div className="flex flex-row sm:flex-row gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-gray-500 font-semibold">
                    Minimum Price
                  </h3>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    fullWidth
                    required
                    leftIcon={<span className="font-semibold text-gray-500">₹</span>}
                    value={minBudget}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setMinBudget(value)
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-gray-500 font-semibold">
                    Maximum Price
                  </h3>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    fullWidth
                    required
                    leftIcon={<span className="font-semibold text-gray-500">₹</span>}
                    value={maxBudget}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setMaxBudget(value)
                    }}
                  />
                </div>
              </div>


              {isInvalidBudgetRange && (
                <p className="mt-3! flex items-start gap-1 text-sm text-orange-600!">
                  <Info size={16} className="shrink-0" />Maximum budget must be greater than minimum budget
                </p>
              )}
            </>
          )}

          {budgetType === 'lumpSum' && (
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500 font-semibold">
                Total Budget (excl. additional services)
              </h3>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="sm:max-w-75"
                leftIcon={<span className="font-semibold text-gray-500">₹</span>}
                value={budget}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setBudget(value);
                }}
              />

            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GatheringBudget;
