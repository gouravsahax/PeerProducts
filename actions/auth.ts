"use server";

import { signIn, signOut } from "@/auth";

export async function SignIn() {
    await signIn("google", {
        redirectTo: "/",
    });
}

export async function SignOut() {
    await signOut();
}