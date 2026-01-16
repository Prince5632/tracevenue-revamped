import { Navbar } from "../components/common";
import { PackageInfo } from "../components/common";
function PackageDetails() {
    const packageInformation = [
        {
            step: 'Step 2',
            heading: 'Package Details',
            description: 'Based on your location and event type, restaurants are offering a variety of packages with different cuisine combinations.',
            subHeading: 'Mega 6-Cuisine Celebration Spread Featuring Indian & Continental',
            price: '40',
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
            cardDescription: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur perferendis, corporis soluta quisquam autem sint eaque consequuntur dignissimos cumque incidunt. Iure doloribus eveniet unde eligendi nostrum mollitia consequatur, commodi, at ratione, labore architecto cumque! Ex commodi quas alias eveniet dolorum totam quam excepturi, eum, asperiores culpa minus. Modi, labore tempore?'
        }
    ]
    return <>
        <Navbar />
        {
            packageInformation.map((item, index) => (
                <PackageInfo key={index} step={item.step} heading={item.heading} description={item.description} subHeading={item.subHeading} price={item.price} services={item.services} cardDescription={item.cardDescription} />
            ))
        }
    </>
}
export default PackageDetails;