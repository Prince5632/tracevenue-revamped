import React from "react";
import { useState } from "react";
import Card from "../Card";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CustomTimePicker from "../CustomTimePicker";
import imgcal from "../../../assets/dashboard/calendar.svg";
import hoursgreen from "../../../assets/new images/hours.png";
import hoursgray from "../../../assets/new images/hoursgray.svg";

function PrefferedDateCard({
  date1,
  setOpen,
  open,
  t1Time,
  setT1Time,
  t2Time,
  setT2Time,
}) {
  const dayName = date1.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const dayNumber = date1.toLocaleDateString("en-US", {
    day: "2-digit",
  });

  const monthName = date1.toLocaleDateString("en-US", {
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

  return (
    <>
      <div>
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

          <div className="h-16 w-[33%] bg-green-100 p-2 rounded-xl flex flex-col justify-center items-center text-[#85878C]">
            {fullday === "Fullday" && (
              <div className="flex items-center gap-2 py-4">
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="mr-3"
                  >
                    <circle cx="12" cy="12" r="10" fill="#15B076" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium mr-2">{fullday}</span>
                </div>
              </div>
            )}
            {fullday === "Time" && (
              <div className="flex">
                <div className="">
                  <svg
                    width="24"
                    height="60"
                    viewBox="0 0 24 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="12"
                      y1="14"
                      x2="12"
                      y2="40"
                      stroke="#B1F4D8"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="5" fill="#15B076" />
                    <circle cx="12" cy="45" r="5" fill="#15B076" />
                  </svg>
                </div>
                <div>
                  <CustomTimePicker
                    onChange={(e) => setT1Time(e)}
                    value={t1Time}
                  />
                  <CustomTimePicker
                    onChange={(e) => setT2Time(e)}
                    value={t2Time}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button onClick={handleHours}>
              <img src={hoursimg} alt="" className="self-auto" />
            </button>
          </div>

          <div>
            <button
              className="cursor-pointer"
              onClick={(e) => {
                setOpen(!open);
                e.stopPropagation();
              }}
            >
              <img src={imgcal} alt="" />
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default PrefferedDateCard;
