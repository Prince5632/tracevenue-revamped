import React from "react";
import Card from "../Card";
function PrePrefferedDateCard() {
  return (
    <>
      <div>
        <Card
          variant="default"
          padding="lg"
          className="flex items-center justify-around gap-5 mt-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 30 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-orange-600 lucide lucide-plus-icon lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </Card>
      </div>
    </>
  );
}

export default PrePrefferedDateCard;
