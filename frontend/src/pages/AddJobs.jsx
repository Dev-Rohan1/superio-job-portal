import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const AddJob = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [location, setLocation] = useState("Dhaka");
  const [level, setLevel] = useState("Intermediate");
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  const postJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/post-job`,
        {
          title,
          description,
          category,
          location,
          level,
          salary,
        },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setCategory("Programming");
        setLocation("Dhaka");
        setLevel("Intermediate");
        setSalary(null);

        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write job description here...",
      });

      quillRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        setDescription(html);
      });
    }
  }, []);

  useEffect(() => {
    document.title = "Superio - Job Portal | Dashboard";
  }, []);

  return (
    <section className="mr-1 mb-6">
      <form onSubmit={postJob}>
        {/* Job Title */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Job Description
          </label>
          <div
            ref={editorRef}
            style={{
              minHeight: "150px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Job Category */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Designing">Designing</option>
              <option value="Networking">Networking</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Dhaka">Dhaka</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barishal">Barishal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Salary
            </label>
            <input
              type="number"
              placeholder="Enter salary range"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-8 font-semibold rounded ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
          ) : (
            "Add Job"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddJob;
