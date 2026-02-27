import PDFDocument from "@react-pdf/pdfkit";

// ─── Color palette ─────────────────────────────────────────────────────────────
const C = {
    primary: "#FF5722",
    primaryBg: "#FFF3E0",
    amber: "#e29f55",
    amberLight: "#F5DEB3",
    dark: "#1a1a1a",
    text: "#212529",
    textSec: "#555555",
    textTer: "#888888",
    textItem: "#444444",
    textLabel: "#333333",
    border: "#e5e7eb",
    borderLight: "#d1d5db",
    sectionBg: "#f8f9fa",
    white: "#ffffff",
    veg: "#15B076",
    nonVeg: "#EF4444",
    paneer: "#F59E0B",
    alcoholic: "#683eb8",
    freeText: "#065f46",
    freeBg: "#d1fae5",
    paidText: "#92400E",
    paidBg: "#FEF3C7",
};

const PW = 595.28;
const PH = 841.89;
const M = 36;
const TOP_MARGIN = M + 55;
const CW = PW - M * 2;
const BOTTOM_LIMIT = PH - 50;

// ─── Helpers ───────────────────────────────────────────────────────────────────
const fmtRupees = (val) =>
    `Rs. ${Number(Math.trunc(val || 0)).toLocaleString("en-IN")}`;

const fmtDate = (dateStr) => {
    if (!dateStr) return { date: "", year: "" };
    const d = new Date(dateStr);
    return {
        date: `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`,
        year: d.getFullYear().toString(),
    };
};

