import type { CourseCategory } from '@/lib/data';

export type Filter =
  | { type: 'all' }
  | { type: 'main'; id: CourseCategory }
  | { type: 'sub'; id: string };

export type ViewMode = 'grid' | 'list';

export type SortOption = 
  | 'name-asc' 
  | 'name-desc' 
  | 'category' 
  | 'lessons-desc' 
  | 'lessons-asc' 
  | 'featured';