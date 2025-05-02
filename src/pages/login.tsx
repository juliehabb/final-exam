import React, { FormEvent, useState } from "react";
import { AuthForm } from "../components/authform";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: call login API with { username, password }
    console.log("Login:", { username, password });
  }

  return (
    <AuthForm
      title="Log In"
      submitLabel="Sign In"
      onSubmit={handleSubmit}
      bottomLinkText="No account? Register."
      bottomLinkTo="/register"
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-2 border rounded"
      />
    </AuthForm>
  );
}
