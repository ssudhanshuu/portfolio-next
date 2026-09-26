"use client";

import { useEffect, useState } from "react";
import { ImagePlus, MessageSquareQuote, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

const emptyForm = {
    name: "",
    role: "",
    company: "",
    testimonial: "",
    rating: "5",
    projectName: "",
};

const inputClassName = "w-full rounded-lg border border-[#2a2a39] bg-[#0e0e17] px-3 py-2.5 text-sm text-[#ececf3] placeholder:text-[#747686] focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/15";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingPhotoId, setUploadingPhotoId] = useState(null);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch("/api/testimonials");
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Unable to load testimonials.");
            setTestimonials(result.data || []);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        const loadTestimonials = async () => {
            try {
                const response = await fetch("/api/testimonials", { signal: controller.signal });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message || "Unable to load testimonials.");
                setTestimonials(result.data || []);
            } catch (error) {
                if (error.name !== "AbortError") toast.error(error.message);
            }
        };

        loadTestimonials();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!photoPreview) return;
        return () => URL.revokeObjectURL(photoPreview);
    }, [photoPreview]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Choose an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Photo must be 5 MB or smaller.");
            return;
        }

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!photoFile) {
            toast.error("Add a client photo before publishing.");
            return;
        }
        setLoading(true);

        try {
            const body = new FormData();
            Object.entries(form).forEach(([key, value]) => body.append(key, value));
            body.append("photo", photoFile);

            const response = await fetch("/api/testimonials", {
                method: "POST",
                body,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Unable to add testimonial.");

            setForm(emptyForm);
            setPhotoFile(null);
            setPhotoPreview("");
            await fetchTestimonials();
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this testimonial?")) return;

        try {
            const response = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Unable to delete testimonial.");

            setTestimonials((current) => current.filter((item) => item._id !== id));
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleExistingPhotoUpload = async (id, event) => {
        const input = event.currentTarget;
        const file = input.files?.[0];
        if (!file) return;
        input.value = "";

        if (!file.type.startsWith("image/")) {
            toast.error("Choose an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Photo must be 5 MB or smaller.");
            return;
        }

        setUploadingPhotoId(id);
        try {
            const body = new FormData();
            body.append("photo", file);
            const response = await fetch(`/api/testimonials/${id}`, {
                method: "PATCH",
                body,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Unable to update client photo.");

            setTestimonials((current) => current.map((item) => item._id === id ? result.data : item));
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploadingPhotoId(null);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <header className="flex flex-wrap items-end justify-between gap-3 border-b border-[#262735] pb-4">
                <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-300">Client feedback</p>
                    <h1 className="text-2xl font-semibold text-[#ececf3]">Testimonials</h1>
                </div>
                <span className="text-sm text-[#a4a5b4]">{testimonials.length} published</span>
            </header>

            <section className="rounded-xl border border-[#262735] bg-[#12131c] p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-500/10 text-violet-300">
                        <Plus size={18} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#ececf3]">Add testimonial</h2>
                        <p className="text-xs text-[#747686]">Add feedback you have permission to publish.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Client name *
                            <input className={inputClassName} name="name" value={form.name} onChange={handleChange} required maxLength={80} placeholder="Client name" />
                        </label>
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Role *
                            <input className={inputClassName} name="role" value={form.role} onChange={handleChange} required maxLength={80} placeholder="Founder, CEO..." />
                        </label>
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Company *
                            <input className={inputClassName} name="company" value={form.company} onChange={handleChange} required maxLength={100} placeholder="Company name" />
                        </label>
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Project
                            <input className={inputClassName} name="projectName" value={form.projectName} onChange={handleChange} maxLength={100} placeholder="Project name (optional)" />
                        </label>
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Client photo *
                            <input
                                key={photoPreview || "empty-photo"}
                                className={`${inputClassName} file:mr-3 file:rounded-md file:border-0 file:bg-violet-500/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-violet-200`}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                required={!photoFile}
                            />
                        </label>
                    </div>

                    {photoPreview && (
                        <div className="flex items-center gap-3">
                            <div
                                role="img"
                                aria-label="Client photo preview"
                                className="h-14 w-14 rounded-full border border-[#303142] bg-cover bg-center"
                                style={{ backgroundImage: `url("${photoPreview}")` }}
                            />
                            <span className="text-xs text-[#a4a5b4]">Photo preview</span>
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Testimonial *
                            <textarea className={`${inputClassName} min-h-28 resize-y`} name="testimonial" value={form.testimonial} onChange={handleChange} required maxLength={1000} placeholder="Client feedback" />
                        </label>
                        <label className="space-y-1.5 text-xs font-medium text-[#a4a5b4]">
                            Rating *
                            <select className={inputClassName} name="rating" value={form.rating} onChange={handleChange}>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <option key={rating} value={rating}>{rating} {rating === 1 ? "star" : "stars"}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-wait disabled:opacity-60">
                        <Plus size={16} />
                        {loading ? "Adding..." : "Add testimonial"}
                    </button>
                </form>
            </section>

            <section>
                <div className="mb-4 flex items-center gap-2">
                    <MessageSquareQuote size={17} className="text-violet-300" />
                    <h2 className="font-semibold text-[#ececf3]">Published testimonials</h2>
                </div>

                {testimonials.length ? (
                    <div className="space-y-3">
                        {testimonials.map((item) => (
                            <article key={item._id} className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#262735] bg-[#12131c] p-4 sm:p-5">
                                <div className="flex min-w-0 flex-1 items-start gap-3">
                                    <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#303142] bg-violet-500/15 text-sm font-semibold text-violet-200">
                                        {item.photo ? (
                                            <Image
                                                src={item.photo}
                                                alt={`${item.name} portrait`}
                                                width={44}
                                                height={44}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            item.name?.[0] || "?"
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <h3 className="font-semibold text-[#ececf3]">{item.name}</h3>
                                            <span className="text-xs text-[#747686]">{item.role} at {item.company}</span>
                                        </div>
                                        <div className="mb-2 flex items-center gap-1 text-amber-300" aria-label={`${item.rating} out of 5 stars`}>
                                            {Array.from({ length: item.rating }, (_, index) => <Star key={index} size={13} fill="currentColor" />)}
                                        </div>
                                        <p className="text-sm leading-6 text-[#a4a5b4]">“{item.testimonial}”</p>
                                        {item.projectName && <p className="mt-2 text-xs text-violet-300">Project: {item.projectName}</p>}
                                    </div>
                                </div>
                                <div className="flex shrink-0 gap-2">
                                    <label
                                        htmlFor={`testimonial-photo-${item._id}`}
                                        title={item.photo ? "Change client photo" : "Add client photo"}
                                        className={`inline-flex min-h-9 items-center gap-2 rounded-lg border border-violet-400/20 px-3 text-xs font-medium text-violet-200 transition hover:bg-violet-400/10 ${uploadingPhotoId === item._id ? "cursor-wait opacity-50" : "cursor-pointer"}`}
                                    >
                                        <ImagePlus size={16} />
                                        {uploadingPhotoId === item._id ? "Uploading..." : item.photo ? "Change photo" : "Add photo"}
                                    </label>
                                    <input
                                        id={`testimonial-photo-${item._id}`}
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        disabled={uploadingPhotoId === item._id}
                                        onChange={(event) => handleExistingPhotoUpload(item._id, event)}
                                    />
                                    <button type="button" onClick={() => handleDelete(item._id)} aria-label={`Delete testimonial from ${item.name}`} className="grid h-9 w-9 place-items-center rounded-lg border border-red-400/20 text-red-300 transition hover:bg-red-400/10">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-[#303142] px-5 py-12 text-center">
                        <p className="text-sm text-[#a4a5b4]">No testimonials yet.</p>
                    </div>
                )}
            </section>
        </div>
    );
}