
import { PageHero } from '@/components/layout/page-hero';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getCourses } from '@/lib/get-courses';
import type { Course } from '@/lib/data';
import { Suspense } from 'react';

// Page-level revalidate can be omitted as we cache at the data layer.

// Client component for filters and rendering list
// eslint-disable-next-line react/display-name
const CoursesClient = async ({ initialCourses }: { initialCourses: Course[] }) => {
  const { default: Client } = await import('./_client');
  return <Client initialCourses={initialCourses} />;
};

export default async function CoursesPage() {
  const pageHeroImage = PlaceHolderImages.find(p => p.id === 'page-courses');
  const courses = await getCourses();

  return (
    <div className="flex-1">
      <PageHero
        title="Course Catalog"
        description="Browse, filter, and search our comprehensive list of medical courses."
        image={pageHeroImage}
      />
      <div className="p-4 md:p-8 space-y-4">
        <Suspense fallback={<div className="flex items-center justify-center py-12">Loading courses...</div>}>
          {/* Hydrate client controls with server-fetched data */}
          <CoursesClient initialCourses={courses} />
        </Suspense>
      </div>
    </div>
  );
}
