export const load = async () => {
  const res = await fetch("http://localhost:1337/api/articles");
  const { data } = await res.json();

  return { articles: data };
};
