"use client";

import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Button,
  Card,
} from "@heroui/react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddTutorsPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const tutor = Object.fromEntries(formData.entries());
    console.log(tutor);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/tutors`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutor),
      });

      if (res.ok) {
        toast.success("Tutor registered successfully!");
        router.push("/tutors");
      } else {
        toast.error("Failed to register tutor. Please try again.");
      }
    } catch (error) {
      console.error("Error registering tutor:", error);
      toast.error("An error occurred. Please check if the server is running.");
    }
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 mt-5">Register a New Medical Tutor</h1>
      <p className="text-muted mb-10">
        Expand your institution's academic network by adding qualified professional tutors.
      </p>

      <Card className="p-6 md:p-8">
        <form onSubmit={onSubmit} className="space-y-8 max-w-4xl">

          {/* Personal Identification */}
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700">
                Personal Identification
              </h2>
              <div className="border-b mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* matches: instructor */}
              <TextField name="instructor" isRequired>
                <Label>Instructor Full Name</Label>
                <Input
                  placeholder="e.g. Dr. Sarah Chen (Harvard Medical)"
                  className="rounded-xl"
                />
                <FieldError />
              </TextField>

              {/* matches: experience */}
              <TextField name="experience" isRequired>
                <Label>Experience</Label>
                <Input
                  placeholder="e.g. 8 Yrs Exp."
                  className="rounded-xl"
                />
                <FieldError />
              </TextField>

              {/* matches: thumbnail */}
              <TextField name="thumbnail" isRequired className="md:col-span-2">
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
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700">
                Course Information
              </h2>
              <div className="border-b mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* matches: title */}
              <TextField name="title" isRequired>
                <Label>Course Title</Label>
                <Input
                  placeholder="e.g. Advanced Anatomy & Surgical Techniques"
                  className="rounded-xl"
                />
                <FieldError />
              </TextField>

              {/* matches: description */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  placeholder="A brief overview of the course content, goals, and target audience..."
                  className="w-full min-h-[120px] p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Specialization & Logistics */}
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700">
                Specialization & Logistics
              </h2>
              <div className="border-b mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* matches: category */}
              <div>
                <Select
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

              {/* matches: mode */}
              <div>
                <Select
                  name="mode"
                  isRequired
                  className="w-full"
                  placeholder="Select mode"
                >
                  <Label>Teaching Mode</Label>
                  <Select.Trigger className="rounded-xl">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="online" textValue="online">
                        Online<ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="in-person" textValue="in-person">
                        In-Person<ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="hybrid" textValue="hybrid">
                        Hybrid<ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* matches: location */}
              <TextField name="location" isRequired>
                <Label>Location</Label>
                <Input placeholder="e.g. Boston, MA" className="rounded-xl" />
                <FieldError />
              </TextField>

              {/* matches: available */}
              <TextField name="available" isRequired>
                <Label>Available Days & Time Slots</Label>
                <Input
                  placeholder="e.g. Sat - Sun - 4:00 PM - 7:00 PM"
                  className="rounded-xl"
                />
                <FieldError />
              </TextField>

              {/* matches: duration */}
              <TextField name="duration" isRequired>
                <Label>Course Duration</Label>
                <Input placeholder="e.g. 8 Weeks" className="rounded-xl" />
                <FieldError />
              </TextField>

              {/* matches: sessionStartDate */}
              <TextField name="sessionStartDate" isRequired>
                <Label>Session Start Date</Label>
                <Input
                  type="date"
                  className="rounded-xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Financials & Capacity */}
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-700">
                Financials & Capacity
              </h2>
              <div className="border-b mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* matches: price */}
              <TextField name="price" type="number" isRequired>
                <Label>Course Fee ($)</Label>
                <Input type="number" placeholder="85" className="rounded-xl" />
                <FieldError />
              </TextField>

              {/* matches: remainingSlots */}
              <TextField name="remainingSlots" type="number" isRequired>
                <Label>Total Available Slots</Label>
                <Input type="number" placeholder="50" className="rounded-xl" />
                <FieldError />
              </TextField>

              {/* matches: rating */}
              <TextField name="rating" isRequired>
                <Label>Rating</Label>
                <Input
                  placeholder="e.g. 4.9 (124)"
                  className="rounded-xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              className="flex gap-2 w-full md:w-auto min-w-[220px] bg-blue-600 text-white rounded-md font-semibold"
            >
              <FaRegCheckCircle />
              Register Tutor
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTutorsPage;