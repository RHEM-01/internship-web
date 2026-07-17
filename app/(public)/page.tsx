import NavBar from "@/components/web/NavBar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CompanyCard from "@/components/web/home/CompanyCard";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full">
      <Card className="bg-primary w-full p-10 rounded-lg mt-10 gap-6">
        <CardContent className="p-0">
          <h1 className="text-3xl text-white font-heading font-bold">Find Your SIWES Placement</h1>
          <p className="text-white/80 max-w-2xl mt-2">
            A directory platform solving the SIWES placement information gap for Nigerian university students. Discover companies that accept interns, what they do, and how to reach them.
          </p>
        </CardContent>
        <CardFooter className="p-0">
          <Link href="/suggest" className={buttonVariants({ variant: "secondary", size: "lg", className: "text-primary whitespace-nowrap shrink-0" })}>
          Suggest a Company
        </Link>
        </CardFooter>
      </Card>
      
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <CompanyCard
          name="Paystack"
          location="Ikeja, Lagos"
          logoUrl=""
          openRolesCount={4}
          rolesLabel="Internships"
          isVerified={false}
          link="/paystack"
        />
        <CompanyCard
          name="Flutterwave"
          location="Ikeja, Lagos"
          logoUrl=""
          openRolesCount={4}
          rolesLabel="Internships"
          isVerified={false}
          link=""
        />
        <CompanyCard
          name="Paystack"
          location="Ikeja, Lagos"
          logoUrl=""
          openRolesCount={4}
          rolesLabel="Internships"
          isVerified={false}
          link=""
        />
        <CompanyCard
          name="Paystack"
          location="Ikeja, Lagos"
          logoUrl=""
          openRolesCount={4}
          rolesLabel="Internships"
          isVerified={false}
          link=""
        />
        <CompanyCard
          name="Paystack"
          location="Ikeja, Lagos"
          logoUrl=""
          openRolesCount={4}
          rolesLabel="Internships"
          isVerified={false}
          link=""
        />
        <CompanyCard
          name="Paystack"
          location="Ikeja, Lagos"
          logoUrl=""
          openRolesCount={4}
          rolesLabel="Internships"
          isVerified={false}
          link=""
        />
      </div>
    </div>
  );
}
