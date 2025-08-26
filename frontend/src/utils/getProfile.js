import { profileRoute } from "./APIRoutes";

export default async function getProfile() {
  const res = await fetch(profileRoute, {
    method: "get",
    credentials: "include",
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (data) {
    return data.profile;
  } else {
    return null;
  }
}
