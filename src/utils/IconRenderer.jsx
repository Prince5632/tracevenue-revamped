import { iconsMap } from "../constants/eventTypeIcons";
import { serviceIconMap } from "../constants/serviceTypeIcons";

export const IconRenderer = ({ className, size = 24, color = "rgba(255, 64, 0, 1)" }) => {
    const iconKey = className?.trim() || "anniversary-celebration-img-class";
    const Icon = iconsMap[iconKey];

    if (!Icon) return null;

    return typeof Icon === "string" ? (
        <img src={Icon} alt={iconKey} width={size} height={size} />
    ) : (
        <Icon width={size} height={size} fill={color} color={color} />
    );
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
