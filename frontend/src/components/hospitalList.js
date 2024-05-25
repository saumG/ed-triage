import React, { useEffect, useState } from "react";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch("https://d1-ed.saumster123.workers.dev/api/hospitals", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setHospitals(data));
  }, []);

  return (
    <div className="container mx-auto p-4 mt-4 h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-4">
        Emergency Department Wait Times
      </h1>
      <div className="overflow-y-scroll max-h-[80vh] scrollbar">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="text-sm p-4 rounded shadow mb-4 bg-slate-700 flex flex-col gap-2 justify-center"
          >
            <div className="flex justify-around">
              <h2 className="text-lg font-semibold">
                {hospital.hospital_name}
              </h2>
              <p className="text-md">{hospital.wait_time}</p>
            </div>
            <div className="flex justify-around">
              <div className="rounded-xl border-blue-600 border p-4">
                <a href={hospital.directions}>Directions</a>
              </div>
              <div className="rounded-xl border-blue-600 border p-4">
                <a href={hospital.website}>Website</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
