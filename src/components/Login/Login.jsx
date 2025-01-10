import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const handleLogin = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    setSuccessMsg(false);
    setLoginErr("");

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password, username)
      .then((result) => {
        console.log(result.user);

        if (result.user.emailVerified) {
          setLoginErr("Please verify your email.");
        } else {
          setSuccessMsg(true);
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        setLoginErr(error.message);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <h1 className="text-4xl text-center font-bold">Login!</h1>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {successMsg && (
        <p className="text-green-700 text-xl ">User Login Successful!</p>
      )}
      {loginErr && <p className="text-red-700  text-xl">Login Failed!</p>}
      <p>
        New here? Please{" "}
        <Link className="text-blue-600" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
