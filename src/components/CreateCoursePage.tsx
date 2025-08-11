import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../store/courseSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface CreateCourseForm {
  title: string;
  description: string;
  category: string;
  pdf: File | null;
  video: File | null;
  thumbnail: File | null;
}

export const CreateCoursePage: React.FC = () => {
  const dispatch = useDispatch();
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

    dispatch(
      addCourse({
        id: uuidv4(),
        title: form.title,
        description: form.description,
        category: form.category,
        pdf: form.pdf ? form.pdf.name : null,
        video: form.video ? form.video.name : null,
        thumbnail: form.thumbnail
          ? URL.createObjectURL(form.thumbnail)
          : null,
      })
    );

    setMessage("Course created successfully!");
    setForm({
      title: "",
      description: "",
      category: "",
      pdf: null,
      video: null,
      thumbnail: null,
    });

    setTimeout(() => {
      navigate("/courses");
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

      {message && (
        <p className="mb-4 text-green-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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

        {/* PDF */}
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

        {/* Video */}
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

        {/* Thumbnail */}
        <div>
          <label className="block font-medium mb-1">
            Upload Thumbnail Image
          </label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit */}
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
