import React, { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {
  const token = localStorage.getItem("token");
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/owner/ratings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRatings(res.data));

    axios
      .get("http://localhost:5000/owner/average", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAverage(res.data.average));
  }, []);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      <p>Average Rating: {average}</p>

      {ratings.map((r, i) => (
        <p key={i}>
          {r.name} rated {r.rating}
        </p>
      ))}
    </div>
  );
}

export default OwnerDashboard;
