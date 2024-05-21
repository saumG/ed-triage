import React, { useEffect, useState } from "react";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch("https://d1-ed.saumster123.workers.dev/api/hospitals")
      .then((response) => response.json())
      .then((data) => setHospitals(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Emergency Department Wait Times
      </h1>
      {hospitals.map((hospital) => (
        <div key={hospital.id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{hospital.name}</h2>
          <p>Wait Time: {hospital.wait_time}</p>
          <p>
            Directions: <a href={hospital.directions}>{hospital.directions}</a>
          </p>
          <p>
            Website: <a href={hospital.website}>{hospital.website}</a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
