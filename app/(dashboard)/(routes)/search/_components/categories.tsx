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
  Music: FcMusic as IconType,
  Photography: FcOldTimeCamera as IconType,
  Fitness: FcSportsMode as IconType,
  Accounting: FcSalesPerformance as IconType,
  "Computer Science": FcMultipleDevices as IconType,
  Engineering: FcEngineering as IconType,
  Filming: FcFilmReel as IconType,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={Number(item.id)}
        />
      ))}
    </div>
  );
};

export default Categories;
