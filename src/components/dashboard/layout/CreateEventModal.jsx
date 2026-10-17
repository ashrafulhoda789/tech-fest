"use client";

import { useState } from "react";
import {
    X,
    CalendarDays,
    MapPin,
    ImagePlus,
    FileText,
    Link2,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { createEvent } from "@/lib/action/events";

function createSlug(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function FieldLabel({ children, required }) {
    return (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            {children}
            {required && <span className="ml-1 text-amber-700 dark:text-[#D9D28B]">*</span>}
        </label>
    );
}

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#B8AF61] focus:ring-4 focus:ring-[#D9D28B]/20 dark:border-white/10 dark:bg-[#1C2029] dark:text-white dark:placeholder:text-gray-500";

function SectionHeading({ icon: Icon, title, subtitle }) {
    return (
        <div className="mb-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9D28B]/30 text-[#6A6537] dark:text-[#E8E1A4]">
                <Icon size={18} />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default function CreateEventModal({
    open,
    onClose,
}) {
    if (!open) return null;

    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [descLength, setDescLength] = useState(0);
    const [status, setStatus] = useState("draft");

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleTitleChange = (e) => {
        if (!slugEdited) {
            setSlug(createSlug(e.target.value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const eventData = Object.fromEntries(formData.entries());

        eventData.slug = slug;
        eventData.status = status;

        try {
            
            const data = await createEvent(eventData);

            if (data.success) {
                onClose();
            } else {
                setSubmitError('Failed to create event!');
            }
        } catch (err) {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }

    }

    const fieldError = (name) =>
        errors[name] ? (
            <p className="mt-1.5 text-xs text-red-500">{errors[name]}</p>
        ) : null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-[3px] sm:items-center sm:p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !submitting) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-event-title"
                className="flex max-h-[95dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-3xl border border-gray-200 bg-[#FAFAF7] shadow-2xl dark:border-white/10 dark:bg-[#20242D] sm:max-h-[90dvh] sm:rounded-3xl"
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200/80 px-5 py-4 dark:border-white/10 sm:px-7 sm:py-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#D9D28B] text-[#292A22]">
                            <CalendarDays size={22} />
                        </div>

                        <div className="min-w-0">
                            <h2
                                id="create-event-title"
                                className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl"
                            >
                                Create New Event
                            </h2>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Add the details for your upcoming event.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        aria-label="Close modal"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-200/70 hover:text-gray-900 disabled:opacity-50 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="min-h-0 flex-1 overflow-y-auto"
                >
                    <div className="space-y-7 px-5 py-6 sm:px-7">
                        {/* Basic details */}
                        <section>
                            <SectionHeading
                                icon={FileText}
                                title="Basic Information"
                                subtitle="Give your event a name and a clear description."
                            />

                            <div className="space-y-5">
                                <div>
                                    <FieldLabel required>Event Title</FieldLabel>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleTitleChange}
                                        placeholder="e.g. Tech Innovation Summit 2026"
                                        maxLength={200}
                                        required
                                        aria-invalid={!!errors.title}
                                        className={inputClass}
                                    />
                                    {fieldError("title")}
                                </div>

                                <div>
                                    <FieldLabel required>Event Slug</FieldLabel>
                                    <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-[#B8AF61] focus-within:ring-4 focus-within:ring-[#D9D28B]/20 dark:border-white/10 dark:bg-[#1C2029]">
                                        <span className="pl-3.5 text-gray-400">
                                            <Link2 size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={slug}
                                            onChange={(event) => {
                                                setSlugEdited(true);
                                                setSlug(createSlug(event.target.value));
                                            }}
                                            placeholder="tech-innovation-summit-2026"
                                            required
                                            aria-invalid={!!errors.slug}
                                            className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Used in the event URL. Must be unique.
                                    </p>
                                    {fieldError("slug")}
                                </div>

                                <div>
                                    <FieldLabel required>Description</FieldLabel>
                                    <textarea
                                        name="description"
                                        onChange={(e) => setDescLength(e.target.value.length)}
                                        placeholder="Describe what attendees can expect from this event..."
                                        rows={4}
                                        required
                                        aria-invalid={!!errors.description}
                                        className={`${inputClass} min-h-28 resize-y`}
                                    />
                                    <div className="mt-1.5 flex justify-between gap-3">
                                        {fieldError("description")}
                                        <span className="ml-auto shrink-0 text-xs text-gray-400">
                                            {descLength} characters
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-gray-200/80 dark:bg-white/10" />

                        {/* Schedule and location */}
                        <section>
                            <SectionHeading
                                icon={CalendarDays}
                                title="Schedule & Location"
                                subtitle="Set when and where your event will take place."
                            />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <FieldLabel required>Start Date</FieldLabel>
                                    <input
                                        type="datetime-local"
                                        name="start_date"
                                        required
                                        aria-invalid={!!errors.start_date}
                                        className={inputClass}
                                    />
                                    {fieldError("start_date")}
                                </div>

                                <div>
                                    <FieldLabel>End Date</FieldLabel>
                                    <input
                                        type="datetime-local"
                                        name="end_date"
                                        aria-invalid={!!errors.end_date}
                                        className={inputClass}
                                    />
                                    {fieldError("end_date")}
                                </div>

                                <div className="sm:col-span-2">
                                    <FieldLabel>Event Location</FieldLabel>
                                    <div className="relative">
                                        <MapPin
                                            size={17}
                                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="e.g. Chittagong, Bangladesh"
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Optional — leave empty for an online or undecided venue.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-gray-200/80 dark:bg-white/10" />

                        {/* Image */}
                        <section>
                            <SectionHeading
                                icon={ImagePlus}
                                title="Event Cover Image"
                                subtitle="Add an image URL to represent your event."
                            />

                            <FieldLabel>Image URL</FieldLabel>
                            <input
                                type="url"
                                name="image_url"
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/event-cover.jpg"
                                aria-invalid={!!errors.image_url}
                                className={inputClass}
                            />
                            {fieldError("image_url")}

                            {imageUrl && !errors.image_url && (
                                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                                    <img
                                        src={imageUrl}
                                        alt="Event cover preview"
                                        className="h-40 w-full object-cover"
                                        onError={(event) => {
                                            event.currentTarget.style.display = "none";
                                        }}
                                        onLoad={(event) => {
                                            event.currentTarget.style.display = "block";
                                        }}
                                    />
                                </div>
                            )}
                        </section>

                        <div className="h-px bg-gray-200/80 dark:bg-white/10" />

                        {/* Publishing */}
                        <section>
                            <SectionHeading
                                icon={CheckCircle2}
                                title="Publishing Settings"
                                subtitle="Choose whether to publish now or save as a draft."
                            />

                            <FieldLabel required>Event Status</FieldLabel>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {[
                                    {
                                        value: "draft",
                                        title: "Save as Draft",
                                        description: "Keep the event unpublished for now.",
                                    },
                                    {
                                        value: "published",
                                        title: "Publish Event",
                                        description: "Make the event available to visitors.",
                                    },
                                ].map((option) => {
                                    const selected = status === option.value;

                                    return (
                                        <button
                                            type="button"
                                            key={option.value}
                                            onClick={() => setStatus(option.value)}
                                            aria-pressed={selected}
                                            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${selected
                                                ? "border-[#B8AF61] bg-[#D9D28B]/20 ring-2 ring-[#D9D28B]/20"
                                                : "border-gray-200 bg-white hover:border-[#D9D28B] dark:border-white/10 dark:bg-[#1C2029]"
                                                }`}
                                        >
                                            <span
                                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected
                                                    ? "border-[#77703A] bg-[#D9D28B]"
                                                    : "border-gray-300 dark:border-gray-600"
                                                    }`}
                                            >
                                                {selected && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#292A22]" />
                                                )}
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                                    {option.title}
                                                </span>
                                                <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-gray-400">
                                                    {option.description}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {submitError && (
                            <div
                                role="alert"
                                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
                            >
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 flex shrink-0 flex-col-reverse gap-3 border-t border-gray-200/80 bg-[#FAFAF7]/95 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#20242D]/95 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <p className="hidden text-xs text-gray-400 sm:block">
                            <span className="text-amber-700 dark:text-[#D9D28B]">*</span>
                            {" "}Required fields
                        </p>

                        <div className="flex w-full gap-3 sm:w-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={submitting}
                                className="flex-1 hover:cursor-pointer border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5 sm:flex-none"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex flex-1 hover:cursor-pointer items-center justify-center gap-2 bg-[#D9D28B] px-5 py-3 text-sm font-bold text-[#292A22] shadow-sm transition hover:bg-[#e4dda0] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                            >
                                {submitting ? (
                                    <>
                                        <LoaderCircle size={17} className="animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <CalendarDays size={17} />
                                        Create Event
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}