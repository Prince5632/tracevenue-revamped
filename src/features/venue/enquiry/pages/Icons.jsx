import CharityRunIcon from "@/assets/eventtype-images/charity-run.svg";
import RetirementPartyIcon from "@/assets/eventtype-images/retirement-party.svg";
import KittyPartyIcon from "@/assets/eventtype-images/kitty-party.svg";
import EngagementCeremonyIcon from "@/assets/eventtype-images/engagement-ceremony.svg";
import BrandPromotionIcon from "@/assets/eventtype-images/brand-promotion.svg";
import MiceIcon from "@/assets/eventtype-images/Mice.svg";
import FreshersPartyIcon from "@/assets/eventtype-images/freshers-party.svg";
import AnniversaryCelebrationIcon from "@/assets/eventtype-images/anniversary-celebration.svg";
import FamilyFunctionIcon from "@/assets/eventtype-images/family-function.svg";
import KidsBirthdayPartyIcon from "@/assets/eventtype-images/kids-birthday-party.svg";
import WeddingCeremonyIcon from "@/assets/eventtype-images/wedding-ceremony.svg";
import ConferenceIcon from "@/assets/eventtype-images/conference.svg";
import WeddingReceptionIcon from "@/assets/eventtype-images/wedding-reception.svg";
import FarewellPartyIcon from "@/assets/eventtype-images/farewell-party.svg";
import CorporateEventIcon from "@/assets/eventtype-images/corporate-event.svg";
import SocialGatheringIcon from "@/assets/eventtype-images/social-gathering.svg";
import SangeetCeremonyIcon from "@/assets/eventtype-images/sangeet-ceremony.svg";
import BirthdayPartyIcon from "@/assets/eventtype-images/birthday-party.svg";
import ReceptionPartyIcon from "@/assets/eventtype-images/reception-party.svg";
import SilverJubileeAnniversaryIcon from "@/assets/eventtype-images/silver-jubilee-anniversary.svg";
import RingCeremonyIcon from "@/assets/eventtype-images/ring-ceremony.svg";
import CocktailDinnerIcon from "@/assets/eventtype-images/cocktail-dinner.svg";
import GraduationPartyIcon from "@/assets/eventtype-images/graduation-party.svg";
import CorporateConferenceIcon from "@/assets/eventtype-images/corporate-conference.svg";
import ReunionIcon from "@/assets/eventtype-images/reunion.svg";
import PoolPartyIcon from "@/assets/eventtype-images/pool-party 1.svg"; // rename if needed

export const iconsMap = {
  "charity-run-img-class": CharityRunIcon,
  "retirement-party-img-class": RetirementPartyIcon,
  "kitty-party-img-class": KittyPartyIcon,
  "engagement-ceremony-img-class": EngagementCeremonyIcon,
  "brand-promotion-img-class": BrandPromotionIcon,
  "mice-img-class": MiceIcon,
  "freshers-party-img-class": FreshersPartyIcon,
  "anniversary-celebration-img-class": AnniversaryCelebrationIcon,
  "family-function-img-class": FamilyFunctionIcon,
  "kids-birthday-party-img-class": KidsBirthdayPartyIcon,
  "wedding-ceremony-img-class": WeddingCeremonyIcon,
  "conference-img-class": ConferenceIcon,
  "wedding-reception-img-class": WeddingReceptionIcon,
  "farewell-party-img-class": FarewellPartyIcon,
  "corporate-event-img-class": CorporateEventIcon,
  "social-gathering-img-class": SocialGatheringIcon,
  "sangeet-ceremony-img-class": SangeetCeremonyIcon,
  "birthday-party-img-class": BirthdayPartyIcon,
  "reception-party-img-class": ReceptionPartyIcon,
  "silver-jubilee-anniversary-img-class": SilverJubileeAnniversaryIcon,
  "ring-ceremony-img-class": RingCeremonyIcon,
  "cocktail-dinner-img-class": CocktailDinnerIcon,
  "graduation-party-img-class": GraduationPartyIcon,
  "corporate-conference-img-class": CorporateConferenceIcon,
  "reunion-img-class": ReunionIcon,
  "pool-party-img-class": PoolPartyIcon,
};

export const IconRenderer = ({
  className,
  size = 70,
  color = "rgba(255, 64, 0, 1)",
}) => {
  const iconKey =
    className?.trim() || "anniversary-celebration-img-class";

  const Icon = iconsMap[iconKey];

  if (!Icon) return null;

  return typeof Icon === "string" ? (
    <img src={Icon} alt={iconKey} width={size} height={size} />
  ) : (
    <Icon width={size} height={size} fill={color} />
  );
};
