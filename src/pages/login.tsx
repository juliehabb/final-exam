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
      const token = loginResult.data.accessToken;
      const username = loginResult.data.name;

      const profileRes = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

      const profileJson = await profileRes.json();

      if (!profileRes.ok) {
        throw new Error(profileJson.message || "Failed to fetch full profile");
      }

      const fullUser = profileJson.data;
      console.log("Full user profile:", fullUser);


      // Store token and API key
      localStorage.setItem("token", token);
       localStorage.setItem("apiKey", apiKey);
       localStorage.setItem("user", JSON.stringify(fullUser));
  
      navigate("/");
    } catch (err: any) {
      console.error("Login failed", err.message);
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

