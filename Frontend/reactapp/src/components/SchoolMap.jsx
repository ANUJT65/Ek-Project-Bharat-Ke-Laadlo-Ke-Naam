// SchoolMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './SchoolMap.css';

const SchoolMap = () => {
  return (
    <MapContainer center={[28.6342, 77.20903]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Markers */}
      <Marker position={[28.634234642003538, 77.20903927384026]}>
        <Popup>
          <strong>Classroom A</strong>
          <br />
          Benches: 20
          <br />
          Smartboards: 1
        </Popup>
      </Marker>

      <Marker position={[28.634345689, 77.20903927384026]}>
        <Popup>
          <strong>Washroom 1</strong>
          <br />
          Facilities: soap, hand dryer
        </Popup>
      </Marker>

      <Marker position={[28.634345689, 77.2090402932]}>
        <Popup>
          <strong>Washroom 2</strong>
          <br />
          Facilities: soap, hand dryer
        </Popup>
      </Marker>

      <Marker position={[28.634456, 77.209100]}>
        <Popup>
          <strong>Classroom B</strong>
          <br />
          Benches: 25
          <br />
          Smartboards: 2
        </Popup>
      </Marker>

      <Marker position={[28.634567, 77.209200]}>
        <Popup>
          <strong>Library</strong>
          <br />
          Computers: 30
        </Popup>
      </Marker>

      <Marker position={[28.634678, 77.209300]}>
        <Popup>
          <strong>Sports Field</strong>
          <br />
          Type: Football
          <br />
          Capacity: 500
        </Popup>
      </Marker>

      <Marker position={[28.634789, 77.209400]}>
        <Popup>
          <strong>Parking Area</strong>
          <br />
          Spaces: 50
        </Popup>
      </Marker>

      {/* More markers can be added as needed */}
    </MapContainer>
  );
};

export default SchoolMap;
