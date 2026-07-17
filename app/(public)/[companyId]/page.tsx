import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/web/NavBar";
import {
    ArrowLeft02Icon,
    Share08Icon,
    Clock01Icon,
    Calendar01Icon,
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

interface CompanyProp {
    params: Promise<{
        companyId: string;
    }>;
}

export default async function CompanyDetails({ params }: CompanyProp) {
    const { companyId } = await params;

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
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-8 flex flex-col gap-6">
                        {/* Job Header Card */}
                        <Card>
                            <CardContent className="flex items-start gap-5">
                                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                                    {/* Replace logoUrl with actual data when available */}
                                    <span className="text-3xl font-bold text-primary">
                                        {companyId.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-primary/10 text-primary border-0">Engineering</Badge>
                                        <Badge className="bg-primary/10 text-primary border-0">Internship</Badge>
                                    </div>
                                    <h1 className="text-2xl font-bold font-heading">Frontend Engineering Intern</h1>
                                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <HugeiconsIcon icon={Building02Icon} className="size-4" />
                                            <span className="font-medium">Paystack</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <HugeiconsIcon icon={Location01Icon} className="size-4" />
                                            <span>Ikeja, Lagos (Remote Friendly)</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About the Role */}
                        <Card>
                            <CardContent>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-5 text-primary" />
                                    <h2 className="text-lg font-bold font-heading">About the Role</h2>
                                </div>
                                <div className="text-muted-foreground leading-relaxed space-y-4">
                                    <p>
                                        Paystack is looking for curious and driven Frontend Engineering Interns to join our core product
                                        team. You will help us build the next generation of financial tools for the African continent,
                                        working alongside world-class engineers who value precision and technical excellence.
                                    </p>
                                    <p>
                                        In this role, you&apos;ll be responsible for implementing beautiful, responsive user interfaces,
                                        optimizing performance for low-bandwidth environments, and collaborating with designers to turn
                                        Figma mockups into production-ready React components.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        <Card>
                            <CardContent>
                                <div className="flex items-center gap-2.5 mb-5">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5 text-primary" />
                                    <h2 className="text-lg font-bold font-heading">Requirements</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl border p-4 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-primary" />
                                            <h3 className="font-semibold text-sm">Technical Foundation</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Proficiency in HTML, CSS, and modern JavaScript (ES6+).
                                        </p>
                                    </div>
                                    <div className="rounded-xl border p-4 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-primary" />
                                            <h3 className="font-semibold text-sm">Framework Knowledge</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Experience with React.js or Vue.js via personal projects.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border p-4 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-primary" />
                                            <h3 className="font-semibold text-sm">Design Sensitivity</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Strong eye for UI details and ability to translate designs accurately.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border p-4 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-primary" />
                                            <h3 className="font-semibold text-sm">Collaboration</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Good communication skills and eagerness to work in a team.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* How to Apply */}
                        <Card>
                            <CardContent>
                                <div className="flex gap-4">
                                    <div className="w-1 rounded-full bg-primary shrink-0" />
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-bold font-heading">How to Apply</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Please prepare your CV and a link to your GitHub profile or personal portfolio.
                                            We&apos;re interested in seeing actual code you&apos;ve written.
                                        </p>
                                        <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                                            <li>Click the &apos;Apply Now&apos; button to open the application portal.</li>
                                            <li>Complete the technical assessment questionnaire.</li>
                                            <li>Upload your CV and supporting links.</li>
                                            <li>Initial screening calls begin on Sept 15, 2023.</li>
                                        </ol>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="col-span-4 flex flex-col gap-6">
                        {/* Position Details */}
                        <Card>
                            <CardContent className="space-y-5">
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
                                            <p className="font-semibold text-sm">6 Months (Fixed)</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <HugeiconsIcon icon={Coins01Icon} className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Stipend</p>
                                            <p className="font-semibold text-sm">₦150,000 / month</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <HugeiconsIcon icon={Calendar01Icon} className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Deadline</p>
                                            <p className="font-semibold text-sm text-primary">August 30, 2023</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <HugeiconsIcon icon={Briefcase01Icon} className="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Experience Level</p>
                                            <p className="font-semibold text-sm">Junior / Entry Level</p>
                                        </div>
                                    </div>
                                </div>

                                <ApplyButton companyId={companyId} />

                                <p className="text-xs text-muted-foreground text-center">24 applicants so far</p>
                            </CardContent>
                        </Card>

                        {/* Life at Company */}
                        <Card className="bg-primary text-primary-foreground ring-0">
                            <CardContent className="space-y-3">
                                <h3 className="text-lg font-bold font-heading">Life at Paystack</h3>
                                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                                    Join a high-performance team that values autonomy and craft.
                                </p>
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground underline underline-offset-4"
                                >
                                    Explore Culture →
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}