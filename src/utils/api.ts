const API_BASE_URL = "https://fakestoreapi.com";

export async function fetchJson<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  return res.json() as Promise<T>;
}
