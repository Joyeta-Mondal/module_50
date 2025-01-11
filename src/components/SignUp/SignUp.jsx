import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState("");
  const [showPassEye, setShowPassEye] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const terms = e.target.terms.checked;
    const photo = e.target.photo.value;

    setError("");
    setSuccessMsg(false);

    if (password.length < 6) {
      setError("Password should be at least of 6 characters.");
      return;
    }

    if (!terms) {
      setError("Please accept out terms and conditions to sign up.");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should have at least one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password, name, photo)
      .then((result) => {
        console.log(result.user);
        setSuccessMsg(true);
        // send verification email
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification done!");
        });
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
        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        {/* photo url */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered"
            required
          />
        </div>
        {/* password */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassEye ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassEye(!showPassEye)}
            className="btn btn-xs absolute right-2 top-12"
          >
            {showPassEye ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        <div className="form-control">
          <label className="label justify-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-primary"
            />
            <span className="label-text">
              Accept our terms and conditions to sign up
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {error && <p className="text-red-700">{error}</p>}
      {successMsg && <p className="text-green-700">Successfully Signed Up !</p>}
      <p>
        Already have an account?{" "}
        <Link className="text-blue-500" to="/login">
          Login here!
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
