// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   const [stores, setStores] = useState([]);
//   const [ratings, setRatings] = useState({});

//   useEffect(() => {
//     if (!token) return;

//     axios
//       .get("http://localhost:5000/user/stores", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => setStores(res.data))
//       .catch((err) => console.log(err));
//   }, [token]);

//   const submitRating = async (storeId) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/user/rate",
//         {
//           store_id: storeId,
//           rating: ratings[storeId],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Rating submitted successfully");
//     } catch {
//       alert("Failed to submit rating");
//     }
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Role: {role}</p>

//       {stores.length === 0 && <p>No stores available</p>}

//       {stores.map((store) => (
//         <div
//           key={store.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           <p><b>{store.name}</b></p>
//           <p>{store.address}</p>

//           <input
//             type="number"
//             min="1"
//             max="5"
//             placeholder="Rate (1–5)"
//             onChange={(e) =>
//               setRatings({ ...ratings, [store.id]: e.target.value })
//             }
//           />

//           <button onClick={() => submitRating(store.id)}>
//             Submit Rating
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState({});

  const fetchStores = () => {
    axios
      .get(`http://localhost:5000/user/stores?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStores(res.data));
  };

  useEffect(() => {
    if (role === "USER") fetchStores();
  }, [role]);

  const submitRating = (storeId) => {
    axios
      .post(
        "http://localhost:5000/user/rate",
        { store_id: storeId, rating: rating[storeId] },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Rating saved");
        fetchStores();
      });
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
  <div className="container">
    <div className="header">
      <h2>User Dashboard</h2>
      <button className="secondary" onClick={logout}>Logout</button>
    </div>

    <div className="search-bar">
      <input
        placeholder="Search by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchStores}>Search</button>
    </div>

    {stores.map((store) => (
      <div className="card" key={store.id}>
        <h3>{store.name}</h3>
        <p>{store.address}</p>
        <p><b>Overall Rating:</b> {store.overallRating || "N/A"}</p>
        <p><b>Your Rating:</b> {store.userRating || "Not rated"}</p>

        <div className="rating-box">
          <input
            type="number"
            min="1"
            max="5"
            placeholder="1–5"
            onChange={(e) =>
              setRating({ ...rating, [store.id]: e.target.value })
            }
          />
          <button onClick={() => submitRating(store.id)}>
            Submit / Update
          </button>
        </div>
      </div>
    ))}
  </div>
);

}

export default Dashboard;