const fmtTime = (t) => {
    if (!t) return "";
    const p = t.split(":");
    if (p.length < 2) return t;
    const h = Number(p[0]);
    return `${h % 12 || 12}:${p[1].toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

const fetchImage = async (url) => {
    try {
        if (!url) return null;
        const r = await fetch(url);
        if (!r.ok) return null;
        return await (await r.blob()).arrayBuffer();
    } catch {
        return null;
    }
};

// ─── Page helpers ──────────────────────────────────────────────────────────────
const needsNewPage = (y, space) => y + space > BOTTOM_LIMIT;
const addNewPage = (doc) => {
    doc.addPage({ size: "A4", margin: { top: TOP_MARGIN, bottom: M, left: M, right: M } });
    return TOP_MARGIN;
};
const checkPage = (doc, y, space) => {
    if (y <= TOP_MARGIN + 10) return y;
    if (needsNewPage(y, space)) return addNewPage(doc);
    return y;
};
const safeText = (doc, text, x, y, opts = {}) =>
    doc.text(text || "", x, y, { lineBreak: false, ...opts });

// ─── Item veg/non-veg dot ──────────────────────────────────────────────────────
const drawItemIcon = (doc, x, y, type) => {
    const t = (type || "").toLowerCase();
    const isNonVeg =
        t.includes("non-veg") || t.includes("non vegetarian") || t.includes("non veg") || t.includes("egg");
    const color = isNonVeg ? C.nonVeg : C.veg;
    doc.roundedRect(x, y, 10, 10, 2).strokeColor(color).lineWidth(1).stroke();
    doc.circle(x + 5, y + 5, 2.5).fill(color);
};

// ─── Section: Title ────────────────────────────────────────────────────────────
const drawTitle = (doc, job, y) => {
    doc.roundedRect(M, y, 4, 22, 2).fill(C.primary);
    doc.font("Helvetica-Bold").fontSize(17).fillColor(C.dark);
    const title = job?.name || "Enquiry Details";
    safeText(doc, title, M + 12, y + 2, { width: CW - 16, lineBreak: true });
    y += doc.font("Helvetica-Bold").fontSize(17).heightOfString(title, { width: CW - 16 }) + 20;
    return y;
};

// ─── Section: Basic info ───────────────────────────────────────────────────────
const drawBasicInfo = (doc, job, y) => {
    y = checkPage(doc, y, 140);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    safeText(doc, "Basic Information", M, y);
    y += 18;

    const cardW = (CW - 10) / 2;
    const cardH = 50;
    const gap = 10;

    const budgetDisplay =
        job?.budgetType === "lumpSum"
            ? fmtRupees(job?.budget?.max)
            : `${fmtRupees(job?.perPersonBudget?.min || job?.budget?.min || 0)} – ${fmtRupees(job?.perPersonBudget?.max || job?.budget?.max || 0)}`;

    const eventLabel =
        job?.eventType?.eventName ||
        job?.eventType?.label ||
        (typeof job?.eventType === "string" ? job.eventType : "") ||
        "Not specified";

    const cards = [
        { label: "Service Type", value: job?.serviceType ? job.serviceType.charAt(0).toUpperCase() + job.serviceType.slice(1) : "Not specified" },
        { label: "Event Type", value: eventLabel },
        { label: "Budget", value: budgetDisplay, sub: job?.budgetType === "perPerson" ? "Per Person" : "Lump Sum" },
        { label: "Gathering Size", value: `${job?.peopleRange?.minPeople || 0} – ${job?.peopleRange?.maxPeople || 0}`, sub: "Guests" },
    ];

    for (let i = 0; i < cards.length; i += 2) {
        const c1 = cards[i], c2 = cards[i + 1];
        doc.roundedRect(M, y, cardW, cardH, 8).fill(C.sectionBg);
        doc.font("Helvetica").fontSize(7.5).fillColor(C.textTer);
        safeText(doc, c1.label, M + 10, y + 8);
        doc.font("Helvetica-Bold").fontSize(10.5).fillColor(C.dark);
        safeText(doc, c1.value, M + 10, y + 20, { width: cardW - 20 });
        if (c1.sub) {
            doc.font("Helvetica").fontSize(7).fillColor(C.textTer);
            safeText(doc, c1.sub, M + 10, y + 36);
        }
        if (c2) {
            doc.roundedRect(M + cardW + gap, y, cardW, cardH, 8).fill(C.sectionBg);
            doc.font("Helvetica").fontSize(7.5).fillColor(C.textTer);
            safeText(doc, c2.label, M + cardW + gap + 10, y + 8);
            doc.font("Helvetica-Bold").fontSize(10.5).fillColor(C.dark);
            safeText(doc, c2.value, M + cardW + gap + 10, y + 20, { width: cardW - 20 });
            if (c2.sub) {
                doc.font("Helvetica").fontSize(7).fillColor(C.textTer);
                safeText(doc, c2.sub, M + cardW + gap + 10, y + 36);
            }
        }
        y += cardH + gap;
    }
    return y + 5;
};

// ─── Section: Location ─────────────────────────────────────────────────────────
const drawLocation = (doc, job, y) => {
    const city = job?.selectedCities?.[0] || {};
    const locality = city.locality?.short_name || city.locality || city.name || "";
    const sublocality = city.subLocality?.short_name || city.subLocality || "";
    const locationStr = [sublocality, locality].filter(Boolean).join(", ") || "Selected Location";
    const radius = job?.serviceRadius || (job?.radius ? `${job.radius} km` : "");

    y = checkPage(doc, y, 70);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    safeText(doc, "Location Requirement", M, y);
    y += 18;

    const cardH = 45;
    doc.roundedRect(M, y, CW, cardH, 8).fill(C.sectionBg);
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.dark);
    safeText(doc, "Service Required Under", M + 12, y + 10);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(C.primary);
    safeText(doc, radius, M + 12, y + 24);
    const sepX = M + 120;
    doc.moveTo(sepX, y + 10).lineTo(sepX, y + 36).strokeColor(C.border).lineWidth(1).stroke();
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.dark);
    safeText(doc, "Selected Location", sepX + 12, y + 10);
    doc.font("Helvetica").fontSize(10).fillColor(C.textSec);
    doc.text(locationStr, sepX + 12, y + 24, { width: CW - (sepX - M) - 16, ellipsis: true });

    return y + cardH + 20;
};

// ─── Section: Date & Time ──────────────────────────────────────────────────────
/**
 * Normalize a date entry that may be in either of two shapes:
 *   OLD: { date: "2026-02-28", startTime: "18:30", endTime: "22:30", allDay: false }
 *   NEW: { "2026-02-28": "18:30 - 22:30" }  or  { "2026-02-28": "All Day" }
 */
const normalizeDateEntry = (item) => {
    if (!item) return null;
    // Old shape — has a .date string property
    if (typeof item.date === "string") return item;
    // New shape — single key is the date, value is the time range string
    const key = Object.keys(item)[0];
    if (!key) return null;
    const val = item[key] || "";
    const lv = val.toLowerCase();
    if (lv.includes("all") || lv.includes("full")) {
        return { date: key, allDay: true, startTime: "00:00", endTime: "23:59" };
    }
    const [start = "", end = ""] = val.split("-").map((s) => s.trim());
    return { date: key, allDay: false, startTime: start, endTime: end };
};

const drawDateTime = (doc, job, y) => {
    const rawPreferred = job?.eventDateOptions?.preferredDates || [];
    const rawAlternate = job?.eventDateOptions?.alternateDates || [];
    const dates = rawPreferred.map(normalizeDateEntry).filter(Boolean);
    const altDates = rawAlternate.map(normalizeDateEntry).filter(Boolean);

    if (!dates.length && !altDates.length) return y;

    y = checkPage(doc, y, 100);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    safeText(doc, "Preferred Date & Time", M, y);
    y += 18;

    const itemH = 50;
    dates.forEach((item, idx) => {
        y = checkPage(doc, y, itemH + 10);
        const di = fmtDate(item.date);
        doc.roundedRect(M, y, CW, itemH, 8).fill(C.sectionBg);
        doc.roundedRect(M + 10, y + 8, 45, 34, 6).fill(C.primaryBg);
        doc.font("Helvetica-Bold").fontSize(10).fillColor(C.primary);
        doc.text(di.date.split(" ")[0], M + 10, y + 14, { width: 45, align: "center" });
        doc.font("Helvetica").fontSize(8).fillColor(C.primary);
        doc.text(di.date.split(" ")[1], M + 10, y + 26, { width: 45, align: "center" });

        const tx = M + 70;
        doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.dark);
        safeText(doc, "Event Schedule", tx, y + 12);
        const timeStr = item.allDay ? "Full Day Event" : `${fmtTime(item.startTime)} – ${fmtTime(item.endTime)}`;
        doc.font("Helvetica-Bold").fontSize(11).fillColor(C.textSec);
        safeText(doc, timeStr, tx, y + 26);

        const bw = 60;
        doc.roundedRect(M + CW - bw - 10, y + 15, bw, 20, 10).fill(C.white);
        doc.font("Helvetica-Bold").fontSize(8).fillColor(C.primary);
        doc.text(`Option ${idx + 1}`, M + CW - bw - 10, y + 21, { width: bw, align: "center" });

        y += itemH + 8;
    });

    // Alternate dates
    if (altDates.length) {
        y = checkPage(doc, y, 30);
        y += 8;
        doc.font("Helvetica-Bold").fontSize(11).fillColor(C.textSec);
        safeText(doc, "Alternate Dates", M, y);
        y += 14;

        altDates.forEach((item, idx) => {
            y = checkPage(doc, y, itemH + 10);
            const di = fmtDate(item.date);
            doc.roundedRect(M, y, CW, itemH, 8).fill(C.sectionBg);
            doc.roundedRect(M + 10, y + 8, 45, 34, 6).fill(C.primaryBg);
            doc.font("Helvetica-Bold").fontSize(10).fillColor(C.primary);
            doc.text(di.date.split(" ")[0], M + 10, y + 14, { width: 45, align: "center" });
            doc.font("Helvetica").fontSize(8).fillColor(C.primary);
            doc.text(di.date.split(" ")[1], M + 10, y + 26, { width: 45, align: "center" });

            const tx = M + 70;
            doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.dark);
            safeText(doc, "Alternate Schedule", tx, y + 12);
            const timeStr = item.allDay ? "Full Day Event" : `${fmtTime(item.startTime)} – ${fmtTime(item.endTime)}`;
            doc.font("Helvetica-Bold").fontSize(11).fillColor(C.textSec);
            safeText(doc, timeStr, tx, y + 26);

            const bw = 60;
            doc.roundedRect(M + CW - bw - 10, y + 15, bw, 20, 10).fill(C.white);
            doc.font("Helvetica-Bold").fontSize(8).fillColor(C.textSec);
            doc.text(`Alt ${idx + 1}`, M + CW - bw - 10, y + 21, { width: bw, align: "center" });

            y += itemH + 8;
        });
    }

    return y + 10;
};

// ─── Section: Food Preferences ────────────────────────────────────────────────
const drawFoodPrefs = (doc, job, y) => {
    const dietary = job?.dietaryRequirements || [];
    const isVegOnly = dietary.includes("vegOnly");
    const isAlcoholic = dietary.includes("alcoholic");

    y = checkPage(doc, y, 100);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    safeText(doc, "Dietary & Beverage Preferences", M, y);
    y += 18;

    const cardW = (CW - 10) / 2;
    const cardH = 55;

    doc.roundedRect(M, y, cardW, cardH, 8).fill(C.sectionBg);
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.dark);
    safeText(doc, "Eating Preference", M + 12, y + 12);
    const eatColor = isVegOnly ? C.veg : C.nonVeg;
    doc.roundedRect(M + 12, y + 26, 14, 14, 2).lineWidth(1).strokeColor(eatColor).stroke();
    doc.circle(M + 19, y + 33, 3.5).fill(eatColor);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(C.textSec);
    safeText(doc, isVegOnly ? "Pure Vegetarian" : "Veg & Non-Veg", M + 32, y + 28);

    doc.roundedRect(M + cardW + 10, y, cardW, cardH, 8).fill(C.sectionBg);
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.dark);
    safeText(doc, "Beverage Preference", M + cardW + 22, y + 12);
    const bevColor = isAlcoholic ? C.alcoholic : C.veg;
    doc.circle(M + cardW + 22 + 7, y + 33, 4).fill(bevColor);
    doc.circle(M + cardW + 22 + 7, y + 33, 2).fill(C.white);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(C.textSec);
    safeText(doc, isAlcoholic ? "Serves Alcohol" : "No Alcohol", M + cardW + 42, y + 28);

    return y + cardH + 20;
};

// ─── Section: Menu Items ───────────────────────────────────────────────────────
const collectFoodCards = (mh) => {
    if (!mh?.length) return [];
    return mh
        .map((cat) => {
            const catName = cat.categoryName || cat.name || "Category";
            const sections = [];
            [...(cat.directOfferings || []), ...(cat.offerings || [])].forEach((off) => {
                const items = off.items || off.selectedItems || [];
                if (items.length) {
                    const typeName = (off.itemTypeName || "").trim();
                    sections.push({
                        typeName: typeName || "Items",
                        items: items.map((it) => ({ ...it, _resolvedType: typeName || "Items" })),
                        limit: off.selectionLimit?.min || off.selectionLimit || 0,
                    });
                }
            });
            (cat.subcategories || []).forEach((sub) => {
                const subName = sub.subcategoryName || sub.name || "";
                (sub.offerings || []).forEach((off) => {
                    const items = off.items || off.selectedItems || [];
                    if (items.length) {
                        const typeName = (off.itemTypeName || "").trim();
                        sections.push({
                            typeName: subName || typeName || "Items",
                            items: items.map((it) => ({ ...it, _resolvedType: typeName || subName })),
                            limit: off.selectionLimit?.min || off.selectionLimit || 0,
                        });
                    }
                });
            });
            return sections.length ? { title: catName, sections } : null;
        })
        .filter(Boolean);
};

const drawFoodCard = (doc, x, y, w, card, draw) => {
    let h = 30;
    card.sections.forEach((sec) => {
        h += 22;
        h += Math.ceil(sec.items.length / 2) * 16;
    });
    if (!draw) return h + 20;

    doc.roundedRect(x, y, w, h + 15, 12).fillAndStroke(C.white, "#999999");
    let cy = y + 14;
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    const th = doc.heightOfString(card.title, { width: w - 24 });
    doc.text(card.title, x + 12, cy, { width: w - 24, align: "left" });
    doc.moveTo(x + 12, cy + th + 2).lineTo(x + 52, cy + th + 2).strokeColor(C.primary).lineWidth(1.5).stroke();
    cy += th + 12;

    const colW = (w - 40) / 2;
    card.sections.forEach((sec) => {
        doc.font("Helvetica-Bold").fontSize(9.5).fillColor(C.dark);
        safeText(doc, sec.typeName || "Items", x + 14, cy + 4);
        const limit = sec.limit || 0;
        const isAll = limit >= sec.items.length || limit === 0;
        const badgeText = isAll ? "All Included" : `Any ${limit}`;
        const bBg = isAll ? C.freeBg : C.paidBg;
        const bTxt = isAll ? C.freeText : C.paidText;
        const tw = doc.font("Helvetica-Bold").fontSize(9.5).widthOfString(sec.typeName || "Items");
        const bw = doc.font("Helvetica-Bold").fontSize(7).widthOfString(badgeText) + 12;
        doc.roundedRect(x + 14 + tw + 10, cy + 2, bw, 13, 4).fill(bBg);
        doc.font("Helvetica-Bold").fontSize(7).fillColor(bTxt);
        doc.text(badgeText, x + 14 + tw + 10, cy + 5.5, { width: bw, align: "center" });
        cy += 20;

        for (let i = 0; i < sec.items.length; i += 2) {
            const i1 = sec.items[i], i2 = sec.items[i + 1];
            drawItemIcon(doc, x + 18, cy, i1._resolvedType);
            doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
            doc.text(i1.name || "Item", x + 34, cy + 1, { width: colW - 20, ellipsis: true });
            if (i2) {
                drawItemIcon(doc, x + 18 + colW + 10, cy, i2._resolvedType);
                doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
                doc.text(i2.name || "Item", x + 34 + colW + 10, cy + 1, { width: colW - 20, ellipsis: true });
            }
            cy += 16;
        }
    });
    return h + 15;
};

const drawFoodItems = (doc, menuSections, y) => {
    const cards = collectFoodCards(menuSections);
    if (!cards.length) return y;
    y = checkPage(doc, y, 60);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    safeText(doc, "Selected Menu Items", M, y);
    y += 24;

    cards.forEach((card) => {
        const cardH = drawFoodCard(doc, 0, 0, CW, card, false);
        if (needsNewPage(y, cardH + 10)) y = addNewPage(doc);
        drawFoodCard(doc, M, y, CW, card, true);
        y += cardH + 12;
    });
    return y;
};

// ─── Section: Services ─────────────────────────────────────────────────────────
const getServiceSubtext = (svc) => {
    if (!Array.isArray(svc?.options)) return svc?.serviceCategory || "";
    const option = svc.options?.find((o) => String(o._id) === String(svc.variantOptionId));
    if (!option) return svc?.serviceCategory || "";
    const type = (option.types || []).find((t) => String(t._id) === String(svc.variantTypeId));
    const optionName = option.name || "";
    const typeValue = type?.value || "";
    return optionName && typeValue ? `${optionName}: ${typeValue}` : optionName || typeValue || svc?.serviceCategory || "";
};

const drawServiceCard = (doc, svc, x, y, w, h) => {
    doc.roundedRect(x, y, w, h, 8).fillAndStroke(C.white, C.border);
    const iconBox = 34;
    doc.roundedRect(x + 10, y + (h - iconBox) / 2, iconBox, iconBox, 6).fill(C.sectionBg);
    doc.circle(x + 10 + iconBox / 2, y + h / 2, 8).fill(C.amberLight);
    doc.circle(x + 10 + iconBox / 2, y + h / 2, 5).fill(C.amber);
    const tx = x + 10 + iconBox + 10;
    const cw = w - (10 + iconBox + 10) - 10;
    doc.font("Helvetica-Bold").fontSize(10).fillColor(C.dark);
    safeText(doc, svc.serviceName || "Service", tx, y + 14, { width: cw });
    doc.font("Helvetica").fontSize(8.5).fillColor(C.textSec);
    safeText(doc, getServiceSubtext(svc) || "Selected Service", tx, y + 28, { width: cw });

    const isFree = !svc.Price || svc.Price === 0 || String(svc.Price).toLowerCase() === "free";
    const badge = isFree ? "FREE" : `Rs. ${svc.Price}`;
    const bw = doc.font("Helvetica-Bold").fontSize(8).widthOfString(badge) + 16;
    const bx = x + w - bw - 10;
    doc.roundedRect(bx, y + h - 22, bw, 14, 4).fill(isFree ? C.freeBg : C.paidBg);
    doc.font("Helvetica-Bold").fontSize(8).fillColor(isFree ? C.freeText : C.paidText);
    doc.text(badge, bx, y + h - 18, { width: bw, align: "center" });
};

const drawServices = (doc, services, y) => {
    if (!services?.length) return y;
    y = checkPage(doc, y, 60);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.dark);
    safeText(doc, "Amenities & Services", M, y);
    y += 18;

    const grp = {};
    services.forEach((s) => {
        const c = s.serviceCategory || "Other";
        if (!grp[c]) grp[c] = [];
        grp[c].push(s);
    });

    const colGap = 12, cardW = (CW - colGap) / 2, cardH = 55;
    Object.entries(grp).forEach(([cat, svcs]) => {
        y = checkPage(doc, y, 80);
        doc.font("Helvetica-Bold").fontSize(12).fillColor(C.dark);
        safeText(doc, cat, M, y);
        y += 18;
        for (let i = 0; i < svcs.length; i += 2) {
            y = checkPage(doc, y, cardH + 12);
            drawServiceCard(doc, svcs[i], M, y, cardW, cardH);
            if (svcs[i + 1]) drawServiceCard(doc, svcs[i + 1], M + cardW + colGap, y, cardW, cardH);
            y += cardH + 10;
        }
        y += 10;
    });
    return y;
};

// ─── Header / Footer ───────────────────────────────────────────────────────────
const drawHeader = (doc, tvLogoBuffer, userName) => {
    doc.page.margins = { top: 0 };
    doc.save();
    const headerText = `${userName || "Customer"}'s Enquiry Summary`;
    doc.font("Helvetica-Bold").fontSize(16).fillColor(C.dark);
    doc.text(headerText, M, 20, { width: CW - 120 });
    if (tvLogoBuffer) {
        try { doc.image(tvLogoBuffer, PW - M - 100, 15, { width: 100 }); } catch { /* ignore */ }
    }
    doc.restore();
};

