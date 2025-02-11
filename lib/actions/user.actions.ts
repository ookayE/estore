"use server";

import { signInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in the user with credentials
export async function signInWithCredentials({
  prevState: unknown,
  formData: FormData, //This function expects a FormData object containing user input from a sign-in form.
}) {
  try {
    const user = signInFormSchema.parse({
      email: FormData.get("email"),
      password: FormData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

//sign user out
export async function signOutUser() {
  await signOut();
}
