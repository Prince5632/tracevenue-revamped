import { serviceOptions } from "@features/venue/enquiry/constants";
import { format } from "date-fns";

const SidebarContent = ({ step, isLast, index, currentStep, formData }) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;
  const summary = getStepSummary(step?.id, formData, step?.subtitle);

  return (
    <div className="flex gap-5 ">
      <div className="flex flex-col items-center">
        <div className="w-[24px] h-[24px] rounded-full bg-[#FFFFFF] border-[1px] border-[#D7D9DA] flex items-center justify-center">
          <div
            className={`w-[18px] h-[18px] rounded-full
              ${isCompleted
                ? "bg-[#15b076]"
                : isActive
                  ? "bg-[#FF4000] border-white"
                  : "border border-white bg-[#fff]"
              }
            `}
          ></div>
        </div>

        {!isLast && <div className="w-[3px] flex-1 bg-[#FFFFFF] "></div>}
      </div>

      <div className="-mt-1 leading-[18px] mb-4">
        <h6 className={`font-bold text-[16px] ${isActive ? 'text-[#060606]' : 'text-[#060606]'}`}>
          {step.shortTitle}
        </h6>

        {summary}
      </div>
    </div>
  );
};

export default SidebarContent;

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return null;
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(numericValue);
};

const formatDateLabel = (dateEntry) => {
  if (!dateEntry?.date) return null;
  const dateObj = new Date(dateEntry.date);
  if (Number.isNaN(dateObj.getTime())) return null;
  const dateText = format(dateObj, "MMM d, yyyy");
  if (dateEntry.allDay) return `${dateText} · All day`;
  if (dateEntry.startTime && dateEntry.endTime) {
    return `${dateText} · ${dateEntry.startTime} - ${dateEntry.endTime}`;
  }
  return dateText;
};

const getStepSummary = (stepId, formData = {}, fallback) => {
  switch (stepId) {
    case "location":
      if (!formData?.locations) break;
      return (
        <div className="mt-1">
          <p className="text-[#060606] text-[13px] font-medium line-clamp-2">
            {formData.locations}
          </p>
          {formData?.radius ? (
            <p className="text-[#5C5F62] text-[12px]">
              Within {formData.radius} km
            </p>
          ) : null}
        </div>
      );
    case "service_type": {
      if (!formData?.serviceType) break;
      const label =
        serviceOptions.find((opt) => opt.id === formData.serviceType)
          ?.serviceType || formData.serviceType;
      return (
        <div className="mt-1">
          <p className="text-[#060606] text-[13px] font-medium line-clamp-2">
            {label}
          </p>
        </div>
      );
    }
    case "event_type": {
      const label =
        formData?.selectedEventType?.label ||
        formData?.selectedEventType?.eventName;
      if (!label) break;
      return (
        <p className="text-[#060606] text-[13px] font-medium line-clamp-2 mt-1">
          {label}
        </p>
      );
    }
    case "gathering_budget": {
      const range = formData?.selectedPeopleRange;
      const minPeople = range?.minPeople;
      const maxPeople = range?.maxPeople;
      const minBudget = formatCurrency(formData?.minBudgetValue);
      const maxBudget = formatCurrency(formData?.maxBudgetValue);
      const budgetTypeLabel =
        formData?.budgetType === "lumpSum" ? "total budget" : "per guest";

      const lines = [
        minPeople && maxPeople ? `${minPeople}-${maxPeople} guests` : null,
        minBudget && maxBudget
          ? `₹${minBudget}-₹${maxBudget} ${budgetTypeLabel}`
          : null,
      ].filter(Boolean);

      if (!lines.length) break;

      return (
        <div className="mt-1 flex flex-col gap-0.5">
          {lines.map((line) => (
            <p
              key={line}
              className="text-[#060606] text-[13px] font-medium line-clamp-2"
            >
              {line}
            </p>
          ))}
        </div>
      );
    }
    case "event_date": {
      const label = formatDateLabel(formData?.selectedDates?.[0]);
      if (!label) break;
      return (
        <p className="text-[#060606] text-[13px] font-medium mt-1">
          {label}
        </p>
      );
    }
    case "food_preferences": {
      const vegOnly =
        typeof formData?.vegOnly === "boolean"
          ? formData.vegOnly
          : formData?.dietaryRequirements?.includes("vegOnly");
      const alcohol =
        typeof formData?.alcoholic === "boolean"
          ? formData.alcoholic
          : formData?.dietaryRequirements?.includes("alcoholic");
      if (vegOnly === undefined && alcohol === undefined) break;
      return (
        <p className="text-[#060606] text-[13px] font-medium mt-1">
          {vegOnly ? "Pure Veg" : "Veg & Non-Veg"}
          {" · "}
          {alcohol ? "Alcohol OK" : "No Alcohol"}
        </p>
      );
    }
    default:
      break;
  }

  return (
    <span className="text-[#5C5F62] text-[12px] font-semibold leading-medium">
      {fallback}
    </span>
  );
};
