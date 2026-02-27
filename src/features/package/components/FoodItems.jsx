import { Card, Badge } from "@/shared/components/ui";

/* ── Veg / Non-veg / Drink type indicator dot ── */
const ItemTypeDot = ({ itemTypeName }) => {
    const name = (itemTypeName || "").toLowerCase();

    // Non-vegetarian → red triangle
    if (name === "non-vegetarian") {
        return (
            <div className="flex h-[20px] w-[20px] border rounded-[4px] border-[#dc2626] justify-center items-center shrink-0">
                <div
                    className="w-0 h-0"
                    style={{
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderBottom: "8px solid #dc2626",
                    }}
                />
            </div>
        );
    }

    // Cold / Soft / Alcoholic / Non-Alcoholic → purple drink icon
    if (["cold", "soft", "alcoholic", "non-alcoholic"].includes(name)) {
        return (
            <div className="flex h-[20px] w-[20px] border rounded-[4px] border-[#683eb8] justify-center items-center shrink-0">
                <div className="h-[10px] w-[10px] bg-[#683eb8] rounded-full" />
            </div>
        );
    }

    // Vegetarian / Paneer / default → green dot
    return (
        <div className="flex h-[20px] w-[20px] border rounded-[4px] border-[#15B076] justify-center items-center shrink-0">
            <div className="h-[10px] w-[10px] bg-[#15B076] rounded-full" />
        </div>
    );
};

/* ── Human-readable item-type label ── */
const foodTypeLabel = (itemTypeName) => {
    const map = {
        Vegetarian: "Vegetarian",
        "Non-Vegetarian": "Non Vegetarian",
        Paneer: "Paneer",
        Cold: "Cold",
        Soft: "Soft",
        Alcoholic: "Alcoholic",
        "Non-Alcoholic": "Non Alcoholic",
    };
    return map[itemTypeName] || itemTypeName;
};

/* ── Render one offering (an itemType group with its items) ── */
const RenderOffering = ({ offering }) => {
    const { itemTypeId, itemTypeName, selectionLimit, selectedItems } = offering;
    const items = selectedItems || offering?.items;
    if (!items?.length) return null;

    const selectionCount =
        selectionLimit?.min != null
            ? selectionLimit.min !== selectionLimit.max
                ? `${selectionLimit.min}-${selectionLimit.max}`
                : `${selectionLimit.min}`
            : "";

    const allIncluded =
        selectionCount && Number(selectionCount) === items.length;

    return (
        <Card
            variant="default"
            padding="lg"
            className="max-w-[444px] p-[20px] mb-[20px] shadow-[0_4px_10px_#0000000d]"
        >
            <Card.Header>
                <h4 className="mb-[10px] text-[18px] text-[#060606] font-semibold flex items-center gap-1">
                    {foodTypeLabel(itemTypeName)}
                    {selectionCount && (
                        <Badge
                            variant="soft"
                            className="ml-[6px] px-[6px] py-[2px] text-[11.2px] font-bold!"
                        >
                            {allIncluded ? "All Included" : `Any ${selectionCount}`}
                        </Badge>
                    )}
                </h4>
            </Card.Header>
            <Card.Body>
                <div className="grid max-sm:grid-cols-2 w-full gap-2">
                    {items.map((item, index) => (
                        <div key={item._id || index} className="flex gap-2 mt-[10px]">
                            <ItemTypeDot itemTypeName={itemTypeName} />
                            <span className="text-[#060606] text-[12px] font-semibold">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

/* ── Main FoodItems component ── */
function FoodItems({ packageMenu, sectionRefs }) {
    if (!packageMenu?.length) {
        return (
            <p className="text-[14px] text-[#9ca3af] p-4">No menu items found</p>
        );
    }

    // Filter out empty / unnamed categories
    const categories = packageMenu.filter((cat) => {
        if (!cat.categoryName) return false;
        const hasDirectItems = cat.offerings?.some(
            (o) => (o.selectedItems?.length || 0) > 0
        );
        const hasSubItems = cat.subcategories?.some((sub) =>
            sub.offerings?.some((o) => (o.selectedItems?.length || 0) > 0)
        );
        return hasDirectItems || hasSubItems;
    });

    return (
        <Card variant="default" padding="md" className="border-none shadow-none pt-0!">
            <Card.Body>
                <div className="flex-1 w-full">
                    <div className="w-full">
                        {categories.map((category) => (
                            <div
                                key={category.categoryId}
                                ref={(el) => {
                                    if (sectionRefs?.current) {
                                        sectionRefs.current[category.categoryId] = el;
                                    }
                                }}
                                data-id={category.categoryId}
                                className="w-full px-[6px] pb-4 lg:px-[24px] bg-[#ffffff] lg:border lg:border-[#e5e7eb] rounded-[30px] mb-6 scroll-mt-[80px]"
                            >
                                {/* Category heading */}
                                <h5 className="mb-[16px] p-[10px] text-[#1a1a1a] text-[18.4px] font-bold bg-white border-b-2 border-[#e29f55]">
                                    {category.categoryName}
                                </h5>

                                {/* Direct offerings (not inside subcategory) */}
                                {category.offerings?.map((offering) => (
                                    <RenderOffering
                                        key={`direct-${offering.itemTypeId}`}
                                        offering={offering}
                                    />
                                ))}

                                {/* Subcategories */}
                                {category.subcategories?.map((sub) => (
                                    <div key={sub.subcategoryId} className="mt-4">
                                        <h6 className="text-[14px] font-bold text-[#6b7280] uppercase tracking-wider mb-3 pl-[10px] border-l-2 border-[#e29f55]">
                                            {sub.subcategoryName}
                                        </h6>
                                        {sub.offerings?.map((offering) => (
                                            <RenderOffering
                                                key={`sub-${sub.subcategoryId}-${offering.itemTypeId}`}
                                                offering={offering}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default FoodItems;