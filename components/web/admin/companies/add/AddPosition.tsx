"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { positionSchema, PositionFormValues } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldContent,
} from "@/components/ui/field";
import { useIsMobile } from "@/hooks/use-mobile";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Add01Icon,
    InformationCircleIcon,
    Clock01Icon,
    Calendar01Icon,
    TaskEdit01Icon,
    DragDropVerticalIcon,
    Delete02Icon,
} from "@hugeicons/core-free-icons";

interface AddPositionProps {
    onAdd: (position: PositionFormValues) => void;
}

export default function AddPosition({ onAdd }: AddPositionProps) {
    const isMobile = useIsMobile();
    const swipeDirection = isMobile ? "down" : "right";
    const [open, setOpen] = useState(false);
    const [newRequirement, setNewRequirement] = useState("");

    const departments = useQuery(api.department.getAll);

    const form = useForm<PositionFormValues>({
        resolver: zodResolver(positionSchema),
        defaultValues: {
            title: "",
            departmentId: "",
            employmentType: "",
            durationValue: 6,
            durationUnit: "months",
            locationType: ["remote"],
            currency: "usd",
            stipend: 0,
            daysPerWeek: "5",
            startTime: "09:00",
            endTime: "17:00",
            requirements: [],
        },
    });

    const requirements = form.watch("requirements");

    function handleAddRequirement() {
        const trimmed = newRequirement.trim();
        if (trimmed) {
            form.setValue("requirements", [...requirements, trimmed]);
            setNewRequirement("");
        }
    }

    function handleRemoveRequirement(index: number) {
        form.setValue("requirements", requirements.filter((_, i) => i !== index));
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddRequirement();
        }
    }

    function onSubmit(data: PositionFormValues) {
        onAdd(data);
        form.reset();
        setOpen(false);
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
            <DrawerTrigger render={<Button variant="outline" className="text-primary gap-1" />}>
                <HugeiconsIcon icon={Add01Icon} className="size-4" />
                Add Position
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-lg! w-fit">
                <DrawerHeader className="mb-8">
                    <DrawerTitle className="text-lg font-bold">
                        Add New Position
                    </DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4 pb-2">
                    <form id="position-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
                        {/* ──────────── Section 1: Basic Information ──────────── */}
                        <section className="flex flex-col gap-4">
                            <div className="flex gap-2.5 items-center">
                                <HugeiconsIcon
                                    icon={InformationCircleIcon}
                                    className="size-5 text-primary"
                                />
                                <h3 className="text-base font-semibold font-heading">
                                    Basic Information
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Controller
                                    name="title"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Position Title</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="e.g. Junior Backend Engineer Intern"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="departmentId"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldContent>
                                                    <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                                                </FieldContent>
                                                <Select
                                                    name={field.name}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        className="w-full"
                                                    >
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {departments?.map((dep) => (
                                                            <SelectItem key={dep._id} value={dep._id}>
                                                                {dep.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="employmentType"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldContent>
                                                    <FieldLabel htmlFor={field.name}>Employment Type</FieldLabel>
                                                </FieldContent>
                                                <Select
                                                    name={field.name}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        className="w-full"
                                                    >
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="internship">Internship</SelectItem>
                                                        <SelectItem value="part-time">Part-time</SelectItem>
                                                        <SelectItem value="full-time">Full-time</SelectItem>
                                                        <SelectItem value="contract">Contract</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ──────────── Section 2: Logistics & Compensation ──────────── */}
                        <section className="flex flex-col gap-4">
                            <div className="flex gap-2.5 items-center">
                                <HugeiconsIcon
                                    icon={Clock01Icon}
                                    className="size-5 text-primary"
                                />
                                <h3 className="text-base font-semibold font-heading">
                                    Logistics & Compensation
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <Label className="text-xs text-muted-foreground">Duration</Label>
                                        <div className="flex gap-2">
                                            <Controller
                                                name="durationValue"
                                                control={form.control}
                                                render={({ field, fieldState }) => (
                                                    <Field className="w-full" data-invalid={fieldState.invalid}>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            className="text-center"
                                                            {...field}
                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                            aria-invalid={fieldState.invalid}
                                                        />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )}
                                            />
                                            <Controller
                                                name="durationUnit"
                                                control={form.control}
                                                render={({ field, fieldState }) => (
                                                    <Field className="w-full" data-invalid={fieldState.invalid}>
                                                        <Select
                                                            name={field.name}
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                                                                <SelectValue placeholder="Unit" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="weeks">Weeks</SelectItem>
                                                                <SelectItem value="months">Months</SelectItem>
                                                                <SelectItem value="years">Years</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <Controller
                                        name="locationType"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Location Type</FieldLabel>
                                                <ToggleGroup
                                                    id={field.name}
                                                    variant="outline"
                                                    multiple
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        if (val.length > 0) {
                                                            const newValue = val.filter((v) => !field.value.includes(v));
                                                            field.onChange(newValue.length > 0 ? newValue : val.slice(-1));
                                                        }
                                                    }}
                                                    className="w-full"
                                                >
                                                    <ToggleGroupItem value="remote" className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary">Remote</ToggleGroupItem>
                                                    <ToggleGroupItem value="hybrid" className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary">Hybrid</ToggleGroupItem>
                                                    <ToggleGroupItem value="onsite" className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary">On-site</ToggleGroupItem>
                                                </ToggleGroup>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-[140px_1fr] gap-4">
                                    <Controller
                                        name="currency"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldContent>
                                                    <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                                                </FieldContent>
                                                <Select
                                                    name={field.name}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        className="w-full"
                                                    >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ngn">NGN (₦)</SelectItem>
                                                        <SelectItem value="usd">USD ($)</SelectItem>
                                                        <SelectItem value="eur">EUR (€)</SelectItem>
                                                        <SelectItem value="gbp">GBP (£)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="stipend"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Stipend Amount (Monthly)</FieldLabel>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="150000"
                                                    min={0}
                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ──────────── Section 3: Working Hours ──────────── */}
                        <section className="flex flex-col gap-4">
                            <div className="flex gap-2.5 items-center">
                                <HugeiconsIcon
                                    icon={Calendar01Icon}
                                    className="size-5 text-primary"
                                />
                                <h3 className="text-base font-semibold font-heading">
                                    Working Hours
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Controller
                                    name="daysPerWeek"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldContent>
                                                <FieldLabel htmlFor={field.name}>Days per Week</FieldLabel>
                                            </FieldContent>
                                            <Select
                                                name={field.name}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select days" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 day / week</SelectItem>
                                                    <SelectItem value="2">2 days / week</SelectItem>
                                                    <SelectItem value="3">3 days / week</SelectItem>
                                                    <SelectItem value="4">4 days / week</SelectItem>
                                                    <SelectItem value="5">5 days / week</SelectItem>
                                                    <SelectItem value="6">6 days / week</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="startTime"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                                                <Input
                                                    {...field}
                                                    type="time"
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="endTime"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                                                <Input
                                                    {...field}
                                                    type="time"
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ──────────── Section 4: Candidate Requirements ──────────── */}
                        <section className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2.5 items-center">
                                    <HugeiconsIcon
                                        icon={TaskEdit01Icon}
                                        className="size-5 text-primary"
                                    />
                                    <h3 className="text-base font-semibold font-heading">
                                        Candidate Requirements
                                    </h3>
                                </div>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="text-primary gap-1 text-xs"
                                    onClick={() => document.getElementById("req-input")?.focus()}
                                >
                                    <HugeiconsIcon
                                        icon={Add01Icon}
                                        className="size-3.5"
                                    />
                                    Add Rule
                                </Button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {requirements.map((req, index) => (
                                    <Card key={index}>
                                        <CardContent className="flex items-center gap-3 py-1">
                                            <HugeiconsIcon
                                                icon={DragDropVerticalIcon}
                                                className="size-4 shrink-0 text-muted-foreground/50 cursor-grab"
                                            />
                                            <span className="flex-1 text-sm">
                                                {req}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-xs"
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => handleRemoveRequirement(index)}
                                            >
                                                <HugeiconsIcon
                                                    icon={Delete02Icon}
                                                    className="size-3.5"
                                                />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}

                                <Card>
                                    <CardContent className="flex items-center gap-3 py-1">
                                        <HugeiconsIcon
                                            icon={DragDropVerticalIcon}
                                            className="size-4 shrink-0 text-muted-foreground/50"
                                        />
                                        <input
                                            id="req-input"
                                            type="text"
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                            placeholder="Add new requirement..."
                                            value={newRequirement}
                                            onChange={(e) => setNewRequirement(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            className="text-muted-foreground hover:text-primary"
                                            onClick={handleAddRequirement}
                                        >
                                            <HugeiconsIcon
                                                icon={Add01Icon}
                                                className="size-3.5"
                                            />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </form>
                </div>

                <DrawerFooter className="flex-row gap-3">
                    <DrawerClose render={<Button variant="outline" className="flex-1" />}>
                        Cancel
                    </DrawerClose>
                    <Button type="submit" form="position-form" className="flex-1">
                        Add Position
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
