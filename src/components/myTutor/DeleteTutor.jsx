"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

export function DeleteTutor({ tutor }) {
    const router = useRouter();
    const { _id, instructor } = tutor;

    const handleDelete = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/my-tutors/${_id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
            },
        });
        const data = await res.json();
        router.refresh();
        // console.log(data)
    }

    return (
        <AlertDialog>
            <Button
                size="sm"
                className="flex gap-2 font-bold text-xs bg-red-500 text-white hover:bg-red-600 rounded-lg px-5 flex gap-1 items-center shadow-sm"
            >
                <FaRegTrashAlt />
                Delete Profile
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete tutors permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{instructor}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}