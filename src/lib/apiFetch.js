export async function apiFetch(url, options = {}, showSnackbar) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    console.warn("Session expired, redirecting to login...");
    showSnackbar(
      "Session expired, redirecting to login",
      "error",
      "",
      "3000"
    );
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);

    return null;
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
