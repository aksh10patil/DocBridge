import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
        /*
      const mockData = [
        { id: 1, patientName: 'John Doe', date: '2024-11-23', time: '10:00 AM', reason: 'Routine check-up', status: 'Pending' },
        { id: 2, patientName: 'Jane Smith', date: '2024-11-24', time: '2:00 PM', reason: 'Consultation', status: 'Pending' },
        { id: 3, patientName: 'Sam Brown', date: '2024-11-25', time: '11:00 AM', reason: 'Follow-up', status: 'Pending' },
      ];

      // Simulating a network request
      setTimeout(() => {
        setAppointments(mockData);
        setLoading(false);
      }, 100);
    };
*/  try {
    const response = await axios.get("http://localhost:3000/api/v1/appointmentpanel/appointments"); // Replace with backend URL
    setAppointments(response.data.list);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

    fetchAppointments();
  }, []);

  // Function to handle accept or reject

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading appointments...</div>;
  }

  return (

     
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>


      {/* Header Component */}
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
                        Login/Signup
                    </div>
                </div>
            </div> 



      
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '30px' }}>Doctor's Appointment Dashboard</h1>
      {appointments.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h2 style={{ marginBottom: '5px' }}>Patient: {appointment.patientname}</h2>
                <p><strong>Doctor:</strong> {appointment.doctorname}</p>
                <p><strong>Date:</strong> {appointment.day}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Reason:</strong> {appointment.healthconcern}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              <div style={{ marginTop: '10px' }}>
                {appointment.status === 'Pending' ? (
                  <>
                    <button
                      onClick={async() => {
                        await axios.put(`http://localhost:3000/api/v1/appointmentpanel/appointmentupdate?id=${appointment._id}`, {
                          status: "accepted",
                        });
                        setAppointments((prevAppointments) =>
                        prevAppointments.map((item) =>
                         item._id === appointment._id // 
                          ? { ...item, status: "accepted" }
                          : item
                       )
                        );
                     }}
                      style={{
                        marginRight: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#C2F2F2',
                        color: 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={async() => {
                        await axios.put(`http://localhost:3000/api/v1/appointmentpanel/appointmentupdate?id=${appointment._id}`, {
                          status: "rejected",
                        });
                           setAppointments((prevAppointments) =>
                           prevAppointments.map((item) =>
                            item._id === appointment._id // Compare `_id` for unique matching
                             ? { ...item, status: "Rejected" }
                             : item
                          )
                           );
                        }}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#F44336",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                      }}
                    >
  Reject
</button>
                  </>
                ) : (
                  <p>
                    Appointment {appointment.status}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );
};

export default AppointmentList;
