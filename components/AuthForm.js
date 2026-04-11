"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./AuthForm.module.css";

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");

const AuthForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (callbackUrl !== "/") {
      setStatusMessage("Please sign in to continue");
    }
  }, [callbackUrl]);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setErrors("");
    setData({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsSubmitting(true);

    const email = stripTags(data.email);
    const password = stripTags(data.password);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: true,
          callbackUrl,
          email,
          password,
        });

        if (result?.error) {
          setErrors(result.error);
        }
      } else {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const resultData = await res.json();

        if (resultData.error) {
          setErrors(resultData.error);
        } else {
          const result = await signIn("credentials", {
            redirect: true,
            callbackUrl,
            email,
            password,
          });

          if (result?.error) {
            setErrors(result.error);
          }
        }
      }
    } catch {
      setErrors("An unexpected error occurred. Please try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl });
  };

  return (
    <>
      <h1>{isLogin ? "Sign In" : "Register"}</h1>
      {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}

      {/* OAuth Buttons */}
      <div className={styles.oauthSection}>
        <button
          type="button"
          className={`${styles.oauthButton} ${styles.oauthGoogle}`}
          onClick={() => handleOAuthSignIn("google")}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          className={`${styles.oauthButton} ${styles.oauthGitHub}`}
          onClick={() => handleOAuthSignIn("github")}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          Continue with GitHub
        </button>
      </div>

      <div className={styles.divider}><span>or</span></div>

      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors && <p className={styles.error}>{errors}</p>}
        <button type="submit" disabled={isSubmitting || !data.email || !data.password}>
          {isSubmitting ? "Signing in..." : isLogin ? "Sign In" : "Register"}
        </button>
      </form>
      <div className={styles.toggle}>
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button type="button" onClick={handleToggle}>
          {isLogin ? "Register" : "Sign In"}
        </button>
      </div>
    </>
  );
};

export default AuthForm;
