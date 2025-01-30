export async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // Send session cookie
    });
  
    if (response.status === 401) {
      console.warn("Session expired, redirecting to login...");
  
      setTimeout(() => {
        window.location.href = "/login"; // Redirect manually
      }, 500);
  
      return null; // Stop further execution
    }
  
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
  
    return response.json();
  }