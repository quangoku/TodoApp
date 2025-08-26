import { refreshRoute } from "./APIRoutes";

export async function refreshToken() {
  try {
    const res = await fetch(refreshRoute, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
    if (!res.ok) throw new Error("Failed to refresh token");
    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
}
