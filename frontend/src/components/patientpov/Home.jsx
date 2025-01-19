import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Statecontext } from './StateContext';
import { ToastContainer, toast } from 'react-custom-alert';

export default function Home(){
    const [open, setopen] = useState(true);
    const patientnumber = localStorage.getItem("PatientId");
    const Navigate = useNavigate();
    const handleproceeding = ()=>{
        if(patientnumber){
        Navigate("/doctorinfo");
        }else{
            toast.info("Please fill some details before proceeding"); 
            Navigate("/patientinfo")
        }
    }
    const { state, setState, district, setDistrict, specialist, setSpecialist, token, settoken } = useContext(Statecontext);
    return (
        <>
            <div className="flex justify-between p-4">
            <div className="min-w-32 h-10 bg-maingreen grid place-items-center rounded  ">
                    <p className="item-center font-bold text-black-400 hover:text-sky-400 cursor-pointer ">DOCBRIDGE</p>
                </div>
                <button onClick={()=>{
                    window.location.href="doctorlogin"
                }}className='-ml-80 border-2 rounded font-bold border-teal-100'>Doctor Panel</button>
                <div className="flex w-1/2 justify-evenly mt-2 font-semibold cursor-pointer">                                   
                <a href="/home" className="hover:decoration-white">Home</a>
                    <a href="/appointmentpanel" className="hover:decoration-white">Appointments</a>
                    <a href="/features" className="hover:decoration-white">Features</a>
                    <a href="/listings" className="hover:decoration-white">Listings</a>
                    {token == "" ?<a href="/" className="hover:decoration-white">Login/Signup</a>: <img src='/user.png' className='w-6 h-6' onClick={()=>{
                        if(patientnumber){
                            Navigate("/patientinfo2")
                        }else{
                            toast.warning("Please fill your details first (name and other details)")
                        }
                    }}/>}
                </div>
            </div>
            <div className="bg-[#C3EAEA] p-4">
                <div className="bg-[#C3EAEA] p-4 flex">
                    <img src='/Doctorpage.PNG' className="h-1/5 w-2/5 ml-24"/>
                    <div className="text-left ml-16">
                        <div className="font-bold text-4xl mt-24">BOOK YOUR DOCTOR!</div>
                        <div className="text-lg">India’s best online appointment scheduling platform</div>
                    </div>
                </div>
                <div className="flex justify-around">
                    <select className="border w-80 h-12 rounded-md text-slate-600 text-lg" onChange={(e)=>{
                        setState(e.target.value);
                    }}>
                        <option>State</option>
                        <option>Delhi</option>
                        <option>Haryana</option>
                        <option>Uttar Pradesh</option>
                        <option>Chattishgarh</option>
                        <option>Madhya Pradesh</option>
                    </select>
                    <select className="border w-80 h-12 rounded-md text-slate-600 text-lg" onChange={(e)=>{
                        setDistrict(e.target.value);
                    }}>
                        {state == "Uttar Pradesh" ?
                        <>
                            <option>Agra</option>
                            <option>Lucknow</option>
                            <option>Meerut</option>
                            <option>Varanasi</option>
                            <option>Lucknow</option>
                        </>
                    : state == "Haryana" ? 
                        <>
                            <option value="gurugram">Gurugram</option>
                            <option value="faridabad">Faridabad</option>
                            <option value="panipat">Panipat</option>
                            <option value="ambala">Ambala</option>
                            <option value="hisar">Hisar</option>
                        </>
                    : state == "Delhi" ? 
                        <>
                            <option value="new-delhi">New Delhi</option>
                            <option value="central-delhi">Central Delhi</option>
                            <option value="south-delhi">South Delhi</option>
                            <option value="west-delhi">West Delhi</option>
                            <option value="north-delhi">North Delhi</option>
                        </>
                    : state == "Chattishgarh" ? 
                        <>
                            <option value="raipur">Raipur</option>
                            <option value="bilaspur">Bilaspur</option>
                            <option value="durg">Durg</option>
                            <option value="korba">Korba</option>
                            <option value="bastar">Bastar</option>
                        </>
                    : state == "Madhya Pradesh" ? 
                        <>
                            <option value="indore">Indore</option>
                            <option value="bhopal">Bhopal</option>
                            <option value="gwalior">Gwalior</option>
                            <option value="jabalpur">Jabalpur</option>
                            <option value="ujjain">Ujjain</option>
                        </>
                    :<option>District</option>}
                    </select>
                    <select className="border w-80 h-12 rounded-md text-slate-600 text-lg" onChange={(e)=>{
                        setSpecialist(e.target.value); 
                    }}>
                        <option>Doctor/Speciality</option>
                        <option>ENT</option>
                        <option>CARDIOLOGY</option>
                        <option>GYNOLOGY</option>
                        <option>AYURVEDIC</option>
                    </select>
                    <button className="p-3 w-24 bg-white rounded-full hover:bg-cyan-100" onClick={()=>
                        handleproceeding()
                        }>Search</button>
                </div>
            </div>


         
            <div className="flex flex-wrap justify-center gap-8 mt-12 mb-20">
                <div className="flex flex-col items-center h-auto w-80 border border-gray-300 rounded-2xl shadow-lg p-6">
                    <img src="/easy.PNG" className="h-32 w-32 object-contain mb-6" alt="Easy Appointments" />
                    <div className="text-green-500 text-xl text-center mb-4">Easy Appointments, Expert Care</div>
                    <p className="text-slate-500 text-center text-lg leading-relaxed">
                        Simplify your healthcare journey. Book appointments with top doctors effortlessly, from the comfort of your home.
                    </p>
                </div>
                <div className="flex flex-col items-center h-auto w-80 border border-gray-300 rounded-2xl shadow-lg p-6">
                    <img src="/know.PNG" className="h-32 w-32 object-contain mb-6" alt="Know Your Doctor" />
                    <div className="text-green-500 text-xl text-center mb-4">Know your Doctor</div>
                    <p className="text-slate-500 text-center text-lg leading-relaxed">
                        Empower yourself with knowledge. Learn about your doctor's qualifications, experience, and approach to care. 
                    </p>
                </div>
                <div className="flex flex-col items-center h-auto w-80 border border-gray-300 rounded-2xl shadow-lg p-6">
                    <img src="/book consult.PNG" className="h-32 w-32 object-contain mb-6" alt="Book Consult Recover" />
                    <div className="text-green-500 text-xl text-center mb-4">Book, Consult, Recover.</div>
                    <p className="text-slate-500 text-center text-lg leading-relaxed">
                        Simplify your healthcare journey. Book appointments, consult with experts, and recover faster.
                    </p>
                </div>
            </div>

            <div className="w-full h-auto bg-teal-100 py-10 flex justify-around items-start">
                <div className="max-w-sm">
                    <div className="text-3xl text-cyan-500 font-semibold">DOCBRIDGE</div>
                    <div className="text-lg text-slate-500 mt-4">
                    DocBridge is your trusted partner in bridging the gap between patients and healthcare professionals. 
                    Our mission is to make healthcare accessible, efficient, and stress-free for everyone.
                    </div>
                </div>


                <div className="max-w-sm">
                    <div className="text-xl font-semibold">COMPANY</div>
                    <ul className="text-lg text-slate-500 mt-4 space-y-2">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Help</li>
                    </ul>
                </div>


                <div className="max-w-sm">
                    <div className="text-xl font-semibold">GET IN TOUCH</div>
                    <div className="text-lg text-slate-500 mt-4 space-y-2">
                    <p>+0-000-000-000</p>
                    <p>DocBridge@gmail.com</p>
                    </div>
                </div>
                </div>           
        </>
    )
}