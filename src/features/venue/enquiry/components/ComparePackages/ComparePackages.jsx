import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import AddPackageModal from "../../components/shared/AddPackagemodal";

const ComparePackages = () => {
  const menuData = [
    {
      title: "Beverages",
      required: "Required: 2",
      sections: [
        {
          title: "Welcome Drinks",
          required: "Required: 1",
          subSections: [
            {
              label: "Soft",
              required: "Required: 1",
              items: [
                { name: "Fizz", type: "veg" },
                { name: "Sprite", type: "veg" },
              ],
            },
          ],
        },
        {
          title: "Rum",
          required: "Required: 1",
          subSections: [
            {
              label: "Alcoholic",
              required: "Required: 1",
              items: [{ name: "Old Monk Rum", type: "nonveg" }],
            },
          ],
        },
      ],
    },

    {
      title: "Starters",
      required: "Required: 3",
      sections: [
        {
          title: "Vegetarian",
          required: "Required: 1",
          subSections: [
            {
              label: "",
              required: "",
              items: [
                { name: "Veg Spring Rolls", type: "veg" },
                { name: "Soya Malai Chaap", type: "veg" },
                { name: "Veg Manchurian", type: "veg" },
              ],
            },
          ],
        },
        {
          title: "Non-Vegetarian",
          required: "Required: 1",
          subSections: [
            {
              label: "",
              required: "",
              items: [
                { name: "Murg Malai Tikka", type: "nonveg" },
                { name: "Chicken Lollipop", type: "nonveg" },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Main Course",
      required: "Required: 5",
      sections: [
        {
          title: "Rice & Biryani",
          required: "Required: 1",
          subSections: [
            {
              label: "Vegetarian",
              required: "Required: 1",
              items: [
                { name: "Veg Pulao", type: "veg" },
                { name: "Jeera Rice", type: "veg" },
                { name: "Veg Fried Rice", type: "veg" },
              ],
            },
          ],
        },
        {
          title: "Breads",
          required: "Required: 1",
          subSections: [
            {
              label: "",
              required: "",
              items: [{ name: "Missi Roti", type: "veg" }],
            },
          ],
        },
      ],
    },

    {
      title: "Complimentary",
      required: "Required: 1",
      sections: [
        {
          title: "Vegetarian",
          required: "Required: 1",
          subSections: [
            {
              label: "",
              required: "",
              items: [{ name: "Papad", type: "veg" }],
            },
          ],
        },
      ],
    },
  ];
  const [openAddPackageModal, setOpenAddPackageModal] = useState(false);
  return (
    <>
      <div className="border border-gray-300 rounded-3xl w-full overflow-hidden h-120 overflow-y-auto hide-scrollbar">
        <table className="w-full rounded-2xl">
          <TableHeader setOpenAddPackageModal={setOpenAddPackageModal}/>
          <TableBody data={menuData} />
        </table>
      </div>
      {openAddPackageModal ? <AddPackageModal isOpen={openAddPackageModal} onClose={() => setOpenAddPackageModal(false)}/> : null}
    </>
  );
};

export default ComparePackages;
