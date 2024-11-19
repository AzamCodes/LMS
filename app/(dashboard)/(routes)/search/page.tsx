import { db } from "@/lib/db";
import Categories from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  // Ensure userId is a string, providing a default value if null
  const safeUserId = userId || ""; // or handle it as needed

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId: safeUserId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:b-0 block">
        <SearchInput />
      </div>

      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
