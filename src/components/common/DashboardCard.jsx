import React from "react";
import Card from "./Card";
import Cardimg from "../../assets/Card.svg";

function DashboardCard({ icon, title, number }) {
  return (
    <>
      <Card
        variant="bordered"
        padding="sm"
        className="w-full flex flex-col gap-3"
        style={{
          backgroundImage: `url(${Cardimg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "contain",
        }}
      >
        <div>
          <img src={icon} alt="" />
        </div>
        <div className="flex ">
          <div className="w-[80%] text-[18px] flex items-center">{title}</div>
          <div className="w-[20%] text-right font-semibold text-3xl bg-linear-to-r from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">
            {number}
          </div>
        </div>
      </Card>
    </>
  );
}

export default DashboardCard;
