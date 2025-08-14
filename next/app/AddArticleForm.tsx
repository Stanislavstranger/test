"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddArticleForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1337/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            title,
            description,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      setTitle("");
      setDescription("");

      router.refresh();
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Error creating article. See console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 border rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Article</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Article
        </button>
      </div>
    </form>
  );
}
