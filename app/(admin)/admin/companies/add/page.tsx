"use client";

import { useState } from "react";
import { Controller, useForm, useFieldArray, type FieldError as RHFFieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { companySchema, CompanyFormValues } from "@/lib/schema";

import { buttonVariants, Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ImageUploadIcon,
  Link01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";
import AddPosition from "../../../../../components/web/admin/companies/add/AddPosition";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Country, State, City } from "country-state-city";

const MAX_DESCRIPTION_CHARS = 500;

interface LocationComboboxProps {
  label: string;
  field: { name: string; value?: string; onChange: (val: string) => void };
  fieldState: { invalid?: boolean; error?: RHFFieldError };
  options: { key: string; label: string }[];
  placeholder: string;
  searchPlaceholder: string;
  emptyText: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
}

function LocationCombobox({
  label,
  field,
  fieldState,
  options,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled,
  onSelect,
}: LocationComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      </FieldContent>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              id={field.name}
              variant="outline"
              role="combobox"
              disabled={disabled}
              className={cn(
                "w-full justify-between bg-transparent font-normal",
                !field.value && "text-muted-foreground",
                fieldState.invalid &&
                  "border-destructive focus-visible:ring-destructive",
              )}
            />
          }
        >
          {field.value || placeholder}
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
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.key}
                    value={opt.label}
                    data-checked={opt.label === field.value}
                    onSelect={() => {
                      onSelect(opt.label);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

export default function AddNewCompany() {
  const router = useRouter();
  const createCompany = useMutation(api.company.createCompanyWithPositions);
  const industries = useQuery(api.industry.getAll);
  const departments = useQuery(api.department.getAll);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      logoUrl: "",
      name: "",
      industryId: "",
      websiteUrl: "",
      location: {
        country: "",
        state: "",
        localGovernment: "",
        address: "",
      },
      isVerified: false,
      description: "",
      duration: "",
      batchPeriod: "",
      compensation: "",
      certifyChecked: false,
      positions: [],
    },
  });

  const {
    fields: positions,
    append: appendPosition,
    remove: removePosition,
  } = useFieldArray({
    control: form.control,
    name: "positions",
  });

  const countryName = form.watch("location.country");
  const stateName = form.watch("location.state");

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

  async function onSubmit(data: CompanyFormValues) {
    try {
      await createCompany({
        ...data,
        industryId: data.industryId as Id<"industries">,
        positions: data.positions.map((pos) => ({
          ...pos,
          departmentId: pos.departmentId as Id<"departments">,
        })),
      });
      router.push("/dashboard/company");
    } catch (error) {
      console.error("Failed to create company", error);
      toast.error("Failed to create company. Please try again.");
    }
  }

  function getDepartmentName(id: string) {
    return departments?.find((d) => d._id === id)?.name || id;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="px-10 py-5 flex flex-col gap-10 max-w-6xl mx-auto"
    >
      <header className="">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold font-heading">Add a new Company</h1>
        </div>
        <Separator />
      </header>

      {/* ──────────── Section 1: Basic Information ──────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <span
            className={buttonVariants({ size: "icon-lg", variant: "default" })}
          >
            1
          </span>
          <h2 className="text-base font-semibold font-heading">
            Basic Information
          </h2>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="grid grid-cols-[160px_1fr] gap-5">
              {/* Logo Upload */}
              <Controller
                name="logoUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1.5"
                  >
                    <FieldLabel htmlFor={field.name}>Company Logo</FieldLabel>
                    <div className="group relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 transition-colors hover:border-primary/40 hover:bg-muted/60">
                      <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                        <HugeiconsIcon
                          icon={ImageUploadIcon}
                          className="size-8 text-muted-foreground/60"
                        />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          Upload
                        </span>
                      </div>
                    </div>
                    <FieldDescription className="text-[10px]">
                      PNG, SVG up to 2MB
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Name + Industry + Website */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Company Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Nexus Talent Solutions"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="industryId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel htmlFor={field.name}>Industry</FieldLabel>
                        </FieldContent>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                        >
                          <SelectTrigger
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="w-full"
                          >
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries?.map((ind) => (
                              <SelectItem key={ind._id} value={ind._id}>
                                {ind.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="websiteUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Website URL</FieldLabel>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={Link01Icon}
                          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          className="pl-9"
                          placeholder="https://example.com"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="isVerified"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      className="items-start gap-3 mt-2"
                    >
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldContent>
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal cursor-pointer leading-tight"
                        >
                          Verified Company
                        </FieldLabel>
                        <FieldDescription className="text-xs">
                          Check this if the company has been officially vetted.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ──────────── Section 2: Location Details ──────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <span
            className={buttonVariants({ size: "icon-lg", variant: "default" })}
          >
            2
          </span>
          <h2 className="text-base font-semibold font-heading">
            Location Details
          </h2>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="location.country"
                control={form.control}
                render={({ field, fieldState }) => (
                  <LocationCombobox
                    label="Country"
                    field={field}
                    fieldState={fieldState}
                    options={countries.map((c) => ({
                      key: c.isoCode,
                      label: c.name,
                    }))}
                    placeholder="Select country"
                    searchPlaceholder="Search country..."
                    emptyText="No country found."
                    onSelect={(val) => {
                      field.onChange(val);
                      form.setValue("location.state", "");
                      form.setValue("location.localGovernment", "");
                    }}
                  />
                )}
              />

              <Controller
                name="location.state"
                control={form.control}
                render={({ field, fieldState }) => (
                  <LocationCombobox
                    label="State / Province"
                    field={field}
                    fieldState={fieldState}
                    options={states.map((s) => ({
                      key: s.isoCode,
                      label: s.name,
                    }))}
                    placeholder="Select state"
                    searchPlaceholder="Search state..."
                    emptyText="No state found."
                    disabled={!countryCode}
                    onSelect={(val) => {
                      field.onChange(val);
                      form.setValue("location.localGovernment", "");
                    }}
                  />
                )}
              />

              <Controller
                name="location.localGovernment"
                control={form.control}
                render={({ field, fieldState }) => (
                  <LocationCombobox
                    label="Local Government / City"
                    field={field}
                    fieldState={fieldState}
                    options={cities.map((c) => ({
                      key: `${c.name}-${c.latitude ?? ""}-${c.longitude ?? ""}`,
                      label: c.name,
                    }))}
                    placeholder="Select city"
                    searchPlaceholder="Search city..."
                    emptyText="No city found."
                    disabled={!stateCode}
                    onSelect={(val) => {
                      field.onChange(val);
                    }}
                  />
                )}
              />

              <Controller
                name="location.address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. 123 Market St."
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ──────────── Section 3: Program Overview ──────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <span
            className={buttonVariants({ size: "icon-lg", variant: "default" })}
          >
            3
          </span>
          <h2 className="text-base font-semibold font-heading">
            Program Overview
          </h2>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-5">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Internship Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="min-h-30"
                    maxLength={MAX_DESCRIPTION_CHARS}
                    placeholder="Describe your internship program..."
                  />
                  <FieldDescription className="text-right">
                    {field.value.length} / {MAX_DESCRIPTION_CHARS} characters
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <Controller
                name="duration"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Duration</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. 3-6 Months"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="batchPeriod"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Batch Period</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Summer 2024"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="compensation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Compensation</FieldLabel>
                    </FieldContent>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name={field.name}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="stipend">Stipend</SelectItem>
                        <SelectItem value="equity">Equity</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ──────────── Section 4: Open Positions ──────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <span
              className={buttonVariants({
                size: "icon-lg",
                variant: "default",
              })}
            >
              4
            </span>
            <h2 className="text-base font-semibold font-heading">
              Open Positions
            </h2>
          </div>
          <AddPosition onAdd={appendPosition} />
        </div>

        <div className="flex flex-col gap-3">
          {positions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No positions added yet. Click &quot;+ Add Position&quot; to
                  get started.
                </p>
                {form.formState.errors.positions && (
                  <span className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.positions?.message}
                  </span>
                )}
              </CardContent>
            </Card>
          ) : (
            positions.map((position, index) => (
              <Card key={position.id}>
                <CardContent className="flex items-center gap-4 py-1">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-sm font-bold text-primary">
                      {position.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold">
                      {position.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {position.locationType[0]} • {position.employmentType} •{" "}
                      {getDepartmentName(position.departmentId)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removePosition(index)}
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* ──────────── Section 5: Terms & Conditions ──────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <span
            className={buttonVariants({ size: "icon-lg", variant: "default" })}
          >
            5
          </span>
          <h2 className="text-base font-semibold font-heading">
            Terms & Conditions
          </h2>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-5">
            {/* Info notice */}
            <div className="flex items-start gap-3">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="size-5 shrink-0 text-primary mt-0.5"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                By listing this company, you agree to respond to applicants
                within 14 business days. Nexus Talent maintains a strict
                professional standard for all directory listings.
              </p>
            </div>

            {/* Certification checkbox */}
            <Controller
              name="certifyChecked"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="items-start gap-3"
                >
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldContent>
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-normal cursor-pointer leading-tight"
                    >
                      I certify that this internship provides educational value
                      and meets local labor laws.
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </CardContent>
        </Card>
      </section>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 z-10 flex items-center justify-between border-t bg-background px-10 py-4 mt-10 -mx-10 -mb-5">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-muted-foreground">
            All changes auto-cached locally
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Discard Changes
          </Button>
          <Button type="submit">Save Company Profile</Button>
        </div>
      </div>
    </form>
  );
}
