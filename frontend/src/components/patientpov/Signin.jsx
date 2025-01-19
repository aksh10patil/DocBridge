import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Statecontext } from "./StateContext";
import axios from "axios";
import { toast } from "react-custom-alert";

export default function Signin() {
    const { token, settoken } = useContext(Statecontext);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-6/12 rounded-md bg-slate-100 text-center flex shadow-lg">
                <div>
                    <img
                        className="h-96 rounded-md"
                        src="/projectLogin.PNG"
                        alt="Login Visual"
                    />
                </div>
                <div className="m-7 ml-12 text-left font-Poppins">
                    <p className="font-Poppins text-slate-500">Welcome Back👋</p>
                    <h2 className="text-xl font-semibold font-Poppins mb-5">
                        Login to your Account
                    </h2>
                    <label className="block mb-2 mt-12 text-slate-600">
                        Email
                        <input
                            type="text"
                            placeholder="abcd@gmail.com"
                            className="border w-full h-8 rounded pl-3 mb-3"
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        ></input>
                    </label>
                    <label className="block mb-2 mt-1 text-slate-600">
                        Password
                        <input
                            type="password"
                            placeholder=". . . . . . . . ."
                            className="border w-full h-8 rounded pl-3 mb-3"
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                        ></input>
                    </label>
                    <button
                        className="w-full rounded-md border p-1 bg-[#91CDCB]"
                        onClick={async () => {
                            if(email == "" && password == ""){
                                toast.warning("Please fill the details")
                            }else{
                            try {
                                const response = await axios.post(
                                    "http://localhost:3000/api/v1/user/signin",
                                    {
                                        email,
                                        password,
                                    }
                                );
                                if (response.data.message === "enter an valid username or password") {
                                    toast.warning(response.data.message); // Show the message from the response
                                }else{
                                settoken(response.data.token);
                                localStorage.setItem("token", response.data.token);
                                navigate("/home")
                                }
                            } catch (e) {
                                console.log("error details", e);
                                alert("Enter valid email or password");
                            }
                        }
                        }}
                    >
                        <p className="text-white">Sign in</p>
                    </button>
                    <div className="flex justify-center font-sans text-base font-normal text-slate-500 pt-4 -mt-3">
                        <div>Don't have an account?</div>
                        <div
                            className="underline decoration-solid pl-3 cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Sign Up
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
