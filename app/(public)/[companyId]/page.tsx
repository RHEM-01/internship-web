import CompanyDetailsClient from "@/components/web/company/CompanyDetailsClient";

interface CompanyProp {
    params: Promise<{
        companyId: string;
    }>;
}

export default async function CompanyDetails({ params }: CompanyProp) {
    const { companyId } = await params;

    return <CompanyDetailsClient companyId={companyId} />;
}