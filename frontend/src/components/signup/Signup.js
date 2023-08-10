import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { AppContext } from "../../utils/AppContext";

export default function Signup() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const {signup,loading} = useContext(AppContext);

  return (
    <div className="card">
      <div className="card__content">
        <h3>Create Account</h3>
        <form 
        onSubmit={e => {
          e.preventDefault();
          signup(name,email,password);
        }}>
          <label htmlFor="name">Name</label>
          <input value={name} onChange={e => setName(e.currentTarget.value) } required type="text" name="name" minLength="1" id="name" />
          <label htmlFor="email">Email</label>
          <input value={email} onChange={e => setEmail(e.currentTarget.value) } required type="email" name="email" id="email" />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.currentTarget.value) }
            required
            minLength="8"
            type="password"
            name="password"
            id="password"
          />
          <p style={{fontSize: 9}}>At least 8 characters with Combination of : a-z,A-Z,0-9, Special Symbols.</p>

          <input disabled={loading} className="btn" id="btn" type="submit" value={loading ? "Loading..." :"Sign Up"}/>

          <p className="formfooter">
            Already have an account?  <Link to="/"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
