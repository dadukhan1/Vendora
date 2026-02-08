/** @format */

import React from "react";
import ElectronicCategoryCard from "./ElectronicCategoryCard";

const electronics = [
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "laptops",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Mobile",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "mobiles",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Smartwatch",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "smartwatchs",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Headphone",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "headphones",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Speaker",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "speakers",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Tv",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "television",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Camera",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    categoryId: "speakers",
  },
];

const ElectronicCategory = () => {
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
      {electronics.map((item) => (
        <ElectronicCategoryCard item={item} />
      ))}
    </div>
  );
};

export default ElectronicCategory;
