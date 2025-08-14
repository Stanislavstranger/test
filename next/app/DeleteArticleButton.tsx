"use client";

import { useRouter } from "next/navigation";

export default function DeleteArticleButton({
  articleId,
}: {
  articleId: number;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:1337/api/articles/${articleId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
    >
      Delete
    </button>
  );
}
