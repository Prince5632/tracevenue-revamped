import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../../styles/Module/CalenderModule.css";
import AlternateDateCard from "../../common/EventDate/AlternateDateCard";
import PreAlternateDateCard from "../../common/EventDate/PreAlternateDateCard";
import PrefferedDateCard from "../../common/EventDate/PrefferedDateCard";

const EventDate = () => {
  const [t1Time, setT1Time] = useState();
  const [t2Time, setT2Time] = useState("10:30");
  const [prefferedOpen1, setPrefferedOpen1] = useState(false);
  const [date1, setDate1] = useState();
  const [viewdate, setViewdate] = useState();
  const [alternateDates, setAlternateDates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);

  const handleSelect = (date) => {
    setDate1(date);
    setPrefferedOpen1(false);
  };

  const handleAddAlternate = () => {
    if (alternateDates.length >= 3) return;
    setAlternateDates((prev) => [...prev, { date: null }]);
    setActiveIndex(alternateDates.length);
    setOpenCalender(true);
  };

  const handleAlternateSelect = (date) => {
    if (activeIndex === null) return;

    const newData = alternateDates.map((item, index) =>
      index === activeIndex ? { ...item, date } : item,
    );

    setAlternateDates(newData);
    setOpenCalender(false);
    setActiveIndex(null);
  };

  const handleDeleteAlternate = (index) => {
    setAlternateDates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOutsideClick = () => {
    setOpenCalender(false);
    setPrefferedOpen1(false);
    setAlternateDates((prev) => prev.filter((item) => item.date !== null));
  };

  const getDisabledDates = () => {
    const disabled = [];
    if (date1) disabled.push(date1);
    alternateDates.forEach((item, index) => {
      if (item.date && index !== activeIndex) {
        disabled.push(item.date);
      }
    });

    return disabled;
  };
  return (
    <>
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 justify-around gap-5 "
        onClick={handleOutsideClick}
      >
        {/*Preffered Card 1*/}

        <div className="h-full w-full">
          <h1 className="font-semibold text-[18px] mb-5">Preffered Date</h1>
          {/* Card Component */}
          {prefferedOpen1 && (
            <div onClick={(e) => e.stopPropagation()}>
              <Calendar
                date={date1}
                onChange={handleSelect}
                className="absolute z-50 shadow-lg"
                color="#ff4000"
                shownDate={viewdate}
                onShownDateChange={setViewdate}
                minDate={new Date()}
              />
            </div>
          )}
          {!date1 ? (
            <div
              onClick={(e) => {
                setPrefferedOpen1(true);
                e.stopPropagation();
              }}
            >
              <PreAlternateDateCard />
            </div>
          ) : (
            <>
              <PrefferedDateCard
                date1={date1}
                open={prefferedOpen1}
                setOpen={setPrefferedOpen1}
                t1Time={t1Time}
                setT1Time={setT1Time}
                t2Time={t2Time}
                setT2Time={setT2Time}
              />
            </>
          )}
        </div>

        <div className="w-full h-100 relative">
          {openCalender && (
            <div
              className="absolute z-50 left-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                date={alternateDates[activeIndex]?.date || new Date()}
                disabledDates={getDisabledDates()}
                onChange={handleAlternateSelect}
                className="shadow-lg border rounded-md"
                color="#ff4000"
                shownDate={viewdate}
                onShownDateChange={setViewdate}
                minDate={new Date()}
              />
            </div>
          )}

          <div className="w-full h-100">
            <h1 className="mb-5 font-semibold text-[18px]">
              Alternate Dates (optional)
            </h1>

            <div className="w-full flex flex-col gap-4">
              {alternateDates.map((item, index) => (
                <div key={index}>
                  {!item.date ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(index);
                        setOpenCalender(true);
                      }}
                    >
                      <PreAlternateDateCard />
                    </div>
                  ) : (
                    <AlternateDateCard
                      date={item.date}
                      onOpen={(e) => {
                        e.stopPropagation();
                        setActiveIndex(index);
                        setOpenCalender(true);
                      }}
                      onDelete={() => handleDeleteAlternate(index)}
                      t1Time={t1Time}
                      t2Time={t2Time}
                      setT1Time={setT1Time}
                      setT2Time={setT2Time}
                      disabledDates={getDisabledDates()}
                    />
                  )}
                </div>
              ))}

              {alternateDates.length < 3 &&
                alternateDates.every((d) => d.date !== null) && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddAlternate();
                    }}
                  >
                    <PreAlternateDateCard />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDate;
