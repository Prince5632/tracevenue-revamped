import { Input } from "../common";
import calendarIcon from "../../assets/step3/calendar-icon.png";

const SearchBar = () => {
  return (
    <>
      <Input placeholder="Type to Search..." leftIcon={<img src={calendarIcon} alt="calendar" />} />
    </>
  );
};

export default SearchBar;

