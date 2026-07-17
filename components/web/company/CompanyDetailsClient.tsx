"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/web/NavBar";
import {
    ArrowLeft02Icon,
    Share08Icon,
    Clock01Icon,
    Briefcase01Icon,
    InformationCircleIcon,
    CheckmarkCircle02Icon,
    Building02Icon,
    Location01Icon,
    Coins01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import ApplyButton from "@/components/web/company/ApplyButton";

interface CompanyDetailsClientProps {
    companyId: string;
}

export default function CompanyDetailsClient({ companyId }: CompanyDetailsClientProps) {
    const company = useQuery(api.company.getById, { id: companyId as Id<"companies"> });

    if (company === undefined) {
        return (
            <div className="w-full pb-10 flex flex-col items-center">
                <NavBar className="mt-2" />
                <div className="mt-20">
                    <p className="animate-pulse text-muted-foreground">Loading details...</p>
                </div>
            </div>
        );
    }

    if (company === null) {
        return (
            <div className="w-full pb-10 flex flex-col items-center">
                <NavBar className="mt-2" />
                <div className="mt-20">
                    <h1 className="text-2xl font-bold">Company not found</h1>
                    <Link href="/" className={buttonVariants({ variant: "link", className: "mt-4" })}>Go back home</Link>
                </div>
            </div>
        );
    }

    const firstPosition = company.positions?.[0];

    return (
        <div className="w-full pb-10">
            <NavBar className="mt-2" />

            <div className="flex flex-col gap-4">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between py-5">
                    <Link href="/" className={buttonVariants({ size: "lg", variant: "ghost" })}>
                        <HugeiconsIcon icon={ArrowLeft02Icon} />
                        Back
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="outline" size="lg">
                            <HugeiconsIcon icon={Share08Icon} />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
                        {/* Job Header Card */}
                        <Card>
                            <CardContent className="flex items-start gap-5 p-6">
                                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                                    {company.logoUrl ? (
                                        <img src={company.logoUrl} alt={`${company.name} logo`} className="object-contain w-full h-full p-2" />
                                    ) : (
                                        <span className="text-3xl font-bold text-primary">
                                            {company.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-primary/10 text-primary border-0">
                                            {company.isVerified ? "Verified" : "Unverified"}
                                        </Badge>
                                        {firstPosition && (
                                            <Badge className="bg-primary/10 text-primary border-0">{firstPosition.employmentType || "Internship"}</Badge>
                                        )}
                                    </div>
                                    <h1 className="text-2xl font-bold font-heading">{firstPosition?.title || "Internship Program"}</h1>
                                    <div className="flex items-center gap-4 text-muted-foreground text-sm flex-wrap">
                                        <div className="flex items-center gap-1.5">
                                            <HugeiconsIcon icon={Building02Icon} className="size-4" />
                                            <span className="font-medium">{company.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <HugeiconsIcon icon={Location01Icon} className="size-4" />
                                            <span>{`${company.location.address ? company.location.address + ', ' : ''}${company.location.localGovernment}, ${company.location.state}`}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About the Company/Role */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-5 text-primary" />
                                    <h2 className="text-lg font-bold font-heading">About the Role</h2>
                                </div>
                                <div className="text-muted-foreground leading-relaxed space-y-4 whitespace-pre-wrap">
                                    {company.description || "No description provided."}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        {firstPosition && firstPosition.requirements && firstPosition.requirements.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5 text-primary" />
                                        <h2 className="text-lg font-bold font-heading">Requirements</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {firstPosition.requirements.map((req, idx) => (
                                            <div key={idx} className="rounded-xl border p-4 space-y-1.5">
                                                <div className="flex items-start gap-2">
                                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-primary mt-0.5 shrink-0" />
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {req}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                        {/* Position Details */}
                        <Card>
                            <CardContent className="space-y-5 p-6">
                                <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    Position Details
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <HugeiconsIcon icon={Clock01Icon} className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Duration</p>
                                            <p className="font-semibold text-sm">
                                                {firstPosition?.durationValue && firstPosition?.durationUnit 
                                                    ? `${firstPosition.durationValue} ${firstPosition.durationUnit}` 
                                                    : company.duration || "Not specified"}
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <HugeiconsIcon icon={Coins01Icon} className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Stipend / Compensation</p>
                                            <p className="font-semibold text-sm">
                                                {firstPosition?.stipend 
                                                    ? `${firstPosition.currency || ''}${firstPosition.stipend} / month` 
                                                    : company.compensation || "Not specified"}
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <HugeiconsIcon icon={Briefcase01Icon} className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Experience Level</p>
                                            <p className="font-semibold text-sm">Entry Level / Internship</p>
                                        </div>
                                    </div>
                                </div>

                                <ApplyButton companyId={company._id} />

                            </CardContent>
                        </Card>

                        {/* Life at Company */}
                        <Card className="bg-primary text-primary-foreground ring-0">
                            <CardContent className="space-y-3 p-6">
                                <h3 className="text-lg font-bold font-heading">About {company.name}</h3>
                                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                                    {company.websiteUrl ? (
                                        <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                                            Visit their website →
                                        </a>
                                    ) : (
                                        "Learn more by applying."
                                    )}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
