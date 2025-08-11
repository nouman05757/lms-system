import React, { useState } from "react";
import { useCourses } from "../contexts/CourseContext"; // aapka context hook
import { useNavigate } from "react-router-dom";

interface CreateCourseForm {
  title: string;
  description: string;
  category: string;
  pdf: File | null;
  video: File | null;
  thumbnail: File | null;
}

export const CreateCoursePage: React.FC = () => {
  const { createCourse } = useCourses();
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateCourseForm>({
    title: "",
    description: "",
    category: "",
    pdf: null,
    video: null,
    thumbnail: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Call context createCourse with form data
    createCourse({
      title: form.title,
      description: form.description,
      category: form.category,
      // Agar aapke Course type mein ye fields nahi hain to hata dijiye ya adjust kariye
      pdf: form.pdf,
      video: form.video,
      thumbnail: form.thumbnail,
    });

    setMessage("Course created successfully!");
    setForm({
      title: "",
      description: "",
      category: "",
      pdf: null,
      video: null,
      thumbnail: null,
    });

    // Navigate back to dashboard
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

      {message && (
        <p className="mb-4 text-green-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter course title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-28 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter course description"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block font-medium mb-1">Upload PDF</label>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};
