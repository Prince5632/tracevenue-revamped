import anniversaryIcon from "@assets/eventtype-images/anniversary-celebration.svg";
import birthdayIcon from "@assets/eventtype-images/birthday-party.svg";
import kidsBirthdayIcon from "@assets/eventtype-images/kids-birthday-party.svg";
import retirementIcon from "@assets/eventtype-images/retirement-party.svg";
import farewellIcon from "@assets/eventtype-images/farewell-party.svg";
import kittyPartyIcon from "@assets/eventtype-images/kitty-party.svg";
import poolPartyIcon from "@assets/eventtype-images/pool-party 1.svg";
import ringCeremonyIcon from "@assets/eventtype-images/ring-ceremony.svg";
import sangeetCeremonyIcon from "@assets/eventtype-images/sangeet-ceremony.svg";
import weddingReceptionIcon from "@assets/eventtype-images/wedding-reception.svg";
import brandPromotionIcon from "@assets/eventtype-images/brand-promotion.svg";
import charityRunIcon from "@assets/eventtype-images/charity-run.svg";
import corporateConferenceIcon from "@assets/eventtype-images/corporate-conference.svg";


export const eventCategories = [
  {
    id: "weddings",
    title: "Weddings",
    events: [
      { id: "ring", label: "Ring Ceremony", icon: ringCeremonyIcon },
      { id: "sangeet", label: "Sangeet Ceremony", icon: sangeetCeremonyIcon },
      { id: "reception", label: "Wedding Reception", icon: weddingReceptionIcon },
    ],
  },
  {
    id: "corporate",
    title: "Corporate",
    events: [
      { id: "brand", label: "Brand Promotion", icon: brandPromotionIcon },
      { id: "conference", label: "Corporate Conference", icon: corporateConferenceIcon },
    ],
  },
  {
    id: "celebrations",
    title: "Celebrations",
    events: [
      { id: "anniversary", label: "Anniversary Party", icon: anniversaryIcon },
      { id: "birthday", label: "Birthday Party", icon: birthdayIcon },
      { id: "kids", label: "Kids Birthday Party", icon: kidsBirthdayIcon },
      { id: "retirement", label: "Retirement Party", icon: retirementIcon },
    ],
  },
  {
    id: "gatherings",
    title: "Gatherings",
    events: [
      { id: "farewell", label: "Farewell Party", icon: farewellIcon },
      { id: "kitty", label: "Kitty Party", icon: kittyPartyIcon },
      { id: "pool", label: "Pool Party", icon: poolPartyIcon },
    ],
  },
  {
    id: "public events",
    title: "Public Events",
    events: [
      { id: "charity", label: "Charity Run", icon: charityRunIcon },
    ],
  }
];
