const RAW_BASE = process.env.NEXT_PUBLIC_API;

function buildUrl(path) {
  if (!RAW_BASE) {
    throw new Error("NEXT_PUBLIC_API is not set");
  }
  const base = RAW_BASE.replace(/\/+$/, "");       
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function fetchApi(path, options) {
  const url = buildUrl(path);
  try {
    const res = await fetch(url, {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...(options && options.headers ? options.headers : {}),
      },
      ...(options || {})
    });
    return res;
  } catch (err) {
    console.error("fetchApi network error:", err, "URL:", url);
    throw err; 
  }
}

export async function fetchWithRefreshApi(path, options = {}) {
  let res = await fetchApi(path, options);
  if (res.status !== 401) return res;

  const refresh = await fetchApi("/auth/refresh", { method: "POST" });
  if (!refresh.ok) return res;

  res = await fetchApi(path, options);
  return res;
}
