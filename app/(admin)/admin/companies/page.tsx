"use client";

import { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
      title="Copy"
    >
      <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={16} />
    </Button>
  );
}

export default function CompaniesPage() {
  const { results: suggestions, status: suggestionsStatus } = usePaginatedQuery(
    api.suggestion.getAll,
    {},
    { initialNumItems: 50 }
  );
  const { results: companies, status: companiesStatus } = usePaginatedQuery(
    api.company.getAll,
    {},
    { initialNumItems: 50 }
  );

  const isSuggestionsLoading = suggestionsStatus === "LoadingFirstPage";
  const isCompaniesLoading = companiesStatus === "LoadingFirstPage";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Companies & Suggestions</h1>

      <div className="flex flex-col gap-10">
        {/* Suggestions Section */}
        <Card className="flex flex-col h-150 shadow-sm">
          <CardHeader>
            <CardTitle>Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {isSuggestionsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            ) : suggestions.length === 0 ? (
              <p className="text-muted-foreground">No suggestions found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Company Contact</TableHead>
                    <TableHead>Personal Contact</TableHead>
                    <TableHead>Website</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((suggestion) => (
                    <TableRow key={suggestion._id}>
                      <TableCell className="font-medium">{suggestion.companyName}</TableCell>
                      <TableCell>
                        {suggestion.location.localGovernment}, {suggestion.location.state}
                      </TableCell>
                      <TableCell>
                        {suggestion.companyPhone ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{suggestion.companyPhone}</span>
                            <CopyButton text={suggestion.companyPhone} />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {suggestion.userPhone ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{suggestion.userPhone}</span>
                            <CopyButton text={suggestion.userPhone} />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {suggestion.websiteUrl ? (
                          <a href={suggestion.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Link
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Companies Section */}
        <Card className="flex flex-col h-150 shadow-sm">
          <CardHeader>
            <CardTitle>Companies</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {isCompaniesLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            ) : companies.length === 0 ? (
              <p className="text-muted-foreground">No companies found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Verified</TableHead>
                    <TableHead className="text-right">Open Roles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company._id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>
                        {company.location.localGovernment}, {company.location.state}
                      </TableCell>
                      <TableCell className="text-center">
                        {company.isVerified ? "✅" : "❌"}
                      </TableCell>
                      <TableCell className="text-right">
                        {company.openRolesCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}