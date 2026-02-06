import carParking from "@/assets/package images/amenities icons/car_parking.png";
import bikeParking from "@/assets/package images/amenities icons/bike_parking.png";
import mike from "@/assets/package images/amenities icons/mike.png";
import internet from "@/assets/package images/amenities icons/internet.png";
import beverages from "@/assets/package images/menuCategories/beverage.png";
import snacks from "@/assets/package images/menuCategories/snacks.png";
import mainCourse from "@/assets/package images/menuCategories/main_course.png";
import salad from "@/assets/package images/menuCategories/salad.png";
import starters from "@/assets/package images/menuCategories/starters.png";
import desserts from "@/assets/package images/menuCategories/desserts.png";

export const packageInformation = [
  {
    step: "Step 2",
    heading: "Package Details",
    description:
      "Based on your location and event type, restaurants are offering a variety of packages with different cuisine combinations.",
    subHeading:
      "Mega 6-Cuisine Celebration Spread Featuring Indian & Continental",
    cardDescription:
      "Celebrate your special moments with our exclusive 6-cuisine celebration spread, thoughtfully curated to delight every palate. Perfect for weddings, corporate events, birthday parties, and grand gatherings.",
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
        heading: "Menu Categories",
        menuButton: [
          {
            id: 1,
            content: "Beverages",
            icon: beverages,
            items: [
              {
                subHeading: "Main Course items",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: [
                      "Paneer Lababdar",
                      "Paneer Butter Masala",
                      "Kadhai Paneer",
                      "Chilli Paneer with Schezwan Souce",
                    ],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [
                      "Butter Chiken",
                      "Chiken Lababdar",
                      "Chiken in Black Bean Sauce",
                    ],
                  },
                ],
              },
              {
                subHeading: "Rice & Biryani",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Rice (Steam / Jeera)", "Veg Dum Biryani"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: ["Murg Dum Biryani", "Murg Pulao"],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
            ],
            count: "3",
          },
          {
            id: 2,
            content: "Snacks",
            icon: snacks,
            items: [
              {
                subHeading: "Main Course items",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: [
                      "Paneer Lababdar",
                      "Paneer Butter Masala",
                      "Kadhai Paneer",
                      "Chilli Paneer with Schezwan Souce",
                    ],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [
                      "Butter Chiken",
                      "Chiken Lababdar",
                      "Chiken in Black Bean Sauce",
                    ],
                  },
                ],
              },
              {
                subHeading: "Rice & Biryani",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Rice (Steam / Jeera)", "Veg Dum Biryani"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: ["Murg Dum Biryani", "Murg Pulao"],
                  },
                ],
              },
            ],
            count: "2",
          },
          {
            id: 3,
            content: "Main Course",
            icon: mainCourse,
            items: [
              {
                subHeading: "Main Course items",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: [
                      "Paneer Lababdar",
                      "Paneer Butter Masala",
                      "Kadhai Paneer",
                      "Chilli Paneer with Schezwan Souce",
                    ],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [
                      "Butter Chiken",
                      "Chiken Lababdar",
                      "Chiken in Black Bean Sauce",
                    ],
                  },
                ],
              },
              {
                subHeading: "Rice & Biryani",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Rice (Steam / Jeera)", "Veg Dum Biryani"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: ["Murg Dum Biryani", "Murg Pulao"],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
            ],
            count: "6",
          },
          {
            id: 4,
            content: "Salad",
            icon: salad,
            items: [
              {
                subHeading: "Main Course items",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: [
                      "Paneer Lababdar",
                      "Paneer Butter Masala",
                      "Kadhai Paneer",
                      "Chilli Paneer with Schezwan Souce",
                    ],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [
                      "Butter Chiken",
                      "Chiken Lababdar",
                      "Chiken in Black Bean Sauce",
                    ],
                  },
                ],
              },
            ],
            count: "1",
          },
          {
            id: 5,
            content: "Starters",
            icon: starters,
            items: [
              {
                subHeading: "Main Course items",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: [
                      "Paneer Lababdar",
                      "Paneer Butter Masala",
                      "Kadhai Paneer",
                      "Chilli Paneer with Schezwan Souce",
                    ],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [
                      "Butter Chiken",
                      "Chiken Lababdar",
                      "Chiken in Black Bean Sauce",
                    ],
                  },
                ],
              },
              {
                subHeading: "Rice & Biryani",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Rice (Steam / Jeera)", "Veg Dum Biryani"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: ["Murg Dum Biryani", "Murg Pulao"],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
              {
                subHeading: "Breads",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Assorted Indian Breads", "Naan"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [],
                  },
                ],
              },
            ],
            count: "7",
          },
          {
            id: 6,
            content: "Desserts",
            icon: desserts,
            items: [
              {
                subHeading: "Main Course items",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: [
                      "Paneer Lababdar",
                      "Paneer Butter Masala",
                      "Kadhai Paneer",
                      "Chilli Paneer with Schezwan Souce",
                    ],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: [
                      "Butter Chiken",
                      "Chiken Lababdar",
                      "Chiken in Black Bean Sauce",
                    ],
                  },
                ],
              },
              {
                subHeading: "Rice & Biryani",
                foodItems: [
                  {
                    foodCategories: "veg",
                    vegItems: ["Rice (Steam / Jeera)", "Veg Dum Biryani"],
                  },
                  {
                    foodCategories: "non-veg",
                    nonVegItems: ["Murg Dum Biryani", "Murg Pulao"],
                  },
                ],
              },
            ],
            count: "2",
          },
        ],
      },
      {
        id: 2,
        heading: "Amenities & Services",
        menuButton: [
          {
            id: 101,
            content: "4-Wheeler Parking",
            icon: carParking,
            available: "Free",
          },
          {
            id: 102,
            content: "2-Wheeler Parking",
            icon: bikeParking,
            available: "Free",
          },
          {
            id: 103,
            content: "Microphone",
            icon: mike,
            available: "Paid",
          },
          {
            id: 104,
            content: "Internet",
            icon: internet,
            available: "Free",
          },
          {
            id: 105,
            content: "Internet",
            icon: internet,
            available: "Free",
          },
          {
            id: 106,
            content: "Internet",
            icon: internet,
            available: "Free",
          },
          {
            id: 107,
            content: "Internet",
            icon: internet,
            available: "Free",
          },
          {
            id: 108,
            content: "Internet",
            icon: internet,
            available: "Free",
          },
          {
            id: 109,
            content: "Internet",
            icon: internet,
            available: "Free",
          },
        ],
      },
    ],
  },
];
