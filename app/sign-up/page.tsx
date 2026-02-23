"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi kosong
    if (!name || !email || !password || !confirmPassword) {
      alert("Semua field wajib diisi!");
      return;
    }

    // Validasi panjang password
    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    // Cek apakah user sudah ada
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      alert("Akun sudah terdaftar! Silakan login.");
      return;
    }

    // Simpan ke localStorage
    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Registrasi berhasil!");
    router.push("/sign-in");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Sign-up
        </h2>
    
        {/* Nama */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300">
            Konfirmasi Password
          </label>
          <input
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-lg bg-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 py-2 font-semibold text-white transition hover:opacity-90"
        >
          Daftar
        </button>

        {/* Link ke Login */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Sudah punya akun?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer text-indigo-400 hover:underline"
          >
            Login di sini
          </span>
        </p>
      </form>
    </div>
  );
}