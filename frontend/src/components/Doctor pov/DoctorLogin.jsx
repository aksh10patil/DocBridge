import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-custom-alert";

export default function DoctorLogin() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const Navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const doctornumber = localStorage.getItem("Doctorid")

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
                        Signin in to your Doctor Account
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
                            if (email === "" || password === "") {
                                toast.warning("Fill in the details");
                            } else if (!emailRegex.test(email)) {
                                toast.warning("Please enter a valid email (e.g., user@email.com)");
                            } else if (password.length < 8) {
                                toast.warning("Password should be at least 8 characters");
                            }else if(doctornumber.length > 0){
                                    Navigate("/appointmentlist")
                            }else{
                                 Navigate("/Doctorintro")
                            }
                            }
                        }
                        
                    >
                        <p className="text-white">Sign in</p>
                    </button>
                    <div className="flex justify-center font-sans text-base font-normal text-slate-500 pt-4 -mt-3">
                        <div>Don't have an account?</div>
                        <div
                            className="underline decoration-solid pl-3 cursor-pointer"
                        >
                            Sign Up
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
