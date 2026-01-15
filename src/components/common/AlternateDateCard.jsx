import { useState } from "react";
import React from "react";
import Card from "./Card";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CustomTimePicker from "./CustomTimePicker";
import imgcal from "./../../assets/dashboard/calendar.svg";
import hoursgreen from "./../../assets/new images/hours.png";
import hoursgray from "./../../assets/new images/hoursgray.svg";

function AlternateDateCard() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dayName = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const dayNumber = date.toLocaleDateString("en-US", {
    day: "2-digit",
  });

  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const [hoursimg, setHoursimg] = useState(hoursgray);
  const [hours, setHours] = useState(false);
  const [fullday, setFullday] = useState("Time");
  const handleHours = () => {
    setHours(!hours);
    if (hours) {
      setHoursimg(hoursgreen);
      setFullday("Fullday");
    } else {
      setHoursimg(hoursgray);
      setFullday("Time");
    }
  };
  const [t1Time, setT1Time] = useState();
  const [t2Time, setT2Time] = useState("10:30");

  return (
    <>
      <Card
        variant="default"
        padding="md"
        className="flex items-center justify-around gap-5"
      >
        <div className="text-left">
          <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
            {dayName}
          </div>
          <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
            {dayNumber} {monthName}
          </div>
        </div>

        <div className="h-16 w-[25%] bg-green-100 p-1 rounded-xl flex flex-col justify-center items-center text-[#85878C]">
          {fullday === "Fullday" && fullday}
          {fullday === "Time" && (
            <>
              <CustomTimePicker />
              <CustomTimePicker />
            </>
          )}
        </div>

        <div className="flex items-center">
          <button onClick={handleHours}>
            <img src={hoursimg} alt="" className="self-auto" />
          </button>
        </div>

        <div className="flex items-center">
          <button onClick={() => setOpen(!open)}>
            <img src={imgcal} alt="" />
          </button>
        </div>

        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-600 lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </Card>
    </>
  );
}

export default AlternateDateCard;
