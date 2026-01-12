export const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
};
/**
 * Formats a date with proper error handling
 */
export const formatDateYear = (date) => {
    try {
        if (!date) return "Invalid Date";

        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) return "Invalid Date";

        return dateObj.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch (e) {
        console.error("Date formatting error:", e);
        return "Date Error";
    }
};
export const newFormatDate = (isoDateStr) => {
    const date = new Date(isoDateStr);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // "Aug"
    const year = date.getFullYear(); // 2025
    const weekDay = date.toLocaleString("en-US", { weekday: "long" });

    return {
        date: weekDay,
        year: `${day} ${month}`,
    };
};
// Convert time string (HH:MM) to input format
export const formatTimeForInput = (timeString) => {
    if (!timeString) return "";
    return timeString;
};
export const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
export function getLastSixHoursTimestamp() {
    const now = Date.now();
    const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
    const sixHoursAgoTimestamp = now - sixHoursInMilliseconds;
    return sixHoursAgoTimestamp;
}
export const formatDateValueToString = (value) => {
    if (!value) return "";

    // Format for displaying time from 24-hour format
    const formatTime = (timeString) => {
        if (!timeString) return "";

        // Handle "All Day" case
        if (timeString === "All Day") return "All Day";

        // Parse time range if it contains a hyphen
        if (timeString?.includes("-")) {
            const [startTime, endTime] = timeString
                ?.split("-")
                .map((t) => t.trim());
            return `${formatTime(startTime)} - ${formatTime(endTime)}`;
        }

        // Parse single time
        const [hours, minutes] = timeString?.split(":");
        if (!hours || !minutes) return timeString;

        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;

        return `${hour12}:${minutes} ${ampm}`;
    };

    // Format a full date with time information
    const formatDateWithTime = (dateStr, timeInfo) => {
        if (!dateStr) return "Invalid Date";

        // Parse the date
        const parsedDate = new Date(dateStr);
        if (isNaN(parsedDate.getTime())) return "Invalid Date";

        // Format the date part: Apr. 23, 2025
        const options = { month: "short", day: "numeric", year: "numeric" };
        const formattedDate = parsedDate.toLocaleDateString("en-US", options);

        // Add time information if available
        if (timeInfo === "All Day") {
            return `${formattedDate}, All Day`;
        } else if (timeInfo) {
            return `${formattedDate}, ${formatTime(timeInfo)}`;
        } else {
            return formattedDate;
        }
    };

    // Handle the specific eventDate format from the example
    if (Array.isArray(value)) {
        return value
            .map((dateObj) => {
                const dateEntry = Object.entries(dateObj)[0];
                if (dateEntry) {
                    const [date, timeInfo] = dateEntry;
                    return formatDateWithTime(date, timeInfo);
                }
                return "Invalid Format";
            })
            .join("\n");
    }

    // Handle single date string
    if (typeof value === "string") {
        return formatDateWithTime(value);
    }

    // Handle date object
    if (value instanceof Date) {
        return formatDateWithTime(value.toISOString().split("T")[0]);
    }

    // Return as string if none of the above match
    return String(value);
};
export const datePrettify = (date) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = dateObj.toLocaleString("en-GB", { month: "short" }); // e.g., "Jun"
    const year = dateObj.getFullYear();

    return `${day} ${month}, ${year}`; // e.g., "26 Jun, 2025"
};
export function getTimeAgoString(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    if (isNaN(seconds)) return "Invalid date";

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const value = Math.floor(seconds / secondsInUnit);
        if (value > 0) {
            return value === 1
                ? `${value} ${unit} ago`
                : `${value} ${unit}s ago`;
        }
    }

    return "Just now";
}
export function getFormattedStatusDate({ publishedAt, createdAt, status }) {
    const isDraft = status?.toLowerCase() === "draft";
    const dateToFormat = isDraft ? createdAt : publishedAt;

    if (!dateToFormat) return "";

    const date = new Date(dateToFormat);
    if (isNaN(date.getTime())) return "Invalid date";

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-IN", { month: "long" });
    const year = date.getFullYear();

    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, "0");
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12; // convert to 12-hour format
    const hourString = hour.toString().padStart(2, "0");

    const formatted = `${month} ${day}, ${year}, ${hourString}:${minute} ${period}`;

    return formatted;
}

export const timeSinceForNotification = (updatedAt) => {
    const now = new Date();
    const past = new Date(updatedAt);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000); // years
    if (interval >= 1)
        return interval + (interval === 1 ? " year ago" : " years ago");

    interval = Math.floor(seconds / 2592000); // months
    if (interval >= 1)
        return interval + (interval === 1 ? " month ago" : " months ago");

    interval = Math.floor(seconds / 86400); // days
    if (interval >= 1)
        return interval + (interval === 1 ? " day ago" : " days ago");

    interval = Math.floor(seconds / 3600); // hours
    if (interval >= 1) return interval + (interval === 1 ? "h ago" : "h ago");

    interval = Math.floor(seconds / 60); // minutes
    if (interval >= 1)
        return interval + (interval === 1 ? " min ago" : " min ago");

    return seconds <= 5 ? "just now" : seconds + "s ago";
};

export const beautifyDate = (inputDate) => {
    if (!inputDate) return "";

    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // "Oct"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

export const formatDateForEnquiry = (datesArray = []) => {
    const format = (isoDateStr) => {
        const date = new Date(isoDateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const weekDay = date.toLocaleString("en-US", { weekday: "long" });

        return {
            day: weekDay,
            date: `${day} ${month}`,
        };
    };

    return datesArray.map((item) => {
        const [key, value] = Object.entries(item)[0]; // e.g. "2025-10-31": "18:30 - 22:30"
        const formatted = format(key);

        // Split the time string into start and end
        const [startTime, endTime] = value.split(" - ").map((t) => t.trim());

        return {
            ...formatted,
            startTime,
            endTime,
        };
    });
};


