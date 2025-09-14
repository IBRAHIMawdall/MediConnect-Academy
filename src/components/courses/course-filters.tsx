
'use client';

import type { Filter } from '@/app/courses/page';
import { Input } from '@/components/ui/input';
import { categories, CourseCategory } from '@/lib/data';
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface CourseFiltersProps {
    activeFilter: Filter;
    setActiveFilter: (filter: Filter) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export function CourseFilters({ activeFilter, setActiveFilter, searchTerm, setSearchTerm }: CourseFiltersProps) {
    
    const getFilterDisplayName = () => {
        if (activeFilter.type === 'all') return 'All Courses';
        if (activeFilter.type === 'main') return activeFilter.id;
        if (activeFilter.type === 'sub') return activeFilter.id;
        return 'All Courses';
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-card border shadow-sm">
            <div className="flex items-center gap-2 flex-wrap">
                <Button 
                    variant={activeFilter.type === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter({type: 'all'})}
                >
                    All
                </Button>
                {Object.keys(categories).sort().map((mainCat) => (
                    <DropdownMenu key={mainCat}>
                        <DropdownMenuTrigger asChild>
                             <Button 
                                variant={activeFilter.type === 'main' && activeFilter.id === mainCat ? 'default' : 'outline'}
                                className="flex items-center gap-1"
                            >
                                {mainCat}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => setActiveFilter({type: 'main', id: mainCat as CourseCategory})}>
                                All {mainCat}
                            </DropdownMenuItem>
                             {categories[mainCat as CourseCategory].map((subCat) => (
                                <DropdownMenuItem key={subCat} onClick={() => setActiveFilter({type: 'sub', id: subCat})}>
                                    {subCat}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </div>
             <div className="relative w-full md:w-auto md:min-w-64 ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search in ${getFilterDisplayName()}...`}
                className="w-full pl-10 h-10 text-base"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
        </div>
    );
}
