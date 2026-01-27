import { Navbar } from "@shared/components/layout";
import { PackageInfo } from "@shared/components/ui";
import {packageInformation} from "@shared/services";
// import { packageInformation } from "../data/packageData";
function PackageDetails() {
  return (
    <>
      <Navbar />
      {packageInformation.map((item, index) => (
        <PackageInfo
          key={index}
          step={item.step}
          heading={item.heading}
          description={item.description}
          subHeading={item.subHeading}
          price={item.price}
          services={item.services}
          cardInfo={item.cardInfo}
          cuisines={item.cuisines}
          packageMenu={item.packageMenu}
        />
      ))}
    </>
  );
}
export default PackageDetails;
