"use client";

import { Category } from "@prisma/client";
import {
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
  FcSalesPerformance,
  FcMultipleDevices,
  FcEngineering,
  FcFilmReel,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Engineering: FcEngineering,
  Filming: FcFilmReel,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name as keyof typeof iconMap]}
          value={item.id} // Fix here (use item.id)
        />
      ))}
    </div>
  );
};

export default Categories;
