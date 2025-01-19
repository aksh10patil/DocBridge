import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Statecontext } from './StateContext';

export default function AppointmentPanel() {
  const [appointments, setappointments] = useState([]);
  const { token, settoken } = useContext(Statecontext);

  useEffect(() => {
    const fetchinglist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/appointmentpanel/appointments"
        );
        setappointments(response.data.list);
        console.log(response.data.list);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };
    fetchinglist();
  }, []);

  return (
    <>
      <div className="flex justify-between p-2 bg-maingreen">
                <div className="min-w-32 h-10 bg-maingreen grid place-items-center rounded  ">
                    <p className="item-center font-bold text-black-400 hover:text-sky-400 cursor-pointer ">DOCBRIDGE</p>
                </div>
                <div className="flex w-1/2 justify-evenly mt-2 font-semibold cursor-pointer">
                    <div className="text-center">
                        Home
                    </div>
                    <div className="text-center">
                        Appointment
                    </div>
                    <div className="text-c
                     enter">
                        Features
                    </div>
                    <div className="text-center">
                        Listings
                    </div>
                    <div className="text-center">
                    {token == "" ?<a href="/" className="hover:decoration-white">Login/Signup</a>: <img src='/user.png' className='w-6 h-6' onClick={()=>{
                        if(patientnumber){
                            Navigate("/patientinfo2")
                        }else{
                            toast.warning("Please fill your details first (name and other details)")
                        }
                    }}/>}
                    </div>
                </div>
            </div> 

      {appointments.map((appointment) => {
        return (
          <div key={appointment._id} className="mt-7 mb-7 shadow-cyan-100 flex justify-between p-4 shadow-3xl"
          >
            <div className="text-left ml-12 border p-2 shadow-xl">
              <h1 className="font-semibold text-2xl">Patientname: <span className="font-normal">{appointment.patientname}</span></h1>
              <h1 className="font-semibold text-2xl">Doctorname: <span className="font-normal">{appointment.doctorname}</span></h1>
              <p><span className="font-semibold text-xl">Healthconcern: </span><span className="text-lg">{appointment.healthconcern}</span></p>
              <p><span className="font-semibold text-xl">Specialist: </span><span className="text-lg">{appointment.speciality}</span></p>
              <p><span className="font-semibold text-xl">Day and Time: </span><span>{appointment.day} || {appointment.time}</span></p>
              <p><span className="font-semibold text-xl">Status: </span><span className="text-lg">{appointment.status}</span></p>
            </div>
            <div className="mr-12">
              <button className="bg-cyan-100 p-1 text-lg rounded mt-9 text-red-600">
                {appointment.status}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
