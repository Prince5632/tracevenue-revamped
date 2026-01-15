import React, { useState } from "react";
import Card from "../../common/Card";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AlternateDateCard from "../../common/AlternateDateCard";
import PreAlternateDateCard from "../../common/PreAlternateDateCard";
import PrefferedDateCard from "../../common/PrefferedDateCard";

const EventDate = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  console.log(open, date1);

  const handleSelect = (date) => {
    setDate1(date);
    console.log(date);
    setOpen1(false);
  };
  const handleSelect2 = (date) => {
    setDate2(date);
    console.log(date);
    setOpen2(false);
  };

  // Alternate Dates
  const size = 3;
  const alternateArray = new Array(size);

  return (
    <>
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 justify-around gap-5 "
        onClick={() => {
          setOpen1(false);
          setOpen2(false);
        }}
      >
        {/*Preffered Card 1*/}

        <div className="h-full w-full">
          <h1 className="font-semibold text-[18px] mb-5">Preffered Date</h1>
          {/* Card Component */}
          {open1 && (
            <Calendar
              date={date1}
              onChange={handleSelect}
              className="absolute z-50 shadow-lg"
            />
          )}
          {!date1 ? (
            <div
              onClick={(e) => {
                setOpen1(true);
                e.stopPropagation();
                console.log("clicked");
              }}
            >
              <PreAlternateDateCard />
            </div>
          ) : (
            <>
              <PrefferedDateCard
                date1={date1}
                open={open1}
                setOpen={setOpen1}
              />
            </>
          )}
        </div>

        <div className=" w-full h-100 ">
          {open2 && (
            <Calendar
              date={date2}
              onChange={handleSelect2}
              className="absolute z-50 shadow-lg"
            />
          )}
          <h1 className="mb-5 font-semibold text-[18px] text-[#070707]">
            Alternate Dates (optional)
          </h1>
          <div
            className="w-full flex flex-col gap-4"
            onClick={(e) => {
              setOpen2(true);
              e.stopPropagation();
              console.log("clicked");
            }}
          >
            <PreAlternateDateCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDate;
