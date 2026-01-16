import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../../styles/Module/CalenderModule.css";
import AlternateDateCard from "../../common/EventDate/AlternateDateCard";
import PreAlternateDateCard from "../../common/EventDate/PreAlternateDateCard";
import PrefferedDateCard from "../../common/EventDate/PrefferedDateCard";
import PrePrefferedDateCard from "../../common/EventDate/PrePrefferedDateCard";

const EventDate = () => {
  const [t1Time, setT1Time] = useState();
  const [t2Time, setT2Time] = useState("10:30");
  const [prefferedOpen1, setPrefferedOpen1] = useState(false);
  const [date1, setDate1] = useState();
  const [viewdate, setViewdate] = useState(new Date());
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
    setAlternateDates((prev) => {
      const updated = [...prev];
      updated[activeIndex].date = date;
      return updated;
    });
    setOpenCalender(false);
  };

  const handleDeleteAlternate = (index) => {
    setAlternateDates((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 justify-around gap-5 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/*Preffered Card 1*/}

        <div className="h-full w-full">
          <h1 className="font-semibold text-[18px] mb-5">Preffered Date</h1>
          {/* Card Component */}
          {prefferedOpen1 && (
            <div>
              <Calendar
                date={date1}
                onChange={handleSelect}
                className="absolute z-50 shadow-lg"
                color="#ff4000"
                shownDate={viewdate}
                onShownDateChange={setViewdate}
              />
            </div>
          )}
          {!date1 ? (
            <div
              onClick={(e) => {
                setPrefferedOpen1(true);
                e.stopPropagation();
                console.log("clicked");
              }}
            >
              <PrePrefferedDateCard />
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

        <div className=" w-full h-100 ">
          {openCalender && (
            <Calendar
              date={alternateDates[activeIndex]?.date || new Date()}
              disabledDates={[date1]}
              onChange={handleAlternateSelect}
              className="absolute z-50 shadow-lg"
              color="#ff4000"
              shownDate={viewdate}
              onShownDateChange={setViewdate}
            />
          )}

          <div className="w-full h-100">
            <h1 className="mb-5 font-semibold text-[18px]">
              Alternate Dates (optional)
            </h1>

            <div className="w-full flex flex-col gap-4 relative">
              {alternateDates.map((item, index) => (
                <AlternateDateCard
                  t1Time={t1Time}
                  setT1Time={setT1Time}
                  t2Time={t2Time}
                  setT2Time={setT2Time}
                  key={index}
                  date={item.date}
                  onOpen={() => {
                    setActiveIndex(index);
                    setOpenCalender(true);
                  }}
                  onDelete={() => handleDeleteAlternate(index)}
                />
              ))}

              {alternateDates.length < 3 && (
                <PreAlternateDateCard onAdd={handleAddAlternate} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDate;
