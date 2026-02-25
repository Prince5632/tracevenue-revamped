import React, { forwardRef } from "react";
import * as lucide from "lucide-react";
import { calculateCategorySelectionLimits } from "@/utils/categoryServiceLimit";

/**
 * EnquiryPdfTemplate - Polished PDF preview matching Figma design
 * Fixed: page breaks, duplicate labels, missing counts
 */
const EnquiryPdfTemplate = forwardRef(({ job, formatRupees }, ref) => {
    if (!job) return null;

    // ═══════════════════════════════════════════════════════════════
    // Design Tokens
    // ═══════════════════════════════════════════════════════════════
    const colors = {
        primary: "#ea580c",
        primaryBg: "#fff7ed",
        primaryBorder: "#fed7aa",
        dark: "#1f2937",
        gray: "#6b7280",
        lightGray: "#9ca3af",
        border: "#e5e7eb",
        lightBorder: "#f3f4f6",
        veg: "#22c55e",
        nonVeg: "#ef4444",
        paneer: "#9ca3af",
        egg: "#f59e0b",
    };

    // ═══════════════════════════════════════════════════════════════
    // Data Extraction
    // ═══════════════════════════════════════════════════════════════
    const formatCurrency = formatRupees || ((val) => `₹${Number(val || 0).toLocaleString("en-IN")}`);

    const {
        name = "Untitled Enquiry",
        serviceType = "",
        eventType,
        peopleRange = {},
        budget = {},
        perPersonBudget = {},
        budgetType = "lumpSum",
        selectedCities = [],
        location,
        eventDateOptions = {},
        dietaryRequirements = [],
        menuSections = [],
        services = [],
        specialRequirements = "",
        serviceRadius = "",
    } = job;

    const eventTypeName = eventType?.eventName || eventType?.label || (typeof eventType === "string" ? eventType : "Event");
    const primaryLocation = selectedCities?.[0] || location || {};

    // Build complete location string similar to BasicDetails component
    const getCompleteLocation = () => {
        const subLocalityName = primaryLocation?.subLocality?.short_name || primaryLocation?.subLocality;
        const localityName = primaryLocation?.locality?.short_name || primaryLocation?.locality;

        if (subLocalityName && localityName) {
            return `${subLocalityName}, ${localityName}`;
        }
        if (subLocalityName) {
            return subLocalityName;
        }
        if (localityName) {
            return localityName;
        }
        return primaryLocation?.name || "Not specified";
    };
    const locationName = getCompleteLocation();
    const isVegOnly = dietaryRequirements?.includes("vegOnly");
    const isAlcoholic = dietaryRequirements?.includes("alcoholic");

    const formatTime = (t) => {
        if (!t || t === "All Day") return t || "";
        const parts = t.split(":");
        if (parts.length < 2) return t;
        const hour = parseInt(parts[0], 10);
        return `${hour % 12 || 12}:${parts[1]} ${hour >= 12 ? "PM" : "AM"}`;
    };

    const getDateInfo = () => {
        const prefDates = eventDateOptions?.preferredDates;
        if (!prefDates?.length) return null;
        const dateObj = prefDates[0];
        let d, startTime, endTime;

        if (dateObj?.date) {
            d = new Date(dateObj.date);
            startTime = dateObj.allDay ? "All Day" : formatTime(dateObj.startTime);
            endTime = dateObj.allDay ? "" : formatTime(dateObj.endTime);
        } else {
            const entries = Object.entries(dateObj || {});
            if (!entries.length) return null;
            const [dateStr, timeInfo] = entries[0];
            d = new Date(dateStr);
            startTime = timeInfo === "All Day" ? "All Day" : formatTime(timeInfo?.split?.("-")?.[0]);
            endTime = timeInfo === "All Day" ? "" : formatTime(timeInfo?.split?.("-")?.[1]);
        }

        return {
            day: d.getDate(),
            month: d.toLocaleDateString("en-US", { month: "short" }),
            weekday: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
            startTime,
            endTime,
            fullDate: `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })}`,
        };
    };

    const dateInfo = getDateInfo();
    const budgetDisplay = budgetType === "lumpSum"
        ? formatCurrency(budget?.max || 0)
        : `${formatCurrency(perPersonBudget?.min || budget?.min || 0)} - ${formatCurrency(perPersonBudget?.max || budget?.max || 0)}`;

    // Helper to get selection limit value from offering
    const getSelectionLimit = (selectionLimit) => {
        if (!selectionLimit && selectionLimit !== 0) return 0; // Return 0 if undefined/null
        if (typeof selectionLimit === 'number') return selectionLimit;
        if (selectionLimit?.min !== undefined) return selectionLimit.min;
        return 0;
    };

    // Extract menu items with proper subcategory naming (avoid duplicates like "COLD (COLD)")
    // Now tracks selection limits (how many user can choose) instead of total items
    const extractMenuData = (sections) => {
        const categories = {};
        if (!sections?.length) return categories;

        sections.forEach((cat) => {
            if (cat?.disabled) return;
            const catName = cat?.categoryName || cat?.name || "Other";

            // Use the same utility function as sidebar for consistent counts
            const categoryLimits = calculateCategorySelectionLimits(cat);

            if (!categories[catName]) {
                categories[catName] = {
                    subcategories: {},
                    totalSelectionLimit: categoryLimits.min,
                    totalItems: 0
                };
            }

            // Helper to create proper subcategory label
            const getSubcatLabel = (subName, itemType) => {
                const cleanSubName = (subName || "").trim().toUpperCase();
                const cleanItemType = (itemType || "").trim().toUpperCase();

                // Avoid redundancy like "COLD (COLD)" or "VEGETARIAN (VEGETARIAN)"
                if (cleanSubName === cleanItemType || !cleanSubName || cleanSubName === "ITEMS") {
                    return cleanItemType || "ITEMS";
                }
                if (!cleanItemType || cleanItemType === "VEGETARIAN" && cleanSubName.includes("VEG")) {
                    return cleanSubName;
                }
                return `${cleanSubName} (${cleanItemType})`;
            };

            // Handle offerings
            [...(cat?.offerings || []), ...(cat?.directOfferings || [])].forEach((off) => {
                const subCatName = off?.subcategoryName || "";
                const itemType = off?.itemTypeName || "Vegetarian";
                const label = getSubcatLabel(subCatName, itemType);
                const selectionLimit = getSelectionLimit(off?.selectionLimit);

                if (!categories[catName].subcategories[label]) {
                    categories[catName].subcategories[label] = { itemType, items: [], selectionLimit: selectionLimit };
                } else {
                    // If label already exists, update the selectionLimit (in case of same itemType from different offerings)
                    categories[catName].subcategories[label].selectionLimit = selectionLimit;
                }

                const items = off?.items || off?.selectedItems || [];
                items.forEach((item) => {
                    if (item?.name) {
                        categories[catName].subcategories[label].items.push({ name: item.name, type: itemType });
                        categories[catName].totalItems++;
                    }
                });
            });

            // Handle subcategories
            (cat?.subcategories || []).forEach((sub) => {
                const subName = sub?.subcategoryName || sub?.name || "";
                (sub?.offerings || []).forEach((off) => {
                    const itemType = off?.itemTypeName || "Vegetarian";
                    const label = getSubcatLabel(subName, itemType);
                    const selectionLimit = getSelectionLimit(off?.selectionLimit);

                    if (!categories[catName].subcategories[label]) {
                        categories[catName].subcategories[label] = { itemType, items: [], selectionLimit: selectionLimit };
                    } else {
                        categories[catName].subcategories[label].selectionLimit = selectionLimit;
                    }

                    const items = off?.items || off?.selectedItems || [];
                    items.forEach((item) => {
                        if (item?.name) {
                            categories[catName].subcategories[label].items.push({ name: item.name, type: itemType });
                            categories[catName].totalItems++;
                        }
                    });
                });
            });
        });

        // Remove empty categories
        Object.keys(categories).forEach(key => {
            if (categories[key].totalItems === 0) delete categories[key];
        });

        return categories;
    };

    const menuData = extractMenuData(menuSections);

    // Get item dot color based on type
    const getDotColor = (type) => {
        const t = (type || "").toLowerCase();
        if (t.includes("non-veg") || t.includes("non veg") || t.includes("nonveg")) return colors.nonVeg;
        if (t.includes("paneer")) return colors.paneer;
        if (t.includes("egg")) return colors.egg;
        if (t.includes("alcoholic") && !t.includes("non")) return colors.nonVeg;
        return colors.veg;
    };

    // ═══════════════════════════════════════════════════════════════
    // Styles (inline for PDF compatibility, avoid page breaks)
    // ═══════════════════════════════════════════════════════════════
    const pageStyle = {
        backgroundColor: "#fff",
        padding: "24px 32px",
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: colors.dark,
        lineHeight: 1.5,
        fontSize: 13,
    };

    const sectionStyle = {
        pageBreakInside: "avoid",
        breakInside: "avoid",
    };

    // ═══════════════════════════════════════════════════════════════
    // Render
    // ═══════════════════════════════════════════════════════════════
    return (
        <div ref={ref} style={pageStyle}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, ...sectionStyle }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: colors.primary, letterSpacing: "0.15em" }}>TRACEVENUE</div>
                <div style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #dc2626 100%)`,
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: 6,
                    letterSpacing: "0.08em",
                    boxShadow: "0 2px 4px rgba(234,88,12,0.3)",
                }}>
                    JOB SUMMARY
                </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.dark, margin: "12px 0 6px", lineHeight: 1.3 }}>
                {name}
            </h1>
            <p style={{ fontSize: 13, color: colors.lightGray, margin: "0 0 20px", fontStyle: "italic" }}>
                {specialRequirements || "No special requirements provided."}
            </p>

            <hr style={{ border: "none", borderTop: `1px solid ${colors.border}`, margin: "0 0 20px" }} />

            {/* OVERVIEW Section */}
            <div style={sectionStyle}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors.primary, letterSpacing: "0.08em", marginBottom: 14 }}>
                    OVERVIEW
                </div>

                {/* Overview Cards */}
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    {/* Budget */}
                    <div style={{
                        flex: 1,
                        background: `linear-gradient(135deg, ${colors.primaryBg} 0%, #fef3c7 100%)`,
                        border: `1px solid ${colors.primaryBorder}`,
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: colors.primary, marginBottom: 2 }}>{budgetDisplay}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: colors.gray, letterSpacing: "0.05em" }}>
                            BUDGET ({budgetType === "lumpSum" ? "LUMPSUM" : "PER PERSON"})
                        </div>
                    </div>

                    {/* Guests */}
                    <div style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: colors.dark, marginBottom: 2 }}>
                            {peopleRange?.minPeople || 0} - {peopleRange?.maxPeople || 0}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: colors.gray, letterSpacing: "0.05em" }}>GUESTS</div>
                    </div>

                    {/* Date */}
                    <div style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: colors.dark, marginBottom: 2 }}>
                            {dateInfo?.fullDate || "TBD"}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: colors.gray, letterSpacing: "0.03em" }}>
                            {dateInfo ? `${dateInfo.weekday} • ${dateInfo.startTime}${dateInfo.endTime ? ` - ${dateInfo.endTime}` : ""}` : "DATE NOT SET"}
                        </div>
                    </div>
                </div>

                {/* Info Row */}
                <div style={{ display: "flex", gap: 20, padding: "14px 0", borderTop: `1px solid ${colors.lightBorder}`, borderBottom: `1px solid ${colors.lightBorder}`, marginBottom: 14 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: colors.lightGray, marginBottom: 3, letterSpacing: "0.03em" }}>Service Type</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: colors.dark }}>{serviceType?.charAt(0).toUpperCase() + serviceType?.slice(1) || "Not specified"}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: colors.lightGray, marginBottom: 3, letterSpacing: "0.03em" }}>Event Type</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: colors.dark }}>{eventTypeName}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: colors.lightGray, marginBottom: 3, letterSpacing: "0.03em" }}>Preferred Location</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: colors.dark }}>{locationName}</div>
                    </div>
                </div>

                {/* Service Radius */}
                <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, color: colors.lightGray, marginBottom: 3, letterSpacing: "0.03em" }}>Service Radius</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.dark }}>{serviceRadius || "Within 10 km"}</div>
                </div>

                {/* Food & Alcohol */}
                <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                    <div style={{
                        flex: 1,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "10px 14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontSize: 12, color: colors.gray }}>Food</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: colors.dark }}>{isVegOnly ? "Veg Only" : "Veg & Non-Veg"}</span>
                    </div>
                    <div style={{
                        flex: 1,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "10px 14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontSize: 12, color: colors.gray }}>Alcohol</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: colors.dark }}>{isAlcoholic ? "Allowed" : "Not Allowed"}</span>
                    </div>
                </div>
            </div>

            {/* MENU SELECTION */}
            {Object.keys(menuData).length > 0 && (
                <div style={sectionStyle}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: colors.primary, letterSpacing: "0.08em", marginBottom: 16 }}>
                        MENU SELECTION
                    </div>

                    {Object.entries(menuData).map(([categoryName, catData]) => (
                        <div key={categoryName} style={{ marginBottom: 24, ...sectionStyle }}>
                            {/* Category Header with count */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom: `2px solid ${colors.border}`,
                                paddingBottom: 8,
                                marginBottom: 14
                            }}>
                                <h2 style={{ fontSize: 16, fontWeight: 700, color: colors.dark, margin: 0 }}>
                                    {categoryName}
                                </h2>
                                <span style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: colors.primary,
                                    backgroundColor: colors.primaryBg,
                                    padding: "3px 10px",
                                    borderRadius: 12,
                                    border: `1px solid ${colors.primaryBorder}`,
                                }}>
                                    {catData.totalSelectionLimit} items
                                </span>
                            </div>

                            {/* Subcategories */}
                            {Object.entries(catData.subcategories).map(([subName, data]) => (
                                data.items.length > 0 && (
                                    <div key={subName} style={{ marginBottom: 14, ...sectionStyle }}>
                                        <div style={{
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: colors.primary,
                                            letterSpacing: "0.04em",
                                            marginBottom: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}>
                                            {subName}
                                            <span style={{
                                                fontSize: 10,
                                                fontWeight: 500,
                                                color: colors.gray,
                                                backgroundColor: colors.lightBorder,
                                                padding: "2px 8px",
                                                borderRadius: 10,
                                            }}>
                                                {data.selectionLimit}
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {data.items.map((item, i) => (
                                                <span key={i} style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    backgroundColor: "#fafafa",
                                                    border: "1px solid #e5e7eb",
                                                    borderRadius: 20,
                                                    padding: "5px 12px",
                                                    fontSize: 12,
                                                    color: colors.dark,
                                                }}>
                                                    <span style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        backgroundColor: getDotColor(item.type),
                                                        marginRight: 8,
                                                        flexShrink: 0,
                                                    }} />
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* AMENITIES & SERVICES */}
            {services?.length > 0 && (() => {
                // Group services by serviceCategory
                const groupedServices = services.reduce((acc, service) => {
                    const category = service.serviceCategory || "Uncategorized";
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(service);
                    return acc;
                }, {});

                // Helper to get variant info
                const getVariantInfo = (service) => {
                    if (!service || !Array.isArray(service.options)) return null;
                    const { variantOptionId, variantTypeId } = service;
                    const option = service.options?.find((opt) => String(opt._id) === String(variantOptionId));
                    if (!option) return null;
                    const type = option.types?.find((t) => String(t._id) === String(variantTypeId));
                    if (!type) return null;
                    return { optionName: option.name, typeValue: type.value };
                };

                return (
                    <div style={sectionStyle}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: colors.primary, letterSpacing: "0.08em", marginBottom: 14 }}>
                            AMENITIES & SERVICES
                        </div>
                        {Object.entries(groupedServices).map(([category, categoryServices]) => (
                            <div key={category} style={{ marginBottom: 20, ...sectionStyle }}>
                                {/* Category Header */}
                                <h3 style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: colors.dark,
                                    margin: "0 0 12px 0",
                                    paddingBottom: 6,
                                    borderBottom: `1px solid ${colors.border}`,
                                }}>
                                    {category}
                                </h3>
                                {/* Services in this category */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {categoryServices.map((svc, i) => {
                                        const Icon = lucide[svc.serviceIcon] || lucide.Camera;
                                        const isFree = svc.Price === "free" || svc.price === 0 || String(svc.Price || "").toLowerCase() === "free";
                                        const variantInfo = getVariantInfo(svc);
                                        return (
                                            <div key={i} style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: 12,
                                                backgroundColor: colors.primaryBg,
                                                border: `1px solid ${colors.primaryBorder}`,
                                                borderRadius: 10,
                                                padding: "12px 16px",
                                            }}>
                                                <div style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 8,
                                                    backgroundColor: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                    border: `1px solid ${colors.primaryBorder}`,
                                                }}>
                                                    <Icon size={20} color={colors.primary} strokeWidth={1.5} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {/* Service Name + Badge Row */}
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                                        <span style={{ fontSize: 13, fontWeight: 600, color: colors.dark }}>
                                                            {svc.serviceName}
                                                        </span>
                                                        <span style={{
                                                            fontSize: 9,
                                                            fontWeight: 700,
                                                            color: isFree ? "#fff" : colors.primary,
                                                            backgroundColor: isFree ? colors.veg : "transparent",
                                                            border: isFree ? "none" : `1px solid ${colors.primary}`,
                                                            padding: "2px 8px",
                                                            borderRadius: 10,
                                                            letterSpacing: "0.03em",
                                                        }}>
                                                            {isFree ? "FREE" : "PAID"}
                                                        </span>
                                                    </div>
                                                    {/* Variant Info */}
                                                    {variantInfo && (
                                                        <div style={{ fontSize: 11, color: colors.gray, lineHeight: 1.4 }}>
                                                            <span style={{ fontWeight: 500 }}>{variantInfo.optionName}</span>
                                                            {variantInfo.typeValue && (
                                                                <span>: {variantInfo.typeValue}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })()}
        </div>
    );
});

EnquiryPdfTemplate.displayName = "EnquiryPdfTemplate";
export default EnquiryPdfTemplate;
