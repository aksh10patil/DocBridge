import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-custom-alert';
import { Statecontext } from './StateContext';


function Patient_info() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setname]  = useState("");
  const [height, setheight] = useState("");
  const [age, setage] = useState("");
  const [weight, setweight] = useState("");
  const [gender, setgender] = useState("");
  const [healthconcern, sethealthconcern] = useState("");
  const [bloodtype, setbloodtype] = useState("");
  const [patient, setPatient] = useState([]);

  const { token, settoken } = useContext(Statecontext);
  const fetchinfo = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/patientpanel/patientinfo", {
        name,
        height,
        weight,
        age,
        bloodtype,
        healthconcern,
        gender
      });
      console.log("Response:", response.data);
      localStorage.setItem("PatientId", response.data.patient._id);

    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  

  const toggleEdit = () => setIsEditing(!isEditing);

 
  const handleChange = (field, value) => {
    setPatient({ ...patient, 
      [field]: value });
  };

  return ( 
        


    <div className="min-h-screen bg-gray-100 p-6">
           <div className="flex justify-between p-2 bg-maingreen">
                <div className="min-w-32 h-10 bg-maingreen grid place-items-center rounded  ">
                    <p className="item-center font-bold text-black-400 hover:text-sky-400 cursor-pointer ">DOCBRIDGE</p>
                </div>
                <div className="flex w-1/2 justify-evenly mt-2 font-semibold cursor-pointer">
                    <a href="/home" className="text-center">
                        Home
                    </a>
                    <a href="appointmentpanel" className="text-center">
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


      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      
        <div className="border-b border-gray-300 pb-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Patient Information</h2>
          <p className="text-gray-500">Fill your details</p>
          <div className="flex items-center justify-between">
            {isEditing ? (
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {handleChange("name", e.target.value);
                  setname(e.target.value)
                }
                }
                className="text-2xl font-semibold text-slate-900 border-b-2 border-gray-300 outline-none"
                />
              
              
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            )}
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-maingreen text-black font-semibold rounded-lg 
              hover:bg-maingreen-600 focus:outline-none focus:ring focus:ring-blue-300 
              focus:outline-none"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        
        <div className="gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm  w-full  grid grid-cols-2 gap-4">
              {isEditing ? (
                <>
                <label className="text-2xl font-medium text-gray-700 capitalize ">Height
                  <input
                    type="text"
                    value={height}
                    placeholder="Height"
                    onChange={(e) => {handleChange(e.target.value),
                      setheight(e.target.value);
                    }}
                    className="w-full text-lg font-semibold text-slate-700 border-b-2 border-gray-300 outline-none p-1"
                  />
                </label>
                
                <label className="text-2xl font-medium text-gray-700 capitalize">Weight
                  <input
                    type="text"
                    value={weight}
                    placeholder='weight'
                    onChange={(e) => {handleChange(e.target.value),
                      setweight(e.target.value);
                    }}
                    className="w-full text-lg font-semibold text-slate-700 border-b-2 border-gray-300 outline-none p-1 "
                  />
                </label>
                <label className="text-2xl font-medium text-gray-700 capitalize">Age
                  <input
                    type="text"
                    value={age}
                    placeholder='Age'
                    onChange={(e) => {handleChange(e.target.value),
                      setage(e.target.value);
                    }}
                    className="w-full text-lg font-semibold text-slate-700 border-b-2 border-gray-300 outline-none p-1"
                    />
                </label>
                <label className="text-2xl font-medium text-gray-700 capitalize">Blood group
                  <input
                    type="text"
                    value={bloodtype}
                    placeholder='Blood group'
                    onChange={(e) => {handleChange(e.target.value),
                      setbloodtype(e.target.value);
                    }}
                    className="w-full text-lg font-semibold text-slate-700 border-b-2 border-gray-300 outline-none p-1"
                    />
                </label>
                <label className="text-2xl font-medium text-gray-700 capitalize">Gender
                  <input
                    type="text"
                    value={gender}
                    placeholder='Gender'
                    onChange={(e) => {handleChange(e.target.value),
                      setgender(e.target.value);
                    }}
                    className="w-full text-lg font-semibold text-slate-700 border-b-2 border-gray-300 outline-none p-1"
                    />
                </label>
                </>
              ) : (
                <>
                <label className="text-2xl font-semibold text-gray-900">Height
                    <p className='w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 outline-none p-1'>{height}</p>
                </label>
                <label className="text-2xl font-semibold text-gray-900">Weight
                    <p className='w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 outline-none p-1'>{weight}</p>
                </label>
                <label className="text-2xl font-semibold text-gray-900">Age
                    <p className='w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 outline-none p-1'>{age}</p>
                </label>
                <label className="text-2xl font-semibold text-gray-900">Blood group
                    <p className='w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 outline-none p-1'>{bloodtype}</p>
                </label>  
                <label className="text-2xl font-semibold text-gray-900">Gender
                    <p className='w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 outline-none p-1'>{gender}</p>
                </label> 
                
                </>
              )}
            </div>
          
        </div>

        
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          {isEditing ? (
            <>
            <label className="text-2xl font-semibold text-gray-700 capitalize">Health Concern</label>
            <textarea
            className="w-full p-2 border border-gray-300 rounded-md outline-none text-gray-700"
            onChange={(e)=>{
              sethealthconcern(e.target.value);
            }}
            />
            </>
          ) : (
            <>

            <div className="text-2xl font-semibold text-gray-900 -mt-3">HealthConcern
              <div className="space-y-3 text-gray-700 font-normal text-lg">
                <div>{healthconcern}</div>
              </div>
            </div>
            
            </>
            
          )}
        </div>
        <button
              onClick={()=>{
                if(isEditing==true){
                  toast.warning("Please save your details")
                }else if(name=="" || height=="" || weight=="" || age=="" || bloodtype=="" || healthconcern==""){
                  toast.warning("Plese fill the details")
                }else{
                fetchinfo();
                navigate("/doctorinfo")
                }
              }}
              className="px-4 py-2 bg-maingreen text-black font-semibold rounded-lg 
              hover:bg-maingreen-600 focus:outline-none focus:ring focus:ring-blue-300 
              focus:outline-none"
            >
              Next
            </button>
      </div>
    </div>
  );
}

export default Patient_info;