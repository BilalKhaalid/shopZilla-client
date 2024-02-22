import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/UserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/Api";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        dob: date,
        _id: user.uid,
      });
      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as MessageResponse;
        toast.error(message.message);
      }

      console.log(user);
    } catch (error) {
      toast.error("Sign In Failed");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label htmlFor="">Gender</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date of Birth</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>Already Signed In?</p>
          <button onClick={loginHandler}>
            <FcGoogle className="icon" /> <span>Sign In With Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};
export default Login;
