"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, Select, FieldError, ListBox } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiPencilLine } from "react-icons/ri";

export function UpdateModal({ tutor }) {
    const router = useRouter();

    const {
        _id,
        title,
        thumbnail,
        category,
        available,
        instructor,
        sessionStartDate,
        price,
    } = tutor;

    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedTutor = Object.fromEntries(formData.entries());
        console.log(updatedTutor);

        setIsOpen(false);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const res = await fetch(`${apiUrl}/my-tutors/${_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(updatedTutor),
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success("Tutor updated successfully!");
                router.refresh();
                router.push("/my-tutors");
            } else {
                toast.error("Failed to update tutor. Please try again.");
            }
        }
        catch (error) {
            console.error("Error updating tutor:", error);
            toast.error("An error occurred. Please check if the server is running.");
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button
                size="sm"
                onClick={() => setIsOpen(true)}
                className="font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-4"
            >
                <RiPencilLine />
                Update Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Update Tutor</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-6">

                                    {/* Personal Identification */}
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700">
                                                Personal Details
                                            </h2>
                                            <div className="border-b mt-1.5" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {/* instructor */}
                                            <TextField defaultValue={instructor} name="instructor" isRequired>
                                                <Label>Instructor Full Name</Label>
                                                <Input
                                                    placeholder="e.g. Dr. Sarah Chen (Harvard Medical)"
                                                    className="rounded-xl"
                                                />
                                                <FieldError />
                                            </TextField>

                                            {/* thumbnail */}
                                            <TextField defaultValue={thumbnail} name="thumbnail" isRequired>
                                                <Label>Photo URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/photo.jpg"
                                                    className="rounded-xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Course Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700">
                                                Course Information
                                            </h2>
                                            <div className="border-b mt-1.5" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {/* title */}
                                            <TextField defaultValue={title} name="title" isRequired>
                                                <Label>Course Title</Label>
                                                <Input
                                                    placeholder="e.g. Advanced Anatomy & Surgical Techniques"
                                                    className="rounded-xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Specialization & Logistics */}
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700">
                                                Schedule & Specialization
                                            </h2>
                                            <div className="border-b mt-1.5" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* category */}
                                            <div>
                                                <Select
                                                    defaultValue={category}
                                                    name="category"
                                                    isRequired
                                                    className="w-full"
                                                    placeholder="Select subject"
                                                >
                                                    <Label>Subject / Category</Label>
                                                    <Select.Trigger className="rounded-xl">
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="Anatomy & Surgery" textValue="Anatomy & Surgery">
                                                                Anatomy & Surgery<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Biochemistry" textValue="Biochemistry">
                                                                Biochemistry<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Pathology & Genetics" textValue="Pathology & Genetics">
                                                                Pathology & Genetics<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Pediatrics" textValue="Pediatrics">
                                                                Pediatrics<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Pharmacology" textValue="Pharmacology">
                                                                Pharmacology<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Physiology & Board Prep" textValue="Physiology & Board Prep">
                                                                Physiology & Board Prep<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Cardiology" textValue="Cardiology">
                                                                Cardiology<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Neurology" textValue="Neurology">
                                                                Neurology<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="Immunology" textValue="Immunology">
                                                                Immunology<ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                            </div>

                                            {/* sessionStartDate */}
                                            <TextField defaultValue={sessionStartDate} name="sessionStartDate" isRequired>
                                                <Label>Session Start Date</Label>
                                                <Input
                                                    type="date"
                                                    className="rounded-xl"
                                                />
                                                <FieldError />
                                            </TextField>

                                            {/* available */}
                                            <TextField defaultValue={available} name="available" isRequired className="md:col-span-2">
                                                <Label>Available Days & Time Slots</Label>
                                                <Input
                                                    placeholder="e.g. Sat - Sun - 4:00 PM - 7:00 PM"
                                                    className="rounded-xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Financials */}
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700">
                                                Logistics & Fee
                                            </h2>
                                            <div className="border-b mt-1.5" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {/* price */}
                                            <TextField defaultValue={price} name="price" type="number" isRequired>
                                                <Label>Course Fee ($)</Label>
                                                <Input type="number" placeholder="85" className="rounded-xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    <Modal.Footer className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <Button type="submit"
                                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold w-full rounded-xl py-2.5">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}