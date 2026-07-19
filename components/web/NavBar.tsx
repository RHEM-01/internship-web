"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { HugeiconsIcon } from '@hugeicons/react';
import { FilterHorizontalIcon, Search02Icon } from '@hugeicons/core-free-icons';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { State, City } from "country-state-city";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

export default function NavBar({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial state from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get("industryId") || "");
  const [selectedDepartment, setSelectedDepartment] = useState(searchParams.get("departmentId") || "");

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
    setSelectedState(searchParams.get("state") || "");
    setSelectedCity(searchParams.get("city") || "");
    setSelectedIndustry(searchParams.get("industryId") || "");
    setSelectedDepartment(searchParams.get("departmentId") || "");
  }, [searchParams]);
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const industries = useQuery(api.industry.getAll);
  const departments = useQuery(api.department.getAll);

  // Hardcode Nigeria for states
  const states = State.getStatesOfCountry("NG");
  const stateCode = states.find(s => s.name === selectedState)?.isoCode;
  const cities = stateCode ? City.getCitiesOfState("NG", stateCode) : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedState) params.set("state", selectedState);
    if (selectedCity) params.set("city", selectedCity);
    if (selectedIndustry) params.set("industryId", selectedIndustry);
    if (selectedDepartment) params.set("departmentId", selectedDepartment);

    router.push(`/?${params.toString()}`);
    setIsPopoverOpen(false);
  };

  const clearFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedIndustry("");
    setSelectedDepartment("");
    setSearchTerm("");
    router.push("/");
    setIsPopoverOpen(false);
  };

  return (
    <header className={cn("sticky top-2 z-50 bg-card shadow-md shadow-blue-600/15 backdrop-blur-md flex flex-col md:flex-row items-center justify-between px-6 py-3 w-full rounded-lg gap-4", className)}>
      {/* Top Row: Logo & Brand */}
      <div className="flex items-center justify-center gap-1 self-start md:self-auto w-full md:w-auto">
        <Image
          src="/InterShip-logo.png"
          width={32}
          height={32}
          alt="Logo"
        />
        <span className="text-[#003BCC] text-xl font-bold tracking-tight">
          SIWES Hub
        </span>
      </div>

      {/* Search and Filters (Second row on mobile) */}
      <div className="flex items-center gap-2.5 w-full md:max-w-2xl md:ml-8 order-last md:order-0">
        <div className="relative flex-1">
          <HugeiconsIcon icon={Search02Icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search internships, companies, or roles..."
            className="w-full pl-10 pr-4 py-2 rounded-lg text-md placeholder:text-muted-foreground bg-input/50"
          />
        </div>
        
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger render={
            <Button variant="outline" size="icon-lg" className="rounded-lg shrink-0" aria-label="Filter directory">
              <HugeiconsIcon icon={FilterHorizontalIcon} className="w-5 h-5" />
            </Button>
          }>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filters</h4>
                <p className="text-sm text-muted-foreground">
                  Refine the placement directory.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* State */}
                <Combobox
                  value={selectedState}
                  onValueChange={(val) => {
                    setSelectedState(val || "");
                    setSelectedCity("");
                  }}
                  items={states}
                >
                  <ComboboxInput
                    placeholder="Select State..."
                    className="w-full h-10 rounded-lg text-sm bg-transparent"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No state found.</ComboboxEmpty>
                    <ComboboxList>
                      {s => (
                        <ComboboxItem key={s.isoCode} value={s.name}>
                          {s.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>

                {/* City */}
                <Combobox
                  value={selectedCity}
                  onValueChange={(val) => setSelectedCity(val || "")}
                  items={cities}
                >
                  <ComboboxInput
                    placeholder="Select City..."
                    disabled={!selectedState}
                    className="w-full h-10 rounded-lg text-sm bg-transparent"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No city found.</ComboboxEmpty>
                    <ComboboxList>
                      {c => (
                        <ComboboxItem key={c.name} value={c.name}>
                          {c.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>

                {/* Industry */}
                <Combobox
                  value={industries?.find(i => i._id === selectedIndustry) || null}
                  onValueChange={(val) => setSelectedIndustry(val?._id || "")}
                  itemToStringLabel={(item) => item ? item.name : ""}
                  items={industries || []}
                >
                  <ComboboxInput
                    placeholder="Select Industry..."
                    className="w-full h-10 rounded-lg text-sm bg-transparent"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No industry found.</ComboboxEmpty>
                    <ComboboxList>
                      {ind => (
                        <ComboboxItem key={ind._id} value={ind}>
                          {ind.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>

                {/* Department */}
                <Combobox
                  value={departments?.find(d => d._id === selectedDepartment) || null}
                  onValueChange={(val) => setSelectedDepartment(val?._id || "")}
                  itemToStringLabel={(item) => item ? item.name : ""}
                  items={departments || []}
                >
                  <ComboboxInput
                    placeholder="Select Department..."
                    className="w-full h-10 rounded-lg text-sm bg-transparent"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No department found.</ComboboxEmpty>
                    <ComboboxList>
                      {dept => (
                        <ComboboxItem key={dept._id} value={dept.name}>
                          {dept.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="flex gap-2 w-full mt-2">
                <Button variant="outline" className="w-1/2" onClick={clearFilters}>
                  Clear
                </Button>
                <Button className="w-1/2" onClick={applyFilters}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}