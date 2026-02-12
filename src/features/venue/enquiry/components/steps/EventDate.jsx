import React, { useState } from "react";
import { Card, CustomTimePicker } from "@shared/components/ui";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import imgcal from "@assets/dashboard/calendar.svg";
import hoursgreen from "@assets/new images/hours.png";
import hoursgray from "@assets/new images/hoursgray.svg";

const EventDate = () => {
  /* Helpers */

  const isSameDay = (d1, d2) =>
    d1.toDateString() === d2.toDateString();

  const today = new Date();

  /* Preferred Date State */

  const [preferred, setPreferred] = useState({
    date: new Date(),
    isFullDay: false,
    open: false,
    startTime: "",
    endTime: "",
  });

  /* Alternate Dates State */

  const [alternateDates, setAlternateDates] = useState([
    {
      id: 1,
      date: new Date(),
      isFullDay: false,
      open: false,
      startTime: "",
      endTime: "",
    },
  ]);

  /*Prevent Duplicate Dates */

  const isDateDisabled = (dateToCheck, currentId = null) => {
    if (dateToCheck < today.setHours(0, 0, 0, 0)) return true;

    if (isSameDay(dateToCheck, preferred.date)) return true;

    return alternateDates.some(
      (item) =>
        item.id !== currentId &&
        isSameDay(item.date, dateToCheck)
    );
  };

  /*Preferred Handlers*/

  const togglePreferredHours = () => {
    setPreferred((prev) => ({
      ...prev,
      isFullDay: !prev.isFullDay,
    }));
  };

  const setPreferredCalendar = (value) => {
    if (isDateDisabled(value)) return;

    setPreferred((prev) => ({
      ...prev,
      date: value,
      open: false,
    }));
  };

  /*  Alternate Handlers*/

  const toggleAlternateHours = (id) => {
    setAlternateDates((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isFullDay: !item.isFullDay }
          : item
      )
    );
  };

  const setAlternateCalendar = (id, value) => {
    if (isDateDisabled(value, id)) return;

    setAlternateDates((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, date: value, open: false }
          : item
      )
    );
  };

  const removeAlternateDate = (id) => {
    setAlternateDates((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addAlternateDate = () => {
    if (alternateDates.length >= 3) return;

    setAlternateDates((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: new Date(),
        isFullDay: false,
        open: false,
        startTime: "",
        endTime: "",
      },
    ]);
  };

  /* Date Format Helper*/

  const formatDateParts = (date) => ({
    dayName: date.toLocaleDateString("en-US", {
      weekday: "long",
    }),
    dayNumber: date.toLocaleDateString("en-US", {
      day: "2-digit",
    }),
    monthName: date.toLocaleDateString("en-US", {
      month: "short",
    }),
  });

  const preferredParts = formatDateParts(preferred.date);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 justify-around gap-5">
      {/* Preferred Date*/}

      <div className="h-full w-full">
        <h1 className="font-semibold text-[18px] mb-5">
          Preffered Date
        </h1>

        <Card
          variant="default"
          padding="md"
          className="flex items-center justify-around gap-5 relative"
        >
          <div className="text-left">
            <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
              {preferredParts.dayName}
            </div>
            <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
              {preferredParts.dayNumber}{" "}
              {preferredParts.monthName}
            </div>
          </div>

          <div className="h-16 w-[25%] bg-green-200 p-1 rounded-xl flex flex-col justify-center items-center text-[#85878C]">
            {preferred.isFullDay ? (
              "Fullday"
            ) : (
              <>
                <CustomTimePicker
                  value={preferred.startTime}
                  onChange={(val) =>
                    setPreferred((prev) => ({
                      ...prev,
                      startTime: val,
                    }))
                  }
                />
                <CustomTimePicker
                  value={preferred.endTime}
                  onChange={(val) =>
                    setPreferred((prev) => ({
                      ...prev,
                      endTime: val,
                    }))
                  }
                />
              </>
            )}
          </div>

          <button onClick={togglePreferredHours}>
            <img
              src={
                preferred.isFullDay ? hoursgreen : hoursgray
              }
              alt=""
            />
          </button>

          <button
            onClick={() =>
              setPreferred((prev) => ({
                ...prev,
                open: !prev.open,
              }))
            }
          >
            <img src={imgcal} alt="" />
          </button>

          {preferred.open && (
            <div className="absolute rounded-xl shadow top-20 right-10 z-50 bg-white">
              <Calendar
                date={preferred.date}
                minDate={new Date()}
                disabledDay={isDateDisabled}
                onChange={(value) =>
                  setPreferredCalendar(value)
                }
              />
            </div>
          )}
        </Card>
      </div>

      {/*Alternate Dates*/}

      <div className="w-full">
        <h1 className="mb-5 font-semibold text-[18px] text-[#070707]">
          Alternate Dates (optional)
        </h1>

        <div className="w-full flex flex-col gap-4">
          {alternateDates.map((item) => {
            const parts = formatDateParts(item.date);

            return (
              <Card
                key={item.id}
                variant="default"
                padding="md"
                className="flex items-center justify-around gap-5 relative"
              >
                <div className="text-left">
                  <div className="text-base bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    {parts.dayName}
                  </div>
                  <div className="text-3xl font-bold bg-linear-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    {parts.dayNumber} {parts.monthName}
                  </div>
                </div>

                <div className="h-16 w-[25%] bg-green-200 p-1 rounded-xl flex flex-col justify-center items-center text-[#85878C]">
                  {item.isFullDay ? (
                    "Fullday"
                  ) : (
                    <>
                      <CustomTimePicker
                        value={item.startTime}
                        onChange={(val) =>
                          setAlternateDates((prev) =>
                            prev.map((d) =>
                              d.id === item.id
                                ? {
                                    ...d,
                                    startTime: val,
                                  }
                                : d
                            )
                          )
                        }
                      />
                      <CustomTimePicker
                        value={item.endTime}
                        onChange={(val) =>
                          setAlternateDates((prev) =>
                            prev.map((d) =>
                              d.id === item.id
                                ? {
                                    ...d,
                                    endTime: val,
                                  }
                                : d
                            )
                          )
                        }
                      />
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    toggleAlternateHours(item.id)
                  }
                >
                  <img
                    src={
                      item.isFullDay
                        ? hoursgreen
                        : hoursgray
                    }
                    alt=""
                  />
                </button>

                <button
                  onClick={() =>
                    setAlternateDates((prev) =>
                      prev.map((d) =>
                        d.id === item.id
                          ? {
                              ...d,
                              open: !d.open,
                            }
                          : { ...d, open: false }
                      )
                    )
                  }
                >
                  <img src={imgcal} alt="" />
                </button>

                {item.open && (
                  <div className="absolute rounded-xl shadow top-20 right-10 z-50 bg-white">
                    <Calendar
                      date={item.date}
                      minDate={new Date()}
                      disabledDay={(date) =>
                        isDateDisabled(date, item.id)
                      }
                      onChange={(value) =>
                        setAlternateCalendar(
                          item.id,
                          value
                        )
                      }
                    />
                  </div>
                )}

                <button
                  onClick={() =>
                    removeAlternateDate(item.id)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-orange-600"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </Card>
            );
          })}

          {alternateDates.length < 3 && (
            <Card
              className="w-full h-26 flex items-center justify-center cursor-pointer"
              onClick={addAlternateDate}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
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
