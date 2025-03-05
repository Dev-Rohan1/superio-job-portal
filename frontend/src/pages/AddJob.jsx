import React, { useEffect, useRef } from "react";
import quil from "quill";

const AddJob = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  console.log(editorRef);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new quil(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <section>
      <form>
        <div className="mb-6">
          <label className="mb-2 block capitalize">Job title</label>
          <input
            className="w-full rounded border-2 border-gray-300 p-2"
            type="text"
            placeholder="Type here"
          />
        </div>
        <div>
          <span className="mb-2 block">Job description</span>
          <div ref={editorRef}></div>
        </div>
        <div className="mt-6 flex items-center gap-6">
          <div>
            {" "}
            <label className="mb-2 block">Job Category</label>
            <select className="rounded border-2 border-gray-300 bg-gray-100 px-3 py-2">
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Networking">Networking</option>
              <option value="Designing">Designing</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>
          <div>
            {" "}
            <label className="mb-2 block">Job Location</label>
            <select className="rounded border-2 border-gray-300 bg-gray-100 px-3 py-2">
              <option value="Dhaka">Dhaka</option>
              <option value="Rongpur">Rongpur </option>
              <option value="Saidpur">Saidpur</option>
              <option value="Dinajpur">Dinajpur</option>
              <option value="Thakurgong">Thakurgong</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
            </select>
          </div>
          <div>
            {" "}
            <label className="mb-2 block">Job Level</label>
            <select className="rounded border-2 border-gray-300 bg-gray-100 px-3 py-2">
              <option value="Beginner">Beginner Level</option>
              <option value="Senior">Senior Level</option>
              <option value="Intermediat">Intermediat Level</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <span className="mb-2 block">Job Salery</span>
          <input
            className="w-full rounded border-2 border-gray-300 p-2"
            type="number"
            placeholder="Salery"
            min={0}
          />
        </div>
        <button
          className="rounded bg-blue-500 px-10 mt-7 py-2 text-white"
          type="submit"
        >
          Add
        </button>
      </form>
    </section>
  );
};

export default AddJob;
