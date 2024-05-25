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

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  return (
    <div className="container mx-auto p-4 h-screen overflow-auto">
      <h1 className="text-2xl font-bold py-4 text-center text-white">
        Emergency Department Wait Times
      </h1>
      <div className="overflow-y-scroll max-h-[80vh] scrollbar">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="text-sm p-4 rounded shadow mb-4 bg-slate-800 text-white flex flex-col gap-2 justify-center"
          >
            <div className="flex flex-col md:flex-row justify-center items-center">
              <h2 className="text-lg font-semibold">
                {hospital.hospital_name}
              </h2>
            </div>
            <div className="flex justify-center gap-2">
              <strong className="text-bold text-white"></strong>
              <p className="text-md">{hospital.wait_time}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-around">
              <a
                href={hospital.directions}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
              >
                <i className="fas fa-directions"></i> Directions
              </a>
              {isValidHttpUrl(hospital.website) ? (
                <a
                  href={hospital.website}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition"
                >
                  <i className="fas fa-globe"></i> Website
                </a>
              ) : (
                hospital.website.startsWith("tel:") && (
                  <a
                    href={hospital.website}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-xl transition"
                  >
                    <i className="fas fa-phone"></i> Call
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
