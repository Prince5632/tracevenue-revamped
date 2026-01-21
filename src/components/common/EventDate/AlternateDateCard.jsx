import Card from "../Card";
import imgcal from "../../../assets/dashboard/calendar.svg";
import hoursgreen from "../../../assets/new images/hours.png";
import hoursgray from "../../../assets/new images/hoursgray.svg";
import CustomTimePicker from "../CustomTimePicker";
import { useState } from "react";

function AlternateDateCard({
  date,
  onOpen,
  onDelete,
  t1Time,
  t2Time,
  setT1Time,
  setT2Time,
}) {
  const displayDate = date || new Date();

  const dayName = displayDate.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = displayDate.toLocaleDateString("en-US", { day: "2-digit" });
  const monthName = displayDate.toLocaleDateString("en-US", { month: "short" });

  const [fullday, setFullday] = useState("Time");
  const [hours, setHours] = useState(false);
  const [hoursimg, setHoursimg] = useState(hoursgray);
  const handleHours = () => {
    setHours((prev) => {
      const next = !prev;
      setHoursimg(next ? hoursgreen : hoursgray);
      setFullday(next ? "Fullday" : "Time");
      return next;
    });
  };

  return (
    <Card className="flex items-center justify-around gap-3">
      <div>
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
              <CustomTimePicker onChange={(e) => setT1Time(e)} value={t1Time} />
              <CustomTimePicker onChange={(e) => setT2Time(e)} value={t2Time} />
            </div>
          </div>
        )}
      </div>

      <button onClick={handleHours}>
        <img src={hoursimg} className="w-full" />
      </button>

      <button onClick={onOpen}>
        <img src={imgcal} className="w-full" />
      </button>

      <button onClick={onDelete} className="text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </Card>
  );
}

export default AlternateDateCard;
