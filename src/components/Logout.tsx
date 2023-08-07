"use client"
import { signOut } from "next-auth/react";

export default function Logout() {
  return <button
    onClick={() => signOut()}
    className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
    Signout of keycloak
  </button>
}
