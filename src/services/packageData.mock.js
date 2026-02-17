import carParking from "@/assets/package images/packageServicesIcons/car_parking.png";
import bikeParking from "@/assets/package images/packageServicesIcons/bike_parking.png";
import mike from "@/assets/package images/packageServicesIcons/mike.png";
import internet from "@/assets/package images/packageServicesIcons/internet.png";
import beverages from "@/assets/package images/packageServicesIcons/beverage.png";
import snacks from "@/assets/package images/packageServicesIcons/snacks.png";
import mainCourse from "@/assets/package images/packageServicesIcons/main_course.png";
import salad from "@/assets/package images/packageServicesIcons/salad.png";
import starters from "@/assets/package images/packageServicesIcons/starters.png";
import desserts from "@/assets/package images/packageServicesIcons/desserts.png";

export const packageInformation = [
  {
    step: "Step 2",
    heading: "Package Details",
    description:
      "Based on your location and event type, restaurants are offering a variety of packages with different cuisine combinations.",
    subHeading:
      "Mega 6-Cuisine Celebration Spread Featuring Indian & Continental",
    price: "80000",
    services: [
      {
        content: "21+dishes",
        class: "fa-solid fa-utensils",
      },
      {
        content: "6 cuisines",
        class: "fa-solid fa-earth-asia",
      },
      {
        content: "1 venues",
        class: "fa-solid fa-store",
      },
      {
        content: "Services included",
        class: "fa-solid fa-bell-concierge",
      },
    ],
    cardInfo: [
      {
        cardHeading: "Soups",
        cardItems: ["3 Veg Soups", "1 Non-Veg Soups"],
      },
      {
        cardHeading: "Beverages",
        cardItems: ["1 Veg Beverages", "5 Cold Beverages", "2 Rum"],
      },
      {
        cardHeading: "Starter/Snacks",
        cardItems: [
          "1 Paneer Starter/Snacks",
          "4 Non-Veg Starter/Snacks",
          "3 Veg Starter/Snacks",
        ],
      },
      {
        cardHeading: "Main course",
        cardItems: ["3 Raita"],
      },
      {
        cardHeading: "Complimentary",
        cardItems: ["3 Veg Complimentary"],
      },
      {
        cardHeading: "Services",
        cardItems: ["Complimentary Services Included"],
      },
    ],
    cuisines: [
      "Indian",
      "Italian",
      "Continental",
      "Chinese",
      "North Indian",
      "Mughlai",
      "Indo-Chinese",
      "Indian/Continental",
    ],
    packageMenu: [
      {
        id: 1,
        heading: "Menu",
        menuButton: [
          {
            id: 1,
            content: "Beverages",
            subHeading: "Cold Drinks",
            subContent: ["Coca Cola", "Coke", "Water"],
            icon:beverages,
            count: "3",
          },
          {
            id: 2,
            content: "Starter/Snacks",
            subHeading: "Veg items",
            subContent: ["Honey Chilli Potato", "Tangy Potato Tikki"],
            icon: snacks,
            count: "2",
          },
          {
            id: 3,
            content: "Soups",
            subHeading: "Veg items",
            subContent: [
              "Veg Manchow Soup",
              "Veg Hot N Sour Soup",
              "Veg Clear Soup",
            ],
            icon:salad,
            count: "3",
          },
          {
            id: 4,
            content: "Complimentary",
            subHeading: "veg items",
            subContent: ["Papad"],
            icon:desserts,
            count: "1",
          },
        ],
      },
      {
        id: 2,
        heading: "Amenities & Services",
        menuButton: [
          {
            id: 101,
            content: "Decoration & Setup",
            children: [
              {
                subHeading: "Decoration",
                subContent: "Stage Decoration: Flower Stage Decoration",
                icon: "fa-regular fa-lightbulb",
              },
            ],
            count: "1",
            icon: carParking,
            available: "Free",
          },
          {
            id: 102,
            content: "Food & Catering",
            children: [
              {
                subHeading: "Live Stalls",
                subContent:
                  "Sweet & Dessert Live Stalls: Candy Floss / Popcorn",
                icon: "fa-solid fa-utensils",
              },
              {
                subHeading: "Cake",
                subContent: "Birthday Cake: Eggless",
                icon: "fa-solid fa-cake-candles",
              },
            ],
            count: "2",
            icon: bikeParking,
            available: "Free",
          },
          {
            id: 103,
            content: "Photography & Videography",
            children: [
              {
                subHeading: "Video",
                subContent: "Drone Videography: 4K Drone Coverage",
                icon: "fa-regular fa-camera",
              },
              {
                subHeading: "Video",
                subContent: "Cinematic Video: 4k Cinematic Shoot",
                icon: "fa-regular fa-camera",
              },
            ],
            count: "2",
            icon: mike,
            available: "Paid",
          },
          {
            id: 104,
            content: "Entertainment",
            children: [
              {
                subHeading: "Games",
                subContent: "Fun & Carnival Games: Ballon Shooting",
                icon: "fa-regular fa-star",
              },
              {
                subHeading: "Games",
                subContent: "Fun & Carnival Games: Ring Toss",
                icon: "fa-regular fa-star",
              },
              {
                subHeading: "Games",
                subContent: "Fun & Carnival Games: Mini Bowling",
                icon: "fa-regular fa-star",
              },
            ],
            count: "3",
            icon: internet,
            available: "Free",
          },
        ],
      },
    ],
  },
];
