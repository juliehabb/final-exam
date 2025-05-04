import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/authform";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const { loginResult, apiKey } = await login({ email, password });

      // Console.log for debugging
      console.log("Logged in, token:", loginResult.data.accessToken);
      console.log("API key:", apiKey);

      // Persist for future requests
      localStorage.setItem("token", loginResult.data.accessToken);
      localStorage.setItem("apiKey", apiKey);

      // Redirect to your app’s main page
      navigate("/");
    } catch {
      // error message is surfaced via `error` from the hook
    }
  }

  return (
    <AuthForm
      title="Log In"
      submitLabel={loading ? "Signing In…" : "Sign In"}
      onSubmit={handleSubmit}
      bottomLinkText="No account? Register."
      bottomLinkTo="/register"
    >
      {error && <div className="text-red-500">{error}</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="first.last@stud.noroff.no"
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