const drawFooter = (doc, pageNum) => {
    doc.page.margins = { bottom: 0 };
    doc.save();
    doc.moveTo(M, PH - 40).lineTo(PW - M, PH - 40).lineWidth(0.5).strokeColor(C.border).stroke();
    doc.font("Helvetica").fontSize(8).fillColor(C.textTer);
    doc.text(`Page ${pageNum}`, 0, PH - 30, { width: PW, align: "center" });
    doc.restore();
};

// ─── Main export ───────────────────────────────────────────────────────────────
export const handleEnquiryDownloadPDF = async ({ job, logoUrl, userName }) => {
    const tvLogoBuffer = await fetchImage(logoUrl);

    const doc = new PDFDocument({
        margin: { top: TOP_MARGIN, bottom: M, left: M, right: M },
        compress: true,
        autoFirstPage: false,
        bufferPages: true,
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
        const blob = new Blob(chunks, { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${(job?.name || "Enquiry").replace(/[^a-zA-Z0-9]/g, "_")}_Details.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    });

    doc.addPage({ size: "A4", margin: { top: TOP_MARGIN, bottom: M, left: M, right: M } });
    let y = TOP_MARGIN;

    y = drawTitle(doc, job, y);
    y = drawBasicInfo(doc, job, y);
    y = drawLocation(doc, job, y);
    y = drawDateTime(doc, job, y);
    y = drawFoodPrefs(doc, job, y);
    y = drawFoodItems(doc, job?.menuSections, y);
    y = drawServices(doc, job?.services, y);

    const total = doc.bufferedPageRange().count;
    for (let i = 0; i < total; i++) {
        doc.switchToPage(i);
        drawHeader(doc, tvLogoBuffer, userName);
        drawFooter(doc, i + 1);
    }

    doc.end();
};
