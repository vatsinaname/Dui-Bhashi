import { getUserProgress, getUserActiveCoursePoints, getUserActiveCoursesWithHearts } from "../../../db/queries";
import { redirect } from "next/navigation";
import { ShopClient } from "./_components/shop-client";

const ShopPage = async () => {
  const activeCoursesWithHeartsPromise = getUserActiveCoursesWithHearts();
  const [activeCoursesWithHearts] = await Promise.all([
    activeCoursesWithHeartsPromise
  ]);

  if (!activeCoursesWithHearts.length) {
    redirect("/courses");
  }

  return (
    <ShopClient
      activeCoursesWithHearts={activeCoursesWithHearts}
    />
  );
};

export default ShopPage;
