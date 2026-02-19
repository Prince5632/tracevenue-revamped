import beverages from "@/assets/package images/packageServicesIcons/beverage.png";
import snacks from "@/assets/package images/packageServicesIcons/snacks.png";
import mainCourse from "@/assets/package images/packageServicesIcons/main_course.png";
import salad from "@/assets/package images/packageServicesIcons/salad.png";
import starters from "@/assets/package images/packageServicesIcons/starters.png";
import desserts from "@/assets/package images/packageServicesIcons/desserts.png";

const CATEGORY_ICON_MAP = {
    soups: beverages,
    soup: beverages,
    beverages: beverages,
    beverage: beverages,
    "starter/snacks": starters,
    starters: starters,
    snacks: snacks,
    "main course": mainCourse,
    "main-course": mainCourse,
    salad: salad,
    salads: salad,
    desserts: desserts,
    dessert: desserts,
};

/**
 * Renders the icon image for a given menu category name.
 * Falls back to the snacks icon if no match is found.
 *
 * @param {{ name: string, size?: number, className?: string }} props
 */
function CategoryIcon({ name = "", size = 16, className = "" }) {
    const key = name.toLowerCase().trim();
    const icon = CATEGORY_ICON_MAP[key] || snacks;

    return (
        <img
            src={icon}
            alt={name}
            className={className}
            style={{ width: size, height: size }}
        />
    );
}

export default CategoryIcon;
