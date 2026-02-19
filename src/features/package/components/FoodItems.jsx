import { Card, Badge } from "@/shared/components/ui";
import Drink from "@assets/package images/packageServicesIcons/drink.png"

function FoodItems(props) {
    return <><Card variant="default" padding="md" className="border-none shadow-none !pt-0">
        <Card.Header>
            <h4 className="text-[18px] text-[##060606] font-semibold mb-2">{props.subHeading}</h4>
        </Card.Header>
        <Card.Body>
            <div className="flex-1 w-full ">
                <div className="w-full ">
                    {props.packageMenu?.map((item, index) => (
                        item.id === 1 ? (
                            <div
                                key={index}
                                className="w-full px-[6px] pb-4 lg:px-[24px] bg-[#ffffff] lg:border lg:border-[#e5e7eb] rounded-[30px] mb-6" >
                                {item.menuButton?.map((subItem, index) => (
                                    <div
                                        key={index}
                                        ref={(el) => (props.sectionRefs.current[subItem.id] = el)}
                                        data-id={subItem.id}
                                        className="scroll-mt-[80px]"
                                    >
                                        <h5
                                            className="mb-[16px] p-[10px] text-[#1a1a1a] text-[18.4px] font-bold bg-white border-b-[2px] border-[#e29f55] ">
                                            {subItem.content}
                                        </h5>
                                        <Card
                                            variant="default"
                                            padding="lg"
                                            className="max-w-[444px] p-[20px] mb-[20px] shadow-[0_4px_10px_#0000000d] " >
                                            <Card.Header>
                                                <h4
                                                    className="mb-[10px]text-[18px] text-[#060606] font-semibold"
                                                >
                                                    {subItem.subHeading}
                                                    <Badge
                                                        variant="soft"
                                                        className=" ml-[6px] px-[6px] py-[2px] text-[11.2px] !font-bold "
                                                    >
                                                        Any {subItem.count}
                                                    </Badge>
                                                </h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <div
                                                    className="grid grid-cols-2 w-full gap-2">
                                                    {subItem.subContent?.map((cardItem, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-4 mt-[10px] sm:mb-0">
                                                            {subItem.id === 1 ? (
                                                                <>
                                                                    <div
                                                                        className="flex h-[20px] w-[20px]  border rounded-[4px] border-[#683eb8] justify-center items-end"
                                                                    >
                                                                        <img src={Drink} className="w-[12px] h-[14px] ml-0.5" alt="drink image" />
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div
                                                                        className="flex h-[20px] w-[20px] border rounded-[4px] border-[#15B076] justify-center items-center "
                                                                    >
                                                                        <div
                                                                            className="h-[10px] w-[10px]  bg-[#15B076] rounded-[30px] "
                                                                        ></div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            <span
                                                                className=" text-[#060606] text-[12px] font-semibold "
                                                            >
                                                                {cardItem}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </Card.Body>
    </Card>
    </>
}
export default FoodItems;