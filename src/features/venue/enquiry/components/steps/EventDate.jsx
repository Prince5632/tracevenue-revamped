import React, { useState, useEffect } from "react";
import { Card, CustomTimePicker } from "@shared/components/ui";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import imgcal from "@assets/dashboard/calendar.svg";
import hoursgreen from "@assets/new images/hours.png";
import hoursgray from "@assets/new images/hoursgray.svg";
import GreenLine from "../EventDate/GreenLine";

const EventDate = ({ formData, updateFormData }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  // UI State for Hours toggle
  const [hoursimg, setHoursimg] = useState(hoursgray);
  const [hours, setHours] = useState(false); // false = Time (default), true = Fullday
  const [fullday, setFullday] = useState("Time");

  // Hydrate from store
  useEffect(() => {
    if (formData.selectedDates && formData.selectedDates.length > 0) {
      const firstDate = formData.selectedDates[0];
      if (firstDate && firstDate.date) {
        setDate(new Date(firstDate.date));

        // Hydrate All Day toggle
        if (firstDate.allDay) {
          setHours(true);
          setHoursimg(hoursgreen);
          setFullday("Fullday");
        } else {
          setHours(false);
          setHoursimg(hoursgray);
          setFullday("Time");
        }
      }
    }
  }, [formData.selectedDates]);

  const updateStoreDate = (newDate, isAllDay) => {
    const dateStr = newDate.toISOString().split("T")[0];
    // Create new object for store
    const newEntry = {
      date: dateStr,
      allDay: isAllDay,
      startTime: isAllDay ? "00:00" : "09:00", // Default start
      endTime: isAllDay ? "23:59" : "17:00", // Default end
    };

    // Update ONLY the first entry in selectedDates array
    const currentDates = formData.selectedDates || [];
    const newDates =
      currentDates.length > 0
        ? [newEntry, ...currentDates.slice(1)]
        : [newEntry];

    updateFormData("selectedDates", newDates);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setOpen(false);
    updateStoreDate(newDate, hours);
  };

  const handleHours = () => {
    const newHoursState = !hours;
    setHours(newHoursState);
    if (newHoursState) {
      setHoursimg(hoursgreen);
      setFullday("Fullday");
    } else {
      setHoursimg(hoursgray);
      setFullday("Time");
    }
    updateStoreDate(date, newHoursState);
  };

  // Dates for display
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = date.toLocaleDateString("en-US", { day: "2-digit" });
  const monthName = date.toLocaleDateString("en-US", { month: "short" });

  const [openCalendarId, setOpenCalendarId] = useState(null);
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 justify-around gap-5">
        {/*Preffered Card 1*/}
        <div className="h-full w-full">
          <h1 className="font-semibold text-[18px] mb-5">Preffered Date</h1>

          {/* Card Component */}
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
            <div className="flex items-center sm:w-[30%] w-[34%] justify-between bg-[#C6FBE580]  rounded-xl px-3 py-1">
              <GreenLine type={fullday} />

              {fullday === "Time" && (
                <div className="flex flex-col">
                  <CustomTimePicker />
                  <CustomTimePicker />
                </div>
              )}
            </div>

            <div>
              <button onClick={handleHours}>
                <img src={hoursimg} alt="" className="self-auto" />
              </button>
            </div>

            <div>
              <button onClick={() => setOpen(!open)}>
                <img src={imgcal} alt="" />
              </button>

              {open && (
                <div className="absolute rounded-xl shadow top-30 left-110 z-50 bg-white w-fit h-fit">
                  <Calendar
                    onClose={() => setOpen(false)}
                    date={date}
                    onChange={(e) => {
                      setDate(e);
                      setOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className=" w-full h-100 ">
          <h1 className="mb-5 font-semibold text-[18px] text-[#070707]">
            Alternate Dates (optional)
          </h1>
          <div className="w-full flex flex-col gap-4">
            {/*Alternate Card 1 
                            Taken the card code from prefferred card instead we can make a alternate card component
                        */}

            <Card
              variant="default"
              padding="md"
              className="flex items-center justify-around gap-2"
            >
              <div className="text-left">
                <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                  {dayName}
                </div>
                <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                  {dayNumber} {monthName}
                </div>
              </div>

              <div className="flex items-center sm:w-[30%] w-[34%] justify-between bg-[#C6FBE580]  rounded-xl px-3 py-1">
                <GreenLine type={fullday} />

                {fullday === "Time" && (
                  <div className="flex flex-col">
                    <CustomTimePicker />
                    <CustomTimePicker />
                  </div>
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
                {open && (
                  <div className="absolute rounded-xl shadow top-30 left-110 z-50 bg-white w-fit h-fit">
                    <Calendar
                      onClose={() => setOpen(false)}
                      date={date}
                      onChange={(e) => {
                        setDate(e);
                        setOpen(false);
                      }}
                    />
                  </div>
                )}
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

            {/* Alternate Card 2 
                            Taken the card code from above instead we can make a component
                        */}
            <Card
              variant="default"
              padding="md"
              className="flex items-center justify-around gap-2"
            >
              <div className="text-left">
                <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                  {dayName}
                </div>
                <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                  {dayNumber} {monthName}
                </div>
              </div>

              <div className="flex items-center sm:w-[30%] w-[34%] justify-between bg-[#C6FBE580]  rounded-xl px-3 py-1">
                <GreenLine type={fullday} />

                {fullday === "Time" && (
                  <div className="flex flex-col">
                    <CustomTimePicker />
                    <CustomTimePicker />
                  </div>
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

                {open && (
                  <div className="absolute rounded-xl shadow top-30 left-110 z-50 bg-white w-fit h-fit">
                    <Calendar
                      onClose={() => setOpen(false)}
                      date={date}
                      onChange={(e) => {
                        setDate(e);
                        setOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
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

            {/*Alternate Card 3
             */}

            <Card className="w-full h-fit flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                className="text-orange-600 lucide lucide-plus-icon lucide-plus"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDate;
