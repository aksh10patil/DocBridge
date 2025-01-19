import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Statecontext } from './StateContext';

export default function Doctor_panel() {
  const [doctordetails, setdoctordetails] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientdetail, setpatientdetail] = useState("");
  const [params] = useSearchParams();
  const id = params.get('id');
  const [appointmentobject_id, setappointmentobject_id] = useState("");
  const patientid = localStorage.getItem("PatientId");
  const Navigate = useNavigate();
  const [status, setstatus] = useState("Pending");
  let object_id;
  const { token, settoken } = useContext(Statecontext);


  //fetching the patient details to show in the appointment panel 
  useEffect(()=>{

    const fetchpatientdetail = async()=>{
      const response = await axios.get(`http://localhost:3000/api/v1/patientpanel/particularpatient?patientid=${patientid}`)
      console.log(response.data);
      setpatientdetail(response.data.patient);
    } 
    fetchpatientdetail();
  },[patientid])

  useEffect(()=>{

  },[patientdetail]);
  
  useEffect(()=>{

    const fetchdoctordetails = async()=>{
      const response = await axios.get(`http://localhost:3000/api/v1/doctorpanel/particulardetail?id=${id}`)
      setdoctordetails(response.data.doctors);
    }
    fetchdoctordetails();
  },[id])

  useEffect(()=>{

  }),[doctordetails]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  const handleBooking = () => {
    if (selectedDay && selectedTime) {
      alert(`Appointment booked on ${selectedDay} at ${selectedTime}`);
      window.location.href=`/appointmentpanel?id=${appointmentobject_id}`;
    } else {
      alert("Please select a day and time slot");
    }
  };


      const sendinglist = async()=>{
        try{
        const response = await axios.post("http://localhost:3000/api/v1/appointmentpanel/appointmentlist",{
          patientname: patientdetail.name,
          healthconcern: patientdetail.healthconcern,
          doctorname: doctordetails.name,
          speciality: doctordetails.speciality,
          date: selectedDay,
          time: selectedTime,
          status: status
        })
        console.log("console",response.data.appointments._id)
        object_id = response.data.appointments._id;
      }catch(e){
        console.log("error",e);
      }
      }


  return (
    <div>
      <div className="flex justify-between p-2 bg-maingreen">
                <div className="min-w-32 h-10 bg-maingreen grid place-items-center rounded  ">
                    <p className="item-center font-bold text-black-400 hover:text-sky-400 cursor-pointer ">DOCBRIDGE</p>
                </div>
                <div className="flex w-1/2 justify-evenly mt-2 font-semibold cursor-pointer">
                    <a href="/home" className="text-center">
                        Home
                    </a>
                    <a href="/apointmentpanel" className="text-center">
                        Appointment
                    </a>
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

        
          <div className="mt-8">
        <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col space-y-4">
          {/* Doctor's Information */}
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/3">
              <img
                src="https://via.placeholder.com/300"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-gray-800">{doctordetails.name}</h2>
                <p className="mt-4 text-gray-600 text-justify">
                  {doctordetails.about}
                </p>
              </div>
              <div className="mt-4">
                <span className="font-semibold text-gray-700">Appointment Fee:</span>
                <span className="ml-2 text-green-600">{doctordetails.fee}</span>
              </div>
            </div>
          </div>

          {/* Booking Slot Selection */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Select a Booking Slot</h3>

            {/* Day Selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1 rounded ${
                    selectedDay === day ? "bg-maingreen text-black" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time Slot Selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-1 rounded ${
                    selectedTime === time ? "bg-maingreen text-black" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Book Appointment Button */}
            <button
              onClick={async() => {
                await sendinglist(); // Call the function after checking conditions
                if (selectedDay && selectedTime) {
                  alert(`Appointment booked on ${selectedDay} at ${selectedTime}`);
                  Navigate( `/appointmentpanel`); 
                } else {
                  alert("Please select a day and time slot");
                }
              }}
              
              className="px-6 py-2 bg-maingreen text-black rounded hover:bg-white hover:border-dotted border-2 border-sky-500"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
