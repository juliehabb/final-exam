import React, { FormEvent, useState } from "react";
import { AuthForm } from "../components/authform";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: call your register API with { username, password, email, bio }
    console.log("Register:", { username, password, email, bio });
  }

  return (
    <AuthForm
      title="Register"
      submitLabel="Sign Up"
      onSubmit={handleSubmit}
      bottomLinkText="Have an account? Log in."
      bottomLinkTo="/login"
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell us about yourself"
        className="w-full px-4 py-2 border rounded h-24"
      />
    </AuthForm>
  );
}
