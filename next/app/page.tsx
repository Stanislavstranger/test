import Link from "next/link";
import AddArticleForm from "./AddArticleForm";
import DeleteArticleButton from "./DeleteArticleButton";

interface StrapiArticle {
  id: number;
  title: string;
  description: string;
}

async function getArticles(): Promise<StrapiArticle[]> {
  try {
    const response = await fetch("http://localhost:1337/api/articles", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const articlesResponse = await response.json();
    return articlesResponse.data.map((item: any) => ({ 
        id: item.id, 
        ...item.attributes 
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto p-4">
      <AddArticleForm />
      <hr className="my-8" />
      <h2 className="text-3xl font-bold mb-4 text-center">Articles</h2>
      {articles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded-lg shadow bg-white flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-700">{article.description}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Link href={`/edit/${article.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-xs">
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No articles found.</p>
      )}
    </main>
  );
}