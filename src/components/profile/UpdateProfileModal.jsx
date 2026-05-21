"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField, FieldError } from "@heroui/react";
import toast from "react-hot-toast";
import { FiEdit2, FiUser, FiImage } from "react-icons/fi";

export default function UpdateProfileModal({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

        const { error } = await authClient.updateUser({
            name: formData.name,
            image: formData.image || undefined,
        });

        if (error) {
            toast.error(error.message || "Failed to update profile.");
            return;
        }

        toast.success("Profile updated successfully!");
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition duration-150 cursor-pointer"
            >
                <FiEdit2 className="text-xs" />
                Edit Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-blue-100 dark:bg-blue-950/40 text-[#004ac6] dark:text-[#dbe1ff]">
                                <FiUser className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Edit Profile</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <TextField defaultValue={user?.name || ""} name="name" isRequired>
                                            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Full Name
                                            </Label>
                                            <div className="relative mt-1">
                                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                                                <Input
                                                    placeholder="Dr. Jane Smith"
                                                    className="pl-10 rounded-xl w-full"
                                                />
                                            </div>
                                            <FieldError />
                                        </TextField>

                                        <TextField defaultValue={user?.image || ""} name="image">
                                            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Profile Photo URL
                                            </Label>
                                            <div className="relative mt-1">
                                                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/avatar.jpg"
                                                    className="pl-10 rounded-xl w-full"
                                                />
                                            </div>
                                            <FieldError />
                                        </TextField>
                                    </div>

                                    <Modal.Footer className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex gap-3 w-full">
                                            <Button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="w-1/2 py-2.5 border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="w-1/2 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold rounded-xl"
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
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