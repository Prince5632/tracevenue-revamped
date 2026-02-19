import { Card } from "@/shared/components/ui";

/* Count all items in a category (direct offerings + subcategory offerings) */
const countItems = (category) => {
    let count = 0;
    category.offerings?.forEach((o) => (count += o.selectedItems?.length || 0));
    category.subcategories?.forEach((sub) =>
        sub.offerings?.forEach((o) => (count += o.selectedItems?.length || 0))
    );
    return count;
};

function MenuCategories({ packageMenu, isActive, handleMenuClick }) {
    const onMenuClick = handleMenuClick?.();

    if (!packageMenu?.length) return null;

    // Filter out empty categories
    const categories = packageMenu.filter(
        (cat) => cat.categoryName && countItems(cat) > 0
    );

    return (
        <div className="flex flex-col w-[200px] justify-center">
            <h2 className="text-[18px] text-[#060606] font-bold mb-2">
                Menu Categories
            </h2>
            <Card variant="default" padding="md" className="px-2">
                <Card.Body>
                    {categories.map((category) => {
                        const itemCount = countItems(category);
                        const isActiveCategory = isActive === category.categoryId;

                        return (
                            <div
                                key={category.categoryId}
                                onClick={() => onMenuClick?.(category.categoryId)}
                                className={`h-[20px] p-[12px] mb-[14px] w-full flex items-center justify-start cursor-pointer hover:border-l-2 border-l-2 ${isActiveCategory
                                        ? "border-l-[#ff4000]"
                                        : "border-l-[#ffffff]"
                                    }`}
                            >
                                <span
                                    className={`text-[16px] font-semibold ${isActiveCategory ? "text-[#060606]" : "text-[#5C5F62]"
                                        } transition-all duration-300`}
                                >
                                    {category.categoryName}&nbsp;&#40;{itemCount}&#41;
                                </span>
                            </div>
                        );
                    })}
                </Card.Body>
            </Card>
        </div>
    );
}

export default MenuCategories;