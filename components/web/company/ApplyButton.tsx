"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";

interface ApplyButtonProps {
  companyId: string;
}

export default function ApplyButton({ companyId }: ApplyButtonProps) {
  return (
    <Button
      className="w-full"
      size="lg"
      onClick={() =>
        posthog.capture("internship_application_started", {
          company_id: companyId,
          internship_type: "internship",
        })
      }
    >
      Apply Now
      <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
    </Button>
  );
}
