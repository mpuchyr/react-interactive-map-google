import './App.css';
import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import data from './data/chicago-parks.json';




function App() {
  const [selectedPark, setSelectedPark] = useState(null)

  const displayMarkers = () => {
    return data.map((park, index) => {
      if (park.location.hasOwnProperty('latitude') && park.location.hasOwnProperty('longitude')) {
        const lat = parseFloat(park.location.latitude)
        const lng = parseFloat(park.location.longitude)
        return (
          <Marker
            key={index}
            position={{ lat: lat, lng: lng}}
            onClick={() => {
              setSelectedPark(park)
            }}
          ></Marker>
        )
      }
    })
  }
  
  const Map = () => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 41.8781, lng: -87.6298 }}
      >
        {displayMarkers()}
        {selectedPark && (
          <InfoWindow
            position={{lat: parseFloat(selectedPark.location.latitude), lng: parseFloat(selectedPark.location.longitude)}}
            onCloseClick={() => setSelectedPark(null)}
          >
            <div>
              <h2>{selectedPark.park}</h2>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  }
  
  const WrappedMap = withScriptjs(withGoogleMap(Map))

  
  return (
    <div style={{ width: "100vw", height: "100vh"}}>
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawin,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{height: "100%"}} />}
        containerElement={<div style={{height: "100%"}} />}
        mapElement={<div style={{ height: "100%"}}/>}
      />
    </div>
  );
}

export default App;
