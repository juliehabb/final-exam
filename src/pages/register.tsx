import React, { FormEvent, useState } from "react";
import { AuthForm } from "../components/authform";
import { useRegister } from "../hooks/useRegister";
import { RegisterData } from "../api/auth";

export default function RegisterPage() {
    const { register, loading, error} = useRegister();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [venueManager, setVenueManager] = useState(false);


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload: RegisterData = { name, email, password, bio,venueManager};
    try {
        const result = await register(payload);
        console.log("Full registration result:", result);
        console.log("registered user (data)", result.data);
        
    } catch (err) {
        console.error("Registration error:", err)


    }
  }

  return (
    <AuthForm
      title="Register"
      submitLabel={loading ? "Signing Up..." : "Sign up"}
      onSubmit={handleSubmit}
      bottomLinkText="Have an account? Log in."
      bottomLinkTo="/login"
    >
      {error && <div className="text-red-500">{error}</div>}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={venueManager}
          onChange={(e) => setVenueManager(e.target.checked)}
          className="form-checkbox"
        />
        <span>I am a venue manager</span>
      </label>
    </AuthForm>
  );
}
