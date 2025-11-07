import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Login page placeholder that will call PHP backend for auth later. */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // TODO: Call /login endpoint on the PHP backend.
    alert(`Login placeholder for ${username}`);
  };

  return (
    <section>
      <h1>Login</h1>
      <p>TODO: Connect to PHP backend authentication.</p>
      <form onSubmit={submit} style={{ maxWidth: 420, display: "grid", gap: 10 }}>
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" style={{ background: "var(--secondary)", color: "var(--on-secondary)", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}>
          Sign in
        </button>
      </form>
    </section>
  );
}
