"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CompanyCard from "./CompanyCard";
import { useSearchParams } from "next/navigation";

export default function CompanyList() {
  const searchParams = useSearchParams();
  
  const state = searchParams.get("state") || undefined;
  const localGovernment = searchParams.get("city") || undefined;
  const industryId = searchParams.get("industryId") || undefined;
  const departmentId = searchParams.get("departmentId") || undefined;
  const searchTerm = searchParams.get("q") || undefined;

  const companies = useQuery(api.company.search, {
    state,
    localGovernment,
    industryId,
    departmentId,
    searchTerm,
  });

  if (companies === undefined) {
    return (
      <div className="w-full flex justify-center p-10">
        <p className="text-muted-foreground animate-pulse">Loading companies...</p>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="w-full flex justify-center p-10">
        <p className="text-muted-foreground">No companies found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {companies.map((company) => (
        <CompanyCard
          key={company._id}
          name={company.name}
          location={`${company.location.localGovernment}, ${company.location.state}`}
          logoUrl={company.logoUrl || ""}
          openRolesCount={company.openRolesCount}
          rolesLabel={company.openRolesCount === 1 ? "Internship" : "Internships"}
          isVerified={company.isVerified}
          link={`/${company._id}`}
        />
      ))}
    </div>
  );
}
