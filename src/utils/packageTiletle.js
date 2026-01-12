// utils/packageTitle.js
// ---------------------------------------------------------------------
//  Title + short description generator for cuisine combinations
//  - Indian user-friendly
//  - Event-neutral
//  - Handles 1 to many cuisines
// ---------------------------------------------------------------------

/* ───────────── Pattern Libraries ───────────── */
// Titles
const patterns1 = [
    "{c1} Speciality Feast for Your Guests",
    "Authentic {c1} Set-Menu Experience",
    "{c1} Signature Celebration Spread",
];

const patterns2 = [
    "{c1} & {c2} Fusion Buffet for All Ages",
    "{c1} and {c2} Combo Feast (Unlimited Servings)",
    "Best of {c1} with a Touch of {c2} Menu",
];

const patterns3 = [
    "{c1}, {c2} & {c3} Multi-Cuisine Celebration Menu",
    "Tri-Cuisine Spread: {c1}, {c2} and {c3}",
    "Grand {c1}–{c2}–{c3} Wedding Buffet",
];

const patternsMany = [
    "Grand {n}-Cuisine Gala (incl. {c1}, {c2} & More)",
    "All-in-One Feast: {c1}, {c2} + {n-2} Other Cuisines",
    "Mega {n}-Cuisine Celebration Spread Featuring {c1} & {c2}",
];

// Descriptions
const desc1 = [
    "Includes popular {c1} dishes",
    "Tastes of {c1} cuisine with handpicked items",
    "Single cuisine focused meal with {c1} flavours",
];

const desc2 = [
    "Fusion of {c1} and {c2} dishes",
    "Menu combining {c1} & {c2} favourites",
    "Flavours of both {c1} and {c2}",
];

const desc3 = [
    "Blend of {c1}, {c2} and {c3} dishes",
    "Cuisines from {c1}, {c2}, and {c3}",
    "Tasting mix of {c1}, {c2}, {c3}",
];

const descMany = [
    "Includes {c1}, {c2} and {n-2} more cuisines",
    "Flavours from {n} cuisines incl. {c1} & {c2}",
    "Diverse multi-cuisine meal with {c1}, {c2}, and more",
];

/* ───────────── Helpers ───────────── */
const toTitle = (s = "") =>
    s
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

const hash = (str = "") => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
};

const choose = (arr, key) => arr[hash(key) % arr.length];

/* ───────────── Main Title Generator ───────────── */
export function generatePackageTitle(cuisineLabels = []) {
    const labels = cuisineLabels.map(toTitle);
    const count = labels.length;
    const key = labels.join("|");

    if (count === 0) return "Custom Food Package";

    if (count === 1) {
        const pat = choose(patterns1, key);
        return pat.replace("{c1}", labels[0]);
    }

    if (count === 2) {
        const pat = choose(patterns2, key);
        return pat.replace("{c1}", labels[0]).replace("{c2}", labels[1]);
    }

    if (count === 3) {
        const pat = choose(patterns3, key);
        return pat
            .replace("{c1}", labels[0])
            .replace("{c2}", labels[1])
            .replace("{c3}", labels[2]);
    }

    const pat = choose(patternsMany, key);
    return pat
        .replace("{c1}", labels[0])
        .replace("{c2}", labels[1])
        .replace("{n}", count)
        .replace("{n-2}", count - 2);
}

/* ───────────── New Description Generator ───────────── */
export function generatePackageDescription(cuisineLabels = []) {
    const labels = cuisineLabels.map(toTitle);
    const count = labels.length;
    const key = labels.join("|");

    if (count === 0) return "Includes a mix of popular cuisines";

    if (count === 1) {
        const pat = choose(desc1, key);
        return pat.replace("{c1}", labels[0]);
    }

    if (count === 2) {
        const pat = choose(desc2, key);
        return pat.replace("{c1}", labels[0]).replace("{c2}", labels[1]);
    }

    if (count === 3) {
        const pat = choose(desc3, key);
        return pat
            .replace("{c1}", labels[0])
            .replace("{c2}", labels[1])
            .replace("{c3}", labels[2]);
    }

    const pat = choose(descMany, key);
    return pat
        .replace("{c1}", labels[0])
        .replace("{c2}", labels[1])
        .replace("{n}", count)
        .replace("{n-2}", count - 2);
}

