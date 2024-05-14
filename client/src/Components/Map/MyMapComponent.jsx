import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useOutletContext } from "react-router-dom";
function MyMapComponent() {
  const [auth] = useOutletContext();
  const [mapData, setmapData] = useState([]);
  console.log(mapData);
  useEffect(() => {
    setmapData([]);
    mapFunction();
  }, []);

  const mapFunction = async () => {
    const resp = await fetch("http://localhost:5000/job/nearByJobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await resp.json();
    setmapData([data.returnData]);
    console.log(mapData);
  };

  console.log(mapData.companyLocation);
  return (
    <MapContainer
      center={[19.16155, 72.85614]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*       {mapData.map((data, index) => 

          {mapData[index] && (        <Marker key={index} position={data.companyLocation}>
          {console.log(data.companyLocation)}
          <Popup>
            hi <br />
          </Popup>
        </Marker>)}  

      )} */}
      <Marker position={[19.133301, 72.834477]}>
        <Popup>
          Facebook <br />
        </Popup>
      </Marker>
      <Marker position={[19.075341, 72.849682]}>
        <Popup>
          Microsoft <br />
        </Popup>
      </Marker>
      <Marker position={[19.127344, 72.875218]}>
        <Popup>
          Google <br />
        </Popup>
      </Marker>
      <Marker position={[19.142959, 72.891121]}>
        <Popup>
          Amazon <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMapComponent;
