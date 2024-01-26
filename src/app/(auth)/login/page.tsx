import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthLoginError } from "@/modules/auth/components/auth-login-error";
import { GoogleLoginButton } from "@/modules/auth/components/google-login-button";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-center text-3xl dark:text-white">Se connecter</h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Première marketplace de cigarettes électroniques en Tunisie. <br />
      </p>
      <Suspense fallback={null}>
        <AuthLoginError className="mt-4" />
      </Suspense>
      <div className="mt-8 flex flex-col gap-2">
        <GoogleLoginButton />
      </div>
    </div>
  );
}
