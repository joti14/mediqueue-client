"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, FieldError } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function BookSessionModal({ tutor }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { _id, title, instructor, remainingSlots = 0 } = tutor;

    const isSlotAvailable = remainingSlots > 0;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isSlotAvailable) {
            toast.error("No slots available for this session!");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const bookingData = Object.fromEntries(formData.entries());

        setIsSubmitting(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            
            const res = await fetch(`${apiUrl}/my-tutors/${_id}`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                toast.success("Session booked successfully! 🎉");
                setIsOpen(false);
                router.refresh();
                // router.push("/booked-sessions");
            } else {
                toast.error("Failed to book session.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while booking.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={isOpen} onOpenChange={setIsOpen}>
            <Button
                onClick={() => isSlotAvailable && setIsOpen(true)}
                disabled={!isSlotAvailable}
                className={`px-[24px] py-[12px] rounded-lg text-[14px] font-semibold active:scale-95 transition-all duration-150 shadow-md ${
                    isSlotAvailable 
                    ? "bg-[#004ac6] hover:bg-[#2563eb] text-white" 
                    : "bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed"
                }`}
            >
                {isSlotAvailable ? "Book Session" : "No Slots Available"}
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Book Session</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700">
                                                Booking Details
                                            </h2>
                                            <div className="border-b mt-1.5" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <TextField name="studentName" isRequired>
                                                <Label>Your Name</Label>
                                                <Input placeholder="Enter your full name" className="rounded-xl" />
                                                <FieldError />
                                            </TextField>

                                            <TextField name="phone" isRequired>
                                                <Label>Phone Number</Label>
                                                <Input type="tel" placeholder="e.g. +1 555 123 4567" className="rounded-xl" />
                                                <FieldError />
                                            </TextField>

                                            <TextField defaultValue={instructor || title} name="instructor" isRequired>
                                                <Label>Tutor Name</Label>
                                                <Input readOnly className="rounded-xl bg-slate-100 dark:bg-slate-800" />
                                                <FieldError />
                                            </TextField>

                                            <TextField name="email" type="email" isRequired>
                                                <Label>Email</Label>
                                                <Input type="email" placeholder="you@example.com" className="rounded-xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        <p className="text-sm font-medium">
                                            Remaining Slots: 
                                            <span className={`ml-1 font-bold ${remainingSlots > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {remainingSlots}
                                            </span>
                                        </p>
                                    </div>

                                    <Modal.Footer className="pt-4 border-t">
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting || !isSlotAvailable}
                                            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold w-full rounded-xl py-2.5"
                                        >
                                            {isSubmitting ? "Processing..." : "Confirm Booking"}
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