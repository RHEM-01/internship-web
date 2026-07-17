"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import posthog from "posthog-js";
import { suggestionSchema, SuggestionFormValues } from "@/lib/schema";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Megaphone01Icon,
  Shield01Icon,
  UserShield01Icon,
  Building01Icon,
  Globe02Icon,
  Call02Icon,
  ShapesIcon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { Country, State, City } from "country-state-city";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "sonner";

export default function SuggestionPage() {
  const router = useRouter();
  const industries = useQuery(api.industry.getAll);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      companyName: "",
      websiteUrl: "",
      industryId: "",
      location: {
        country: "Nigeria",
        state: "",
        localGovernment: "",
      },
      userPhone: "+234 ",
      companyPhone: "+234 ",
    },
  });

  const countryName = form.watch("location.country");
  const stateName = form.watch("location.state");
  const cityName = form.watch("location.localGovernment");

  const countries = Country.getAllCountries();
  const selectedCountry = countries.find((c) => c.name === countryName);
  const countryCode = selectedCountry?.isoCode;

  const states = countryCode ? State.getStatesOfCountry(countryCode) : [];
  const selectedState = states.find((s) => s.name === stateName);
  const stateCode = selectedState?.isoCode;

  const cities =
    stateCode && countryCode
      ? City.getCitiesOfState(countryCode, stateCode)
      : [];

  const createSuggestion = useMutation(api.suggestion.create);

  async function onSubmit(data: SuggestionFormValues) {
    try {
      await createSuggestion({
        companyName: data.companyName,
        websiteUrl: data.websiteUrl,
        industryId: data.industryId,
        location: data.location,
        userPhone: data.userPhone,
        companyPhone: data.companyPhone,
      });
      posthog.capture("company_suggestion_submitted", {
        has_website_url: Boolean(data.websiteUrl),
        has_user_phone: Boolean(data.userPhone?.trim()),
        has_company_phone: Boolean(data.companyPhone?.trim()),
      });
      toast.success("Suggestion submitted!", {
        description: "Thank you for helping us grow the directory.",
      });
      form.reset();
    } catch (error: any) {
      if (error?.data === "ALREADY_SUGGESTED" || error?.message?.includes("ALREADY_SUGGESTED")) {
        toast.info("Company already suggested", {
          description: "This company has already been suggested and is being verified.",
        });
      } else {
        posthog.capture("company_suggestion_submission_failed");
        posthog.captureException(error);
        console.error("Failed to submit suggestion", error);
        toast.error("Submission failed", {
          description: "Please try again later.",
        });
      }
    }
  }

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <Button 
        variant="ghost" 
        size="lg"
        onClick={() => router.back()} 
        className="mb-8 text-muted-foreground hover:text-foreground -ml-4"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 size-4" />
        Back
      </Button>

      <div className="grid gap-16 lg:grid-cols-[1fr_480px] lg:gap-24 items-start">
        {/* Left Column */}
        <div className="flex flex-col pt-4">
          <div>
            <Badge className="mb-8 rounded-full px-3.5 py-3 text-sm font-medium border-none shadow-none gap-1.5">
              <HugeiconsIcon
                icon={Megaphone01Icon}
                className="size-6"
                strokeWidth={3}
              />
              Community Contribution
            </Badge>
            <h1 className="md:max-w-2xl text-5xl font-medium tracking-tight lg:text-[4rem] lg:leading-[1.1] text-foreground mb-6">
              Help us bridge the gap.{" "}
              <span className="text-blue-600">Suggest a</span>
              <br />
              <span className="text-blue-600">company</span> for our directory.
            </h1>
          </div>

          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-md font-medium mb-12">
            Nexus Talent thrives on community insights. If you know a tech
            company offering exceptional internship opportunities, let us know.
            We prioritize transparency and student success.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="shadow-none border border-border/40">
              <CardContent className="px-6">
                <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-blue-600 p-2 text-white">
                  <HugeiconsIcon icon={Shield01Icon} className="size-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">
                  Manual Verification
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every suggestion undergoes a multi-step check to ensure
                  company legitimacy and internship quality.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none border border-border/40">
              <CardContent className="px-6">
                <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-slate-100 p-2 text-slate-700">
                  <HugeiconsIcon icon={UserShield01Icon} className="size-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">
                  Student Safety
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We prioritize inclusive, safe, and educational environments
                  for all our technical interns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex flex-col items-center w-full lg:sticky lg:top-24">
          <Card className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-3xl">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Company Name */}
              <Controller
                name="companyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-semibold text-sm"
                      >
                        Company Name
                      </FieldLabel>
                      <span className="text-[10px] font-bold text-destructive/80 uppercase tracking-wider">
                        Required
                      </span>
                    </div>
                    <InputGroup
                      className={cn(
                        "rounded-xl h-12",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <InputGroupAddon>
                        <HugeiconsIcon
                          icon={Building01Icon}
                          className="size-5 text-muted-foreground/70"
                        />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        placeholder="e.g. Acme Innovations"
                        className="text-base"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Location fields */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center mb-1.5">
                  <Label className="font-semibold text-sm">Location</Label>
                  <span className="text-[10px] font-bold text-destructive/80 uppercase tracking-wider">
                    Required
                  </span>
                </div>

                {/* Country */}
                <Controller
                  name="location.country"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between bg-transparent font-normal h-12 rounded-xl",
                                !field.value && "text-muted-foreground",
                                fieldState.invalid &&
                                  "border-destructive focus-visible:ring-destructive",
                              )}
                            />
                          }
                        >
                          {field.value || "Select country"}
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className="ml-2 size-4 shrink-0 opacity-50"
                          />
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-(--radix-popover-trigger-width) p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((c) => (
                                  <CommandItem
                                    key={c.isoCode}
                                    value={c.name}
                                    data-checked={c.name === field.value}
                                    onSelect={() => {
                                      field.onChange(c.name);
                                      form.setValue("location.state", "");
                                      form.setValue(
                                        "location.localGovernment",
                                        "",
                                      );
                                    }}
                                  >
                                    {c.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* State */}
                <Controller
                  name="location.state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              disabled={!countryCode}
                              className={cn(
                                "w-full justify-between bg-transparent font-normal h-12 rounded-xl",
                                !field.value && "text-muted-foreground",
                                fieldState.invalid &&
                                  "border-destructive focus-visible:ring-destructive",
                              )}
                            />
                          }
                        >
                          {field.value || "Select state"}
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className="ml-2 size-4 shrink-0 opacity-50"
                          />
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-(--radix-popover-trigger-width) p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Search state..." />
                            <CommandList>
                              <CommandEmpty>No state found.</CommandEmpty>
                              <CommandGroup>
                                {states.map((s) => (
                                  <CommandItem
                                    key={s.isoCode}
                                    value={s.name}
                                    data-checked={s.name === field.value}
                                    onSelect={() => {
                                      field.onChange(s.name);
                                      form.setValue(
                                        "location.localGovernment",
                                        "",
                                      );
                                    }}
                                  >
                                    {s.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* City */}
                <Controller
                  name="location.localGovernment"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              disabled={!stateCode}
                              className={cn(
                                "w-full justify-between bg-transparent font-normal h-12 rounded-xl",
                                !field.value && "text-muted-foreground",
                                fieldState.invalid &&
                                  "border-destructive focus-visible:ring-destructive",
                              )}
                            />
                          }
                        >
                          {field.value || "Select city"}
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className="ml-2 size-4 shrink-0 opacity-50"
                          />
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-(--radix-popover-trigger-width) p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {cities.map((c) => (
                                  <CommandItem
                                    key={c.name}
                                    value={c.name}
                                    data-checked={c.name === field.value}
                                    onSelect={() => {
                                      field.onChange(c.name);
                                    }}
                                  >
                                    {c.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Industry */}
              <Controller
                name="industryId"
                control={form.control}
                render={({ field, fieldState }) => {
                  const selectedIndustry = industries?.find(
                    (ind) => ind._id === field.value,
                  );
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex justify-between items-center mb-1.5">
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-semibold text-sm"
                        >
                          Industry
                        </FieldLabel>
                        <span className="text-[10px] font-bold text-destructive/80 uppercase tracking-wider">
                          Required
                        </span>
                      </div>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between bg-transparent font-normal h-12 rounded-xl",
                                !field.value && "text-muted-foreground",
                                fieldState.invalid &&
                                  "border-destructive focus-visible:ring-destructive",
                              )}
                            />
                          }
                        >
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={ShapesIcon}
                              className="size-5 text-muted-foreground/70"
                            />
                            {selectedIndustry
                              ? selectedIndustry.name
                              : "Select an industry"}
                          </div>
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className="ml-2 size-4 shrink-0 opacity-50"
                          />
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-(--radix-popover-trigger-width) p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Search industry..." />
                            <CommandList>
                              <CommandEmpty>No industry found.</CommandEmpty>
                              <CommandGroup>
                                {industries?.map((ind) => (
                                  <CommandItem
                                    key={ind._id}
                                    value={ind.name}
                                    data-checked={ind._id === field.value}
                                    onSelect={() => {
                                      field.onChange(ind._id);
                                    }}
                                  >
                                    {ind.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Website URL */}
              <Controller
                name="websiteUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-semibold text-sm"
                      >
                        Website URL
                      </FieldLabel>
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                        Optional
                      </span>
                    </div>
                    <InputGroup
                      className={cn(
                        "rounded-xl h-12",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <InputGroupAddon>
                        <HugeiconsIcon
                          icon={Globe02Icon}
                          className="size-5 text-muted-foreground/70"
                        />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        type="url"
                        placeholder="https://company.com"
                        className="text-base"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Your Phone Number */}
              <Controller
                name="userPhone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-semibold text-sm"
                      >
                        Your Phone Number
                      </FieldLabel>
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                        Optional
                      </span>
                    </div>
                    <InputGroup
                      className={cn(
                        "rounded-xl h-12",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <InputGroupAddon>
                        <HugeiconsIcon
                          icon={Call02Icon}
                          className="size-5 text-muted-foreground/70"
                        />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder="+234 800 000 0000"
                        className="text-base"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Company Contact Number */}
              <Controller
                name="companyPhone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="font-semibold text-sm"
                      >
                        Company Contact Number
                      </FieldLabel>
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                        Optional
                      </span>
                    </div>
                    <InputGroup
                      className={cn(
                        "rounded-xl h-12",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <InputGroupAddon>
                        <HugeiconsIcon
                          icon={Building01Icon}
                          className="size-5 text-muted-foreground/70"
                        />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        type="tel"
                        placeholder="+234 800 000 0000"
                        className="text-base"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4 h-14 text-[15px] font-medium rounded-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {form.formState.isSubmitting ? (
                  <>
                    Submitting...
                    <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  </>
                ) : (
                  <>
                    Submit Suggestion{" "}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="ml-1 size-5"
                    />
                  </>
                )}
              </Button>
            </form>
          </Card>

          <p className="mt-8 text-[13px] text-muted-foreground text-center font-medium">
            By submitting, you agree to our{" "}
            <Link href="#" className="text-blue-700 hover:underline">
              Community Guidelines
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
