import { Navbar } from "../components/common";
import { PackageInfo } from "../components/common";
function PackageDetails() {
    const packageInformation = [
        {
            step: 'Step 2',
            heading: 'Package Details',
            description: 'Based on your location and event type, restaurants are offering a variety of packages with different cuisine combinations.',
            subHeading: 'Mega 6-Cuisine Celebration Spread Featuring Indian & Continental',
            price: '80000',
            services: [
                { 
                    content: '21+dishes', 
                    class: "fa-solid fa-utensils" },
                { 
                    content: '6 cuisines', 
                    class: "fa-solid fa-earth-asia" },
                { 
                    content: '1 venues', 
                    class: "fa-solid fa-store" },
                { 
                    content: 'Services included', 
                    class: "fa-solid fa-bell-concierge" }
            ],
            cardInfo: [
                {
                    cardHeading: 'Soups',
                    cardItems: ['3 Veg Soups', '1 Non-Veg Soups']
                },
                {
                    cardHeading: 'Beverages',
                    cardItems: ['1 Veg Beverages','5 Cold Beverages', '2 Rum']
                },
                {
                    cardHeading: 'Starter/Snacks',
                    cardItems: ['1 Paneer Starter/Snacks','4 Non-Veg Starter/Snacks', '3 Veg Starter/Snacks']
                },
                {
                    cardHeading: 'Main course',
                    cardItems: ['3 Raita']
                },
                {
                    cardHeading: 'Complimentary',
                    cardItems: ['3 Veg Complimentary']
                },
                {
                    cardHeading: 'Services',
                    cardItems: ['Complimentary Services Included']
                }
            ]
        }
    ]
    return <>
        <Navbar />
        {
            packageInformation.map((item, index) => (
                <PackageInfo key={index} step={item.step} heading={item.heading} description={item.description} subHeading={item.subHeading} price={item.price} services={item.services} cardInfo={item.cardInfo} />
            ))
        }
    </>
}
export default PackageDetails;