// package brief:
// utils/packageTiletle.js

// utils/packageTiletle.js

export const generatePackageBrief = (packageData) => {
    if (!packageData || !packageData.clubbedData) return "";

    const data = packageData.clubbedData;
    const cuisines = data.cuisine_combination
        ?.map((c) => c.value?.name)
        .join(", ");
    const totalCuisines = data.cuisine_stats?.total_cuisine_count ?? 0;
    const priceRange = data.price_range;
    const minPrice = priceRange?.min_price;
    const maxPrice = priceRange?.max_price;
    const avgPrice = priceRange?.average_price;
    const freeServices =
        Array.from(
            new Set(
                data.service_stats?.free_service_names?.map(
                    (s) => Object.keys(s)[0]
                )
            )
        ).join(", ") || "essential services";

    const categories =
        data.menu_stats?.category_names?.join(", ") || "varied menu options";
    const totalMenuItems = data.menu_stats?.total_menu_items ?? 0;
    const variantName =
        data.matching_variants?.[0]?.variant_name || "Special Package";

    return `
The ${variantName} brings together ${totalCuisines} popular cuisines like ${cuisines}, offering a balanced mix of taste and presentation. 
With around ${totalMenuItems} curated dishes across categories such as ${categories}, it suits both casual and premium events alike.

Guests can enjoy complimentary services like ${freeServices}, ensuring comfort and convenience throughout the event. 
Priced ${
        minPrice === maxPrice
            ? `at ₹${minPrice}`
            : `between ₹${minPrice} and ₹${maxPrice}`
    }, this package maintains excellent value while delivering a satisfying experience.

Perfect for any celebration — the ${variantName} offers flexibility, flavor, and thoughtful service all in one package.
`.trim();
};

export const generatePackageBriefForVariant = (packageData) => {
    if (!packageData) return "";

    const variantName = packageData.name || "Special Package";

    // Cuisine data
    const cuisines = packageData.allCuisines?.join(", ") || "varied cuisines";
    const totalCuisines = packageData.allCuisines?.length ?? 0;

    // Menu data
    const categories =
        packageData.menuData?.map((cat) => cat.name).join(", ") ||
        "varied menu options";
    const totalMenuItems =
        packageData.menuData?.reduce((sum, cat) => sum + (cat.total || 0), 0) ??
        0;

    // Service data
    const freeServices =
        packageData.freeServices?.length > 0
            ? Array.from(
                  new Set(packageData.freeServices.map((s) => s.serviceName))
              ).join(", ")
            : "essential services";

    const paidServices =
        packageData.paidServices?.length > 0
            ? Array.from(
                  new Set(packageData.paidServices.map((s) => s.serviceName))
              ).join(", ")
            : null;

    const allServices = paidServices
        ? `${freeServices} and premium add-ons like ${paidServices}`
        : freeServices;

    // Price range (in this case single price)
    const minPrice = packageData.cost;
    const maxPrice = packageData.cost;

    return `
The ${variantName} brings together ${totalCuisines} popular cuisines like ${cuisines}, offering a balanced mix of taste and presentation. 
With around ${totalMenuItems} curated dishes across categories such as ${categories}, it suits both casual and premium events alike.

Guests can enjoy complimentary services like ${allServices}, ensuring comfort and convenience throughout the event. 
Priced ${
        minPrice === maxPrice
            ? `at ₹${minPrice?.toLocaleString("en-IN")}`
            : `between ₹${minPrice?.toLocaleString(
                  "en-IN"
              )} and ₹${maxPrice?.toLocaleString("en-IN")}`
    }, this package maintains excellent value while delivering a satisfying experience.

Perfect for any celebration — the ${variantName} offers flexibility, flavor, and thoughtful service all in one package.
`.trim();
};

/* Optional exports for testing or extension */
export {
    patterns1,
    patterns2,
    patterns3,
    patternsMany,
    desc1,
    desc2,
    desc3,
    descMany,
};
