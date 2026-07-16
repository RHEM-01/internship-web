import Image from "next/image";
import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon, CheckmarkBadge01Icon, ArrowRight02Icon, BadgeMinusIcon } from '@hugeicons/core-free-icons';
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CompanyCardProps {
  name: string;
  location: string;
  logoUrl: string;
  openRolesCount: number;
  rolesLabel: string;
  isVerified: boolean;
  link: string;
}

export default function CompanyCard({
  name,
  location,
  logoUrl,
  openRolesCount,
  rolesLabel,
  isVerified,
  link
}: CompanyCardProps) {
  return (
    <Link href={link}>
      <Card>
        <CardContent className="px-6">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
              {logoUrl ? (
                  <Image src={logoUrl} alt={`${name} logo`} fill className="object-contain p-2" />
              ) : (
                  <span className="text-2xl font-bold text-[#003BCC]">{name.charAt(0)}</span>
              )}
            </div>
            
            {isVerified ? (
              <Badge variant="secondary">
                <HugeiconsIcon icon={CheckmarkBadge01Icon} className="w-4 h-4" />
                VERIFIED
              </Badge>
            ) : (
              <Badge variant="destructive">
                <HugeiconsIcon icon={BadgeMinusIcon} className="w-4 h-4" />
                UN-VERIFIED
              </Badge>
            )}
          </div>

          <div className="mt-5">
            <h3 className="text-xl font-bold ">{name}</h3>
            <div className="flex items-center text-muted-foreground mt-1.5 gap-1.5">
              <HugeiconsIcon icon={Location01Icon} className="w-4 h-4" />
              <span className="text-sm font-medium">{location}</span>
            </div>
          </div>

          <CardFooter className="p-0 pt-4 mt-5 border-t">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-gray-500 font-medium">Open Roles</p>
                <p className="text-[#003BCC] font-semibold text-base">
                  {openRolesCount < 10 ? `0${openRolesCount}` : openRolesCount} {rolesLabel}
                </p>
              </div>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-primary/60 border-2 text-primary hover:text-primary">
                <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2.5} className="size-7" />
              </Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  )
}