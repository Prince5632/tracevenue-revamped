import { Card, Badge } from "@/shared/components/ui";

function PackageCuisines({ cuisines }) {
    return (
        <Card variant="flat" padding="md" className="border-none bg-[#f8f9fa]! mb-4">
            <Card.Header>
                <h4 className="mb-[16px] text-[#1a1a1a] text-[18px] font-bold">
                    Cuisines
                </h4>
            </Card.Header>
            <Card.Body>
                {cuisines?.map((item, index) => (
                    <Badge
                        variant="outline"
                        key={index}
                        className="
                px-[16px] py-[8px]
                text-[#333333] text-[14px] font-semibold
                bg-[#ffffff]!
                rounded-[30px] border border-[#e0e0e0]
                transition-all
                duration-200 ease-in mr-2
            "
                    >
                        {item}
                    </Badge>
                ))}
            </Card.Body>
        </Card>
    );
}

export default PackageCuisines;
