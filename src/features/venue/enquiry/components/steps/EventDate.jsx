import React, { useState, useEffect } from "react";
import { Card, CustomTimePicker } from "@shared/components/ui";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import imgcal from "@assets/dashboard/calendar.svg";
import hoursgreen from "@assets/new images/hours.png";
import hoursgray from "@assets/new images/hoursgray.svg";
import GreenLine from "../EventDate/GreenLine";

const parseStoredDate = (entry) => ({
  date: entry?.date ? new Date(entry.date + "T00:00:00") : new Date(),
  allDay: Boolean(entry?.allDay),
  startTime: entry?.allDay ? "09:00" : (entry?.startTime || "09:00"),
  endTime: entry?.allDay ? "17:00" : (entry?.endTime || "17:00"),
  open: false,
});

const EventDate = ({ formData, updateFormData }) => {

  /* -------------------- STATE -------------------- */

  const storedDates = formData?.selectedDates;
  const hasStored = Array.isArray(storedDates) && storedDates.length > 0;

  const [preferred, setPreferred] = useState(() =>
    hasStored
      ? parseStoredDate(storedDates[0])
      : { date: new Date(), allDay: false, startTime: "09:00", endTime: "17:00", open: false }
  );

  const [alternateDates, setAlternateDates] = useState(() =>
    hasStored && storedDates.length > 1
      ? storedDates.slice(1).map(parseStoredDate)
      : []
  );

  /* -------------------- HELPERS -------------------- */

  const formatDateForStore = (obj) => {
    const d = obj.date;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return {
      date: `${yyyy}-${mm}-${dd}`,
      allDay: obj.allDay,
      startTime: obj.allDay ? "00:00" : obj.startTime,
      endTime: obj.allDay ? "23:59" : obj.endTime,
    };
  };

  const getAllSelectedDates = () => {
    const preferredDate = preferred.date.toDateString();
    const altDates = alternateDates
      .filter((d) => d.date)
      .map((d) => d.date.toDateString());

    return [preferredDate, ...altDates];
  };

  const isDateDisabled = (date, currentDate = null) => {
    const selected = getAllSelectedDates().filter(
      (d) => d !== (currentDate ? currentDate.toDateString() : null)
    );
    return selected.includes(date.toDateString());
  };

  /* -------------------- STORE UPDATE -------------------- */

  useEffect(() => {
    const allDates = [
      formatDateForStore(preferred),
      ...alternateDates
        .filter((d) => d.date)
        .map((d) => formatDateForStore(d)),
    ];
    updateFormData("selectedDates", allDates);
  }, [preferred, alternateDates]);

  /* -------------------- DATE DISPLAY -------------------- */

  const renderDateText = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayNumber = date.toLocaleDateString("en-US", { day: "2-digit" });
    const monthName = date.toLocaleDateString("en-US", { month: "short" });

    return (
      <>
        <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
          {dayName}
        </div>
        <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
          {dayNumber} {monthName}
        </div>
      </>
    );
  };

  /* -------------------- PREFERRED -------------------- */

  const handlePreferredDate = (date) => {
    setPreferred((prev) => ({ ...prev, date, open: false }));
  };

  const togglePreferredAllDay = () => {
    setPreferred((prev) => ({ ...prev, allDay: !prev.allDay }));
  };

  const handlePreferredTimeChange = (field, value) => {
    setPreferred((prev) => ({ ...prev, [field]: value }));
  };

  /* -------------------- ALTERNATE -------------------- */

  const addAlternateCard = () => {
    if (alternateDates.length >= 3) return;

    setAlternateDates((prev) => [
      ...prev,
      {
        date: null,
        allDay: false,
        startTime: "09:00",
        endTime: "17:00",
        open: false,
      },
    ]);
  };

  const handleAlternateDate = (index, date) => {
    setAlternateDates((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, date, open: false } : item
      )
    );
  };

  const toggleAlternateAllDay = (index) => {
    setAlternateDates((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, allDay: !item.allDay } : item
      )
    );
  };

  const handleAlternateTimeChange = (index, field, value) => {
    setAlternateDates((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const toggleAlternateCalendar = (index) => {
    setAlternateDates((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  };

  const removeAlternate = (index) => {
    setAlternateDates((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">

      {/* Preferred Date */}
      <div className="w-full">
        <h1 className="font-semibold text-[18px] mb-5">
          Preferred Date
        </h1>

        <Card
          variant="default"
          padding="md"
          className="relative flex items-center justify-around gap-5"
        >
          <div>{renderDateText(preferred.date)}</div>

          <div className="flex items-center sm:w-[30%] w-[34%] justify-between bg-[#C6FBE580] rounded-xl px-3 py-1">
            <GreenLine type={preferred.allDay ? "Fullday" : "Time"} />
            {!preferred.allDay && (
              <div className="flex flex-col">
                <CustomTimePicker
                  value={preferred.startTime}
                  onChange={(val) =>
                    handlePreferredTimeChange("startTime", val)
                  }
                />
                <CustomTimePicker
                  value={preferred.endTime}
                  onChange={(val) =>
                    handlePreferredTimeChange("endTime", val)
                  }
                />
              </div>
            )}
          </div>

          <button onClick={togglePreferredAllDay}>
            <img src={preferred.allDay ? hoursgreen : hoursgray} alt="" />
          </button>

          <div className="relative">
            <button onClick={() =>
              setPreferred((p) => ({ ...p, open: !p.open }))
            }>
              <img src={imgcal} alt="" />
            </button>

            {preferred.open && (
              <div className="absolute top-full left-3/2 -translate-x-2/2 mt-2 rounded-xl shadow-lg z-50 bg-white">
                <Calendar
                  date={preferred.date}
                  onChange={handlePreferredDate}
                  disabledDay={(date) =>
                    isDateDisabled(date, preferred.date)
                  }
                  minDate={new Date()}
                />
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Alternate Dates */}
      <div className="w-full">
        <h1 className="mb-5 font-semibold text-[18px]">
          Alternate Dates (optional)
        </h1>

        <div className="flex flex-col gap-4">
          {alternateDates.map((alt, index) => (
            <Card
              key={index}
              variant="default"
              padding="md"
              className="relative flex items-center justify-around gap-2"
            >
              {!alt.date ? (
                <div className="w-full flex justify-center">
                  <div className="rounded-xl shadow-lg bg-white p-2">
                    <Calendar
                      date={new Date()}
                      onChange={(date) =>
                        handleAlternateDate(index, date)
                      }
                      disabledDay={(date) =>
                        isDateDisabled(date)
                      }
                      minDate={new Date()}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>{renderDateText(alt.date)}</div>

                  <div className="flex items-center sm:w-[30%] w-[34%] justify-between bg-[#C6FBE580] rounded-xl px-3 py-1">
                    <GreenLine type={alt.allDay ? "Fullday" : "Time"} />
                    {!alt.allDay && (
                      <div className="flex flex-col">
                        <CustomTimePicker
                          value={alt.startTime}
                          onChange={(val) =>
                            handleAlternateTimeChange(index, "startTime", val)
                          }
                        />
                        <CustomTimePicker
                          value={alt.endTime}
                          onChange={(val) =>
                            handleAlternateTimeChange(index, "endTime", val)
                          }
                        />
                      </div>
                    )}
                  </div>

                  <button onClick={() => toggleAlternateAllDay(index)}>
                    <img src={alt.allDay ? hoursgreen : hoursgray} alt="" />
                  </button>

                  <div className="relative">
                    <button onClick={() => toggleAlternateCalendar(index)}>
                      <img src={imgcal} alt="" />
                    </button>

                    {alt.open && (
                      <div className="absolute top-full left-3/2 -translate-x-2/2 mt-2 rounded-xl shadow-lg z-50 bg-white">
                        <Calendar
                          date={alt.date}
                          onChange={(date) =>
                            handleAlternateDate(index, date)
                          }
                          disabledDay={(date) =>
                            isDateDisabled(date, alt.date)
                          }
                          minDate={new Date()}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => removeAlternate(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-red-600"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                </>
              )}
            </Card>
          ))}

          {alternateDates.length < 3 && (
            <Card
              className="w-full flex justify-center items-center cursor-pointer h-26"
              onClick={addAlternateCard}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                className="text-orange-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDate;
