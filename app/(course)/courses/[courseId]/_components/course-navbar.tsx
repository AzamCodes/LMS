import { NavbarRoutes } from "@/components/navbar-routes";
import { Course, UserProgress } from "@prisma/client";
import CouseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: Chapter & {
      userProgress: UserProgress[] | null;
    };
  };
  progressCount: null;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CouseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
