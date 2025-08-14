"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/articles/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        const articleData = await response.json();
        const fetchedArticle = articleData.data.attributes;
        setTitle(fetchedArticle.title);
        setDescription(fetchedArticle.description);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Could not load article data.");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:1337/api/articles/${id}`, {
        method: "PUT",
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
        throw new Error("Failed to update article");
      }

      alert("Article updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update article.");
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Article</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-lg shadow-md bg-white"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows={5}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Article
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
