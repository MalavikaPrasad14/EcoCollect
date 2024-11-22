import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; // Import useLocation
import Login from './components/shared/Login';
import Home from './components/Customer/Home';
import './assets/css/Login.css';
import NewBooking from './components/Customer/NewBooking';


function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const location = useLocation(); // Get current location

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <>
      {/* Conditionally render the container div only on the login page */}
      {location.pathname === '/' ? (
        <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <Routes>
            <Route path="/" element={<Login onToggleSignUpMode={toggleSignUpMode} isSignUpMode={isSignUpMode} />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/new-booking' element={<NewBooking/>}/>
        </Routes>
      )}
    </>
  );
}

export default App;
