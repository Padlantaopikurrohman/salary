"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 👇 SIMPAN DI SINI (di dalam component)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("Akun belum terdaftar");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
      localStorage.setItem("access_token", "dummy_token");
      router.push("/dashboard");
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-zinc-900 p-8"
      >
        <h1 className="mb-6 text-center text-2xl text-white">Sign In</h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <button className="w-full rounded-lg bg-white py-2 text-black">
          Login
        </button>
      </form>
    </div>
  );
}