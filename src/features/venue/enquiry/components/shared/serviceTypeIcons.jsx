
import venueImage from "@assets/images/venue.png";
import cateringImage from "@assets/images/catering.png";
import Dashboard from "@assets/dashboard/mage_dashboard.svg";
import Document from "@assets/dashboard/carbon_document-signed.svg";
import Setting from "@assets/dashboard/setting.svg";
import Switch from "@assets/dashboard/switch.svg";
import List from "@assets/dashboard/tabler_list-details.svg";
import User from "@assets/dashboard/user-profile.svg";
import DownArrow from "@assets/dashboard/Frame.svg";
import Clock from "@assets/dashboard/clock.svg";
import ThreeLineList from "@assets/dashboard/three-line-list.svg";
import GreenCheck from "@assets/dashboard/check-green.svg";
import Location from "@assets/dashboard/location.svg";
import Calendar from "@assets/dashboard/calendar.svg";
import Compare from "@assets/dashboard/compare.svg";
import EventPlan from "@assets/dashboard/event-plan.svg";
import Filter from "@assets/dashboard/filter.svg";


export const serviceIconMap = {
    "Venue": venueImage, "Catering": cateringImage, "Dashboard": Dashboard, "Document": Document,
    "Setting": Setting, "Switch": Switch, "List": List, "User": User, "DownArrow": DownArrow,
    "GreenCheck": GreenCheck, "Clock": Clock, "Three-Line-List": ThreeLineList, "Location": Location, "Calendar": Calendar, "Compare": Compare, "EventPlan": EventPlan,
    "Filter": Filter
};


export const ServiceIconRenderer = ({ type, size = 100, color = "rgba(255, 64, 0, 1)" }) => {
    const iconKey = type?.trim() || "Calendar";
    const Icon = serviceIconMap[type] || null;

    if (!Icon) return null;

    return typeof Icon === "string" ? (
        <img src={Icon} alt={iconKey} width={size} height={size} />
    ) : (
        <Icon width={size} height={size} fill={color} color={color} />
    );
};