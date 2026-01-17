import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, RotateCcw, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, type Locale, parse } from "date-fns";
import { lo } from "@/lib/date-fns-lao";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

export interface FilterOption {
  key: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export type DateFilterMode = "none" | "single" | "range";

export interface CustomFilterProps {
  selectors?: FilterOption[];
  onFilterChange?: (filters: Record<string, string>) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  dateFilterMode?: DateFilterMode;
  locale?: Locale;
}

export default function CustomFilter({
  selectors = [],
  onFilterChange,
  showSearch = true,
  searchPlaceholder = "ຄົ້ນຫາ...",
  dateFilterMode = "none",
  locale = lo,
}: CustomFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 1000);

  // Date states
  const [date, setDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Initialize filters from URL search params (Run only on mount)
  useEffect(() => {
    const currentFilters: Record<string, string> = {};
    selectors.forEach((selector) => {
      const value = searchParams.get(selector.key);
      if (value) {
        currentFilters[selector.key] = value;
      }
    });

    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
      currentFilters["search"] = search;
    }

    // Initialize Date
    if (dateFilterMode === "single") {
      const dateParam = searchParams.get("date");
      if (dateParam) {
        try {
          const parsedDate = parse(dateParam, "dd/MM/yyyy", new Date());
          setDate(parsedDate);
          currentFilters["date"] = dateParam;
        } catch (e) {
          console.error("Invalid date format", e);
        }
      }
    } else if (dateFilterMode === "range") {
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      if (startDate && endDate) {
        try {
          const parsedStart = parse(startDate, "dd/MM/yyyy", new Date());
          const parsedEnd = parse(endDate, "dd/MM/yyyy", new Date());
          setDateRange({
            from: parsedStart,
            to: parsedEnd,
          });
          currentFilters["startDate"] = startDate;
          currentFilters["endDate"] = endDate;
        } catch (e) {
          console.error("Invalid date range format", e);
        }
      }
    }

    setFilters(currentFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to handle updates when debounced search term changes
  useEffect(() => {
    if (debouncedSearch === "" && !filters["search"]) return;

    if (filters["search"] !== debouncedSearch) {
      const newFilters = { ...filters };
      if (debouncedSearch === "") {
        delete newFilters["search"];
      } else {
        newFilters["search"] = debouncedSearch;
      }

      setFilters(newFilters);
      updateSearchParams(newFilters);
      if (onFilterChange) onFilterChange(newFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };

    if (value === "all" || value === "") {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    setFilters(newFilters);
    updateSearchParams(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const newFilters = { ...filters };

    if (selectedDate) {
      newFilters["date"] = format(selectedDate, "dd/MM/yyyy");
    } else {
      delete newFilters["date"];
    }

    setFilters(newFilters);
    updateSearchParams(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    const newFilters = { ...filters };

    if (range?.from) {
      newFilters["startDate"] = format(range.from, "dd/MM/yyyy");
    } else {
      delete newFilters["startDate"];
    }

    if (range?.to) {
      newFilters["endDate"] = format(range.to, "dd/MM/yyyy");
    } else {
      delete newFilters["endDate"];
    }

    setFilters(newFilters);
    updateSearchParams(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const newFilters = { ...filters };
    delete newFilters["search"];
    setFilters(newFilters);
    updateSearchParams(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setDate(undefined);
    setDateRange(undefined);
    setFilters({});
    updateSearchParams({});
    if (onFilterChange) onFilterChange({});
  };

  const hasActiveFilters = useMemo(() => {
    if (searchTerm.trim() !== "") return true;
    if (Object.keys(filters).length > 0) return true;
    if (dateFilterMode === "single" && date) return true;
    if (dateFilterMode === "range" && dateRange?.from) return true;
    return false;
  }, [searchTerm, filters, date, dateRange, dateFilterMode]);

  const updateSearchParams = (newFilters: Record<string, string>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      // Clear existing params first to avoid stale data
      selectors.forEach((s) => newParams.delete(s.key));
      newParams.delete("search");
      newParams.delete("date");
      newParams.delete("startDate");
      newParams.delete("endDate");

      // Set new params
      Object.entries(newFilters).forEach(([key, value]) => {
        newParams.set(key, value);
      });

      return newParams;
    });
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      {/* Search Input */}
      {showSearch && (
        <div className="relative w-full md:max-w-xs lg:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder={searchPlaceholder}
            className="h-9 pl-9 pr-8 bg-white w-full text-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Filters Container */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-center flex-1">
        {selectors.map((selector) => (
          <Select
            key={selector.key}
            value={filters[selector.key] || ""}
            onValueChange={(value) => handleFilterChange(selector.key, value)}
          >
            <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] bg-white h-9 text-sm">
              <SelectValue
                placeholder={selector.placeholder || selector.label}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ທັງໝົດ</SelectItem>
              {selector.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {dateFilterMode === "single" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px] justify-start text-left font-normal bg-white h-9 text-sm",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {date
                    ? format(date!, "PPP", { locale: locale })
                    : "ເລືອກວັນທີ່"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                locale={locale}
              />
            </PopoverContent>
          </Popover>
        )}

        {dateFilterMode === "range" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full sm:w-auto sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] justify-start text-left font-normal bg-white h-9 text-sm",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y", {
                          locale: locale,
                        })}{" "}
                        -{" "}
                        {format(dateRange.to, "LLL dd, y", { locale: locale })}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y", { locale: locale })
                    )
                  ) : (
                    "ເລືອກຊ່ວງວັນທີ່"
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                numberOfMonths={2}
                locale={locale}
              />
            </PopoverContent>
          </Popover>
        )}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="w-full sm:w-auto text-zinc-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 gap-1 mt-1 sm:mt-0 px-2 h-8"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="text-xs font-medium">ລ້າງການກັ່ນຕອງ</span>
          </Button>
        )}
      </div>
    </div>
  );
}
