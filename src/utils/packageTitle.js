// utils/packageTitle.js
// Title + description generator for cuisine combinations

/* ───────────── Pattern Libraries ───────────── */
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
    if (count === 1) return choose(patterns1, key).replace("{c1}", labels[0]);
    if (count === 2) return choose(patterns2, key).replace("{c1}", labels[0]).replace("{c2}", labels[1]);
    if (count === 3) return choose(patterns3, key).replace("{c1}", labels[0]).replace("{c2}", labels[1]).replace("{c3}", labels[2]);

    return choose(patternsMany, key)
        .replace("{c1}", labels[0])
        .replace("{c2}", labels[1])
        .replace("{n}", count)
        .replace("{n-2}", count - 2);
}

/* ───────────── Description Generator ───────────── */
export function generatePackageDescription(cuisineLabels = []) {
    const labels = cuisineLabels.map(toTitle);
    const count = labels.length;
    const key = labels.join("|");

    if (count === 0) return "Includes a mix of popular cuisines";
    if (count === 1) return choose(desc1, key).replace("{c1}", labels[0]);
    if (count === 2) return choose(desc2, key).replace("{c1}", labels[0]).replace("{c2}", labels[1]);
    if (count === 3) return choose(desc3, key).replace("{c1}", labels[0]).replace("{c2}", labels[1]).replace("{c3}", labels[2]);

    return choose(descMany, key)
        .replace("{c1}", labels[0])
        .replace("{c2}", labels[1])
        .replace("{n}", count)
        .replace("{n-2}", count - 2);
}

/* ───────────── Featuring text ───────────── */
export function generateFeaturedText(cuisineLabels = []) {
    const labels = cuisineLabels.map(toTitle);
    if (labels.length === 0) return "";
    if (labels.length <= 2) return `Featuring ${labels.join(" & ")}`;
    return `Featuring ${labels[0]} & ${labels[1]}`;
}
