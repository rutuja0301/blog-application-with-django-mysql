// auth.js

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    window.location.href = "/login/";
    return false;
  }

  const response = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("access", data.access);
    return true;
  } else {
    localStorage.clear();
    window.location.href = "/login/";
    return false;
  }
}

export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("access");
  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${token}`;

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      token = localStorage.getItem("access");
      options.headers["Authorization"] = `Bearer ${token}`;
      response = await fetch(url, options);
    }
  }

  return response;
}
