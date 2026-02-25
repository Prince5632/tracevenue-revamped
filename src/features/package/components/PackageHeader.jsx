import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui";

function PackageHeader() {
    const navigate = useNavigate();

    return (
        <div className="lg:flex lg:justify-between">
            <div>
                <h1 className="mb-2 text-[18px] text-[#000000] font-bold md:text-[32px]">
                    Package Details
                </h1>
                <p className="text-[13px] text-[#666666] font-semibold">
                    Based on your location and event type, restaurants are offering a variety of packages with different cuisine combinations.
                </p>
            </div>
            <div className="lg:flex lg:justify-center lg:items-center">
                <Button
                    variant="outline"
                    className="
            min-w-[190px]
            px-[25px] py-[4px] mt-2
            text-[#Ff5722]
            bg-white
            border border-[#FF5722] rounded-[30px]
            hover:bg-[#ffffff]! hover:text-[#ff5722]!
            cursor-pointer
            text-[16px]! font-bold!
            lg:mt-0
          "
                    onClick={() => navigate("/")}
                >
                    Plan New Event
                    <i className="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
}

export default PackageHeader;
