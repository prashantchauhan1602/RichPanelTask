import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../utils/AppContext";

export default function Login() {
  const { login, loading } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem("rememberedUser");
      }
     
    } catch (error) {
      console.log("trouble in remembering the password");
    }
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setEmail(userData.email);
      setPassword(userData.password);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="card">
      <div className="card__content">
        <h3>Login to your account</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            type="email"
            name="email"
            id="email"
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            type="password"
            name="password"
            id="password"
          />

          <div id="rmb">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <input
            disabled={loading}
            className="btn"
            id="btn"
            type="submit"
            value={loading ? "Loading..." : "Login"}
          />

          <p className="formfooter">
            New to MyApp? <Link to="/signup">Sign Up</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

