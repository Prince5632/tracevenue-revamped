import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '@shared/components/ui';
import { Info } from 'lucide-react';

const GatheringBudget = ({ formData, updateFormData }) => {
  const [budgetType, setBudgetType] = useState('perPerson');
  const [minPeople, setMinPeople] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [budget, setBudget] = useState(""); // Total Budget for "lumpSum"

  // Hydrate from store
  useEffect(() => {
    if (formData.selectedPeopleRange) {
      setMinPeople(formData.selectedPeopleRange.minPeople);
      setMaxPeople(formData.selectedPeopleRange.maxPeople);
    }
    if (formData.minBudgetValue) setMinBudget(formData.minBudgetValue);
    if (formData.maxBudgetValue) setMaxBudget(formData.maxBudgetValue);

    // Logic for total budget if lumpsum
    // Our store structure keeps min/max budget separately.
    // If budgetType is lumpSum, user enters one figure? No, UI shows "Total Budget".
    // Let's deduce budgetType from formData if available
    if (formData.budgetType) {
      setBudgetType(formData.budgetType);
      if (formData.budgetType === 'lumpSum' && formData.maxBudgetValue) {
        // For lumpSum, store uses maxBudgetValue as total budget?
        // Or maybe minBudgetValue=0, maxBudgetValue=total?
        // Let's assume total budget is stored in maxBudgetValue for now,
        // or check how old system did it. 
        // Logic below sets budget state.
        setBudget(formData.maxBudgetValue);
      }
    }
  }, [formData.selectedPeopleRange, formData.minBudgetValue, formData.maxBudgetValue, formData.budgetType]);


  // Helper validators
  const isInvalidPeopleRange =
    minPeople !== "" &&
    maxPeople !== "" &&
    Number(maxPeople) < Number(minPeople);

  const isInvalidBudgetRange =
    budgetType === 'perPerson' &&
    minBudget !== "" &&
    maxBudget !== "" &&
    Number(maxBudget) < Number(minBudget);

  // Update handlers
  const handlePeopleChange = (key, value) => {
    if (key === 'min') setMinPeople(value);
    if (key === 'max') setMaxPeople(value);

    // Update store object
    const newRange = {
      minPeople: key === 'min' ? value : minPeople,
      maxPeople: key === 'max' ? value : maxPeople
    };
    updateFormData('selectedPeopleRange', newRange);
  };

  const handleBudgetChange = (key, value) => {
    if (budgetType === 'perPerson') {
      if (key === 'min') setMinBudget(value);
      if (key === 'max') setMaxBudget(value);

      updateFormData('minBudgetValue', key === 'min' ? value : minBudget);
      updateFormData('maxBudgetValue', key === 'max' ? value : maxBudget);
      updateFormData('budgetType', 'perPerson');
    } else {
      // Lump sum
      setBudget(value);
      // For lump sum, typically min=0, max=value?
      // Or min=value, max=value?
      // Let's set max to value, min to 0
      updateFormData('minBudgetValue', 0);
      updateFormData('maxBudgetValue', value);
      updateFormData('budgetType', 'lumpSum');
    }
  };

  const handleBudgetTypeSelect = (type) => {
    setBudgetType(type);
    updateFormData('budgetType', type);

    // Reset values or convert?
    // Existing logic kept values but converted them.
    // Let's stick to simple reset or re-calculation if needed.
    if (type === 'lumpSum') {
      // Auto-calculate if data exists
      if (maxPeople && maxBudget && budgetType === 'perPerson') {
        const total = String(Number(maxPeople) * Number(maxBudget));
        setBudget(total);
        handleBudgetChange('total', total); // triggers store update inside logic above? No, need to change logic.
        updateFormData('minBudgetValue', 0);
        updateFormData('maxBudgetValue', total);
      } else {
        setBudget("");
        updateFormData('minBudgetValue', 0);
        updateFormData('maxBudgetValue', "");
      }
    } else {
      // Switching to perPerson
      if (maxBudget && budgetType === 'lumpSum') {
        // Approximate? 
        // Logic: 80% of (Total / MaxPeople)? 
        // Simple: Clear fields to avoid confusion.
        setMinBudget("");
        setMaxBudget("");
        updateFormData('minBudgetValue', "");
        updateFormData('maxBudgetValue', "");
      }
    }
  };

  return (
    <div className="bg-white grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/** Gathering Size Card */}
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
                  handlePeopleChange('min', value);
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
                  handlePeopleChange('max', value);
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


      {/** Budget Card */}
      <Card padding="md" className="w-full ">
        <Card.Header>
          <div className="flex items-center justify-between gap-3 text-gray-800">
            <h2 className="text-xl font-semibold">Budget</h2>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="3xs"
                onClick={() => handleBudgetTypeSelect('perPerson')}
                className={`rounded-full px-2 ${budgetType === 'perPerson'
                  ? 'text-orange-600 border-[#ff4000]'
                  : 'text-gray-700 border-gray-400'
                  }`}
              >
                Per Person
              </Button>

              <Button
                variant="outline"
                size="3xs"
                onClick={() => handleBudgetTypeSelect('lumpSum')}
                className={`rounded-full px-2 ${budgetType === 'lumpSum'
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
                      handleBudgetChange('min', value);
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
                      handleBudgetChange('max', value);
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
                  handleBudgetChange('total', value);
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
