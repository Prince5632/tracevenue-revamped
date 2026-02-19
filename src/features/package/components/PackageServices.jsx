import * as lucide from "lucide-react";
import { Card } from "@/shared/components/ui";

/* ── helpers ── */
const isServiceFree = (s) => s.price === 0 || s.Price === 0;

const getServiceIdentifier = (s) =>
    `${s._id}-${s.serviceName}-${s.variantOptionId}-${s.variantTypeId}-${isServiceFree(s) ? "free" : "paid"}`;

/** Find the selected variant option name + type value from the options array */
const getVariantInfo = (service) => {
    if (!service.options?.length) return null;
    for (const option of service.options) {
        if (option._id === service.variantOptionId) {
            const type = option.types?.find((t) => t._id === service.variantTypeId);
            return { optionName: option.name, typeValue: type?.value || "" };
        }
    }
    return null;
};

/** Group services array by serviceCategory */
const groupByCategory = (services = []) => {
    return services.reduce((acc, service) => {
        const cat = service.serviceCategory || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(service);
        return acc;
    }, {});
};

function PackageServices({ services }) {
    const serviceCategories = groupByCategory(services);

    if (!services?.length) {
        return (
            <div className="w-full md:w-[344px] border-l border-l-[#D7D9DA] flex flex-col justify-start mt-6 md:mt-0">
                <h2 className="text-[18px] text-[#060606] font-bold mb-2 mx-4">
                    Amenities & Services
                </h2>
                <p className="text-[14px] text-[#9ca3af] mx-4">No services included</p>
            </div>
        );
    }

    return (
        <div className="w-full md:w-[344px] border-l border-l-[#D7D9DA] flex flex-col justify-start mt-6 md:mt-0">
            <h2 className="text-[18px] text-[#060606] font-bold mb-2 mx-4">
                Amenities & Services
            </h2>

            <div className="w-full max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide pb-[200px]">
                {Object.keys(serviceCategories).map((category) => (
                    <div key={category} className="w-full px-4 mb-4">
                        {/* Category heading */}
                        <h3 className="text-[13px] font-bold text-[#9ca3af] uppercase tracking-wider mb-2">
                            {category}
                        </h3>

                        {serviceCategories[category].map((service) => {
                            const isPaid = !isServiceFree(service);
                            const variant = getVariantInfo(service);
                            const IconComponent =
                                lucide[service.serviceIcon] || lucide.Utensils;

                            return (
                                <Card
                                    variant="default"
                                    padding="md"
                                    key={getServiceIdentifier(service)}
                                    className="mb-2 !p-2 !rounded-[30px]"
                                >
                                    <Card.Body className="flex gap-4">
                                        {/* Icon */}
                                        <div className="h-[78px] w-[78px] rounded-[20px] bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] flex justify-center items-center flex-shrink-0">
                                            <IconComponent size={32} color="#E29F55" strokeWidth={1.5} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col justify-center my-1 min-w-0">
                                            <h3 className="text-[15px] font-semibold text-[#060606] whitespace-nowrap overflow-hidden text-ellipsis">
                                                {service.serviceName}
                                            </h3>

                                            {variant && (
                                                <p
                                                    className="text-[12px] text-[#6b7280] mt-[2px] whitespace-nowrap overflow-hidden text-ellipsis"
                                                    title={`${variant.optionName}: ${variant.typeValue}`}
                                                >
                                                    {variant.optionName}: {variant.typeValue}
                                                </p>
                                            )}

                                            {/* Free / Paid badge */}
                                            <div className="mt-1">
                                                {isPaid ? (
                                                    <span className="bg-[#EEEBF8] h-[24px] px-[10px] py-[2px] rounded-[5px] text-center text-[#573BB6] text-[13px] font-semibold inline-block">
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <span className="bg-[#c6fbe5] h-[24px] px-[10px] py-[2px] rounded-[5px] text-center text-[#15B076] text-[13px] font-semibold inline-block">
                                                        Free
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PackageServices;
