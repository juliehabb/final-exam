import React, { FormEvent, useState } from "react";
import { AuthForm } from "../components/authform";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../api/auth";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, loading, error} = useRegister();

    const [name, setname] = useState("");
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
        value={name}
        onChange={(e) => setname(e.target.value)}
        placeholder="name"
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
