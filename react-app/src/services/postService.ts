export async function fetchPosts(userId: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  if (!res.ok) throw new Error('Posts não encontrados');
  return res.json();
}
