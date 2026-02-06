import { Navbar } from "@shared/components/layout";
import PackageInfo from "@/features/package/components/PackageInfo";
import {packageInformation} from "@shared/services";

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
          cardDescription={item.cardDescription}
        />
      ))}
    </>
  );
}
export default PackageDetails;
