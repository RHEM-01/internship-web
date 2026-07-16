import CompanyCard from "@/components/web/CompanyCard";
import NavBar from "@/components/web/NavBar";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full">
      <Card className="bg-primary w-full p-10 rounded-lg mt-10">
        <CardContent>
          <h1 className="text-3xl text-white">Accelerate Your Internship</h1>
          <p className="text-white/80 max-w-2xl mt-2">
            Explore vetted technical internships from Africa&apos;s leading tech
            ecosystems. High-growth startups and global engineering hubs waiting for
            you.
          </p>
        </CardContent>
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
