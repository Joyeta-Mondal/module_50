import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    setError("");
    setSuccessMsg(false);

    if (password.length < 6) {
      setError("Password should be at least of 6 characters.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((result) => {
        console.log(result.user);
        setSuccessMsg(true);
      })
      .catch((error) => {
        setError(error.message);
        setSuccessMsg(false);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto my-12 shrink-0 shadow-2xl">
      <h1 className="text-3xl font-bold text-center">Sign Up now!</h1>
      <p className=" text-center py-6">
        Please Sign up for an efficient and smooth experience.
      </p>
      <form onSubmit={handleSignUp} className="card-body">
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
        {/* username */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
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
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {error && <p className="text-red-700">{error}</p>}
      {successMsg && <p className="text-green-700">Successfully Signed Up!</p>}
    </div>
  );
};

export default SignUp;
