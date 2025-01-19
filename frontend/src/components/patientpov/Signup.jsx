import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Statecontext } from './StateContext';
import { toast } from 'react-custom-alert';

export default function Signup() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();
    const { token, settoken } = useContext(Statecontext);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-6/12 rounded-md bg-slate-100 text-center flex font-Poppins shadow-lg">
                <div className="">
                    <img className="rounded-md w-74" src="/projectLogin.PNG" alt="Login Visual" />
                </div>
                <div className="m-5 ml-12 text-left">
                    <p className="font-Poppins text-slate-500">Welcome Back👋</p>
                    <h2 className="text-xl font-semibold font-Poppins mb-3">Sign up to your Account</h2>
                    <label className="block text-slate-600">
                        Firstname
                        <input
                            type="text"
                            placeholder="Jane"
                            className="border w-full h-8 rounded pl-3 mb-3"
                            onChange={(e) => {
                                setFirstname(e.target.value);
                            }}
                        ></input>
                    </label>
                    <label className="block text-slate-600">
                        Lastname
                        <input
                            type="text"
                            placeholder="Smith"
                            className="border w-full h-8 rounded pl-3 mb-3"
                            onChange={(e) => {
                                setLastname(e.target.value);
                            }}
                        ></input>
                    </label>
                    <label className="block text-slate-600">
                        Email
                        <input
                            type="text"
                            placeholder="abcd@gmail.com"
                            className="border w-full h-8 rounded pl-3 mb-3"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        ></input>
                    </label>
                    <label className="block text-slate-600">
                        Password
                        <input
                            type="password"
                            placeholder=". . . . . . . . ."
                            className="border w-full h-8 rounded pl-3 mb-3 text-left"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></input>
                    </label>
                    <button
                        className="w-full rounded-md border p-1 bg-[#91CDCB]"
                        onClick={async () => {
                            if(firstname == "" && lastname == "" && email == "" && password == ""){
                                toast.warning("Please fill the details")
                            }else{
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    firstname,
                                    lastname,
                                    email,
                                    password,
                                });
                                settoken(response.data.token);
                                localStorage.setItem("token", response.data.token);
                                navigation("/Home");
                            } catch (e) {
                                alert("Account with this email or username already exists. Please try logging in instead.");
                            }
                           }
                        }}
                    >
                        <p className="text-white">Sign up</p>
                    </button>
                    <div className="flex justify-center font-sans text-base font-normal text-slate-500 pt-4 -mt-3">
                        <div>Already have an account?</div>
                        <div
                            className="underline decoration-solid pl-3 cursor-pointer"
                            onClick={() => {
                                navigation("/signin");
                            }}
                        >
                            Signin
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
