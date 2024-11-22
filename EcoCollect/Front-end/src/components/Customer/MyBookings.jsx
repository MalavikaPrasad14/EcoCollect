import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState({ upcoming: [], completed: [] });

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get("http://localhost:4000/booking/post"); // Backend endpoint
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {/* Upcoming and Completed sections here */}
    </div>
  );
};

export default MyBookings;
