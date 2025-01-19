import './App.css'
import Signin from './components/patientpov/Signin'
import Signup from './components/patientpov/Signup'
import Doctor_panel from './components/patientpov/Doctor_panel'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Patient_info from './components/patientpov/Patient_info';
import Home from './components/patientpov/Home';
import Doctor_info from './components/patientpov/Doctor_info';
import StateProvider from './components/StateProvider';
import Doctor_intro from './components/patientpov/Doctor_intro';
import AppointmentPanel from './components/patientpov/AppointmentPanel';
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import AppointmentList from './components/Doctor pov/AppointmentList';
import DoctorLogin from './components/Doctor pov/DoctorLogin';
import Patientinfo2 from './components/patientpov/patientinfo2';
function App() {

  return (
    <>
      <Router>
        <StateProvider>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="signin" element={<Signin/>}/>
          <Route path="doctorpanel" element={<Doctor_panel/>}/>
          <Route path="patientinfo" element={<Patient_info/>}/>
          <Route path="Doctorinfo" element={<Doctor_info/>}></Route>
          <Route path="Doctorintro" element={<Doctor_intro/>}></Route>
          <Route path="/Home" element={<Home/>}/>
          <Route path="appointmentpanel" element={<AppointmentPanel/>}/>
          <Route path="appointmentlist" element={<AppointmentList/>}/>
          <Route path="doctorlogin" element={<DoctorLogin/>}/>
          <Route path="patientinfo2" element={<Patientinfo2/>}/>
        </Routes>
        </StateProvider>
      </Router>
      <ToastContainer floatingTime={5000} />
    </>
  )
}

export default App
