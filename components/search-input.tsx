"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import qs from "query-string";
import { Search } from "lucide-react";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const query: { categoryId?: string; title?: string } = {};
    if (currentCategoryId) query.categoryId = currentCategoryId;
    if (debouncedValue) query.title = debouncedValue;

    console.log("Current Category ID:", currentCategoryId);
    console.log("Debounced Value:", debouncedValue);

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    console.log("Navigating to URL:", url);
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-[9px] left-3 font-bold text-sky-600" />
      <Input
        placeholder="Search for a course"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-3xl bg-slate-100 focus-visible:ring-slate-200"
      />
    </div>
  );
};
