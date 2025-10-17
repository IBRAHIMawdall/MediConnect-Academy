
'use client';

import type { Filter, ViewMode, SortOption } from '@/app/courses/types';
import { Input } from '@/components/ui/input';
import { categories, CourseCategory } from '@/lib/data';
import { Search, ChevronDown, LayoutGrid, List, Filter as FilterIcon, X, ArrowUpDown, ArrowUp, ArrowDown, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CourseFiltersProps {
    activeFilter: Filter;
    setActiveFilter: (filter: Filter) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
}

export function CourseFilters({ 
    activeFilter, 
    setActiveFilter, 
    searchTerm, 
    setSearchTerm, 
    viewMode, 
    setViewMode,
    sortOption,
    setSortOption 
}: CourseFiltersProps) {
    
    const getFilterDisplayName = () => {
        if (activeFilter.type === 'all') return 'All Courses';
        if (activeFilter.type === 'main') return activeFilter.id;
        if (activeFilter.type === 'sub') return activeFilter.id;
        return 'All Courses';
    };

    const getSortDisplayName = () => {
        switch (sortOption) {
            case 'name-asc': return 'Name A-Z';
            case 'name-desc': return 'Name Z-A';
            case 'category': return 'Category';
            case 'lessons-desc': return 'Most Lessons';
            case 'lessons-asc': return 'Least Lessons';
            case 'featured': return 'Featured First';
            default: return 'Sort By';
        }
    };

    const clearFilters = () => {
        setActiveFilter({ type: 'all' });
        setSearchTerm('');
    };

    const hasActiveFilters = activeFilter.type !== 'all' || searchTerm.length > 0;

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <FilterIcon className="h-4 w-4" />
                        Filter by:
                    </div>
                    
                    {/* All Categories Button */}
                    <Button
                        variant={activeFilter.type === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveFilter({ type: 'all' })}
                        className="h-9"
                    >
                        All Categories
                    </Button>

                    {/* Main Categories Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                {activeFilter.type === 'main' ? activeFilter.id : 'Main Categories'}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuLabel>Main Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {Object.keys(categories).map((category) => (
                                <DropdownMenuItem
                                    key={category}
                                    onClick={() => setActiveFilter({ type: 'main', id: category as CourseCategory })}
                                    className={cn(
                                        "cursor-pointer",
                                        activeFilter.type === 'main' && activeFilter.id === category && "bg-accent"
                                    )}
                                >
                                    {category}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Sub Categories Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                {activeFilter.type === 'sub' ? activeFilter.id : 'Sub Categories'}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto">
                            <DropdownMenuLabel>Sub Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {Object.entries(categories).map(([mainCategory, subCategories]) => (
                                <div key={mainCategory}>
                                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
                                        {mainCategory}
                                    </DropdownMenuLabel>
                                    {subCategories.map((subCategory) => (
                                        <DropdownMenuItem
                                            key={`${mainCategory}-${subCategory}`}
                                            onClick={() => setActiveFilter({ type: 'sub', id: subCategory })}
                                            className={cn(
                                                "cursor-pointer pl-4",
                                                activeFilter.type === 'sub' && activeFilter.id === subCategory && "bg-accent"
                                            )}
                                        >
                                            {subCategory}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Sort Options Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                {getSortDisplayName()}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setSortOption('name-asc')}
                                className={cn("cursor-pointer", sortOption === 'name-asc' && "bg-accent")}
                            >
                                <ArrowUp className="mr-2 h-4 w-4" />
                                Name A-Z
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSortOption('name-desc')}
                                className={cn("cursor-pointer", sortOption === 'name-desc' && "bg-accent")}
                            >
                                <ArrowDown className="mr-2 h-4 w-4" />
                                Name Z-A
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSortOption('category')}
                                className={cn("cursor-pointer", sortOption === 'category' && "bg-accent")}
                            >
                                <FilterIcon className="mr-2 h-4 w-4" />
                                Category
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSortOption('lessons-desc')}
                                className={cn("cursor-pointer", sortOption === 'lessons-desc' && "bg-accent")}
                            >
                                <ArrowDown className="mr-2 h-4 w-4" />
                                Most Lessons
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSortOption('lessons-asc')}
                                className={cn("cursor-pointer", sortOption === 'lessons-asc' && "bg-accent")}
                            >
                                <ArrowUp className="mr-2 h-4 w-4" />
                                Least Lessons
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSortOption('featured')}
                                className={cn("cursor-pointer", sortOption === 'featured' && "bg-accent")}
                            >
                                <Star className="mr-2 h-4 w-4" />
                                Featured First
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Search and View Controls */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search in All Courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-10 h-9"
                        />
                        {searchTerm && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center border rounded-lg p-1 bg-background">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className="h-7 w-7 p-0"
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Grid View</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className="h-7 w-7 p-0"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>List View</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-200/50 dark:border-blue-800/50">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {activeFilter.type !== 'all' && (
                        <Badge variant="secondary" className="gap-1">
                            {getFilterDisplayName()}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveFilter({ type: 'all' })}
                                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    )}
                    {searchTerm && (
                        <Badge variant="secondary" className="gap-1">
                            Search: "{searchTerm}"
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchTerm('')}
                                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}
