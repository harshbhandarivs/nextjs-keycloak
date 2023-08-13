import { getCsrfToken, signOut } from "next-auth/react";

export default async function federatedLogout() {
  try {
    const csrfToken = await getCsrfToken();
    const rawBody = { csrfToken };
    const body: BodyInit = JSON.stringify(rawBody);
    const config: RequestInit = { method: "POST", body, cache: "no-store" };
    const response = await fetch("/api/auth/federated-logout", config);
    const data = await response.json();
    if (response.ok) {
      await signOut({ redirect: false });
      window.location.href = data.url;
      return;
    }
    throw new Error(data.error);
  } catch (error) {
    console.log(error)
    alert(error);
    await signOut({ redirect: false });
    window.location.href = "/";
  }
}
