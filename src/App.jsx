import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Conexion from './components/Conexion';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDpNriOHnMI_EAKi4aTZcEDc75UHyY9nw8",
  authDomain: "pacha-emg.firebaseapp.com",
  databaseURL: "https://pacha-emg-default-rtdb.firebaseio.com",
  projectId: "pacha-emg",
  storageBucket: "pacha-emg.appspot.com",
  messagingSenderId: "206266393877",
  appId: "1:206266393877:web:53ec89a198a5c953dfb51c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const MedidasHTML = () => {
  useEffect(() => {
    const database = firebase.database();

    const tempRef = database.ref('temp');
    const humRef = database.ref('humidity');
    const capRef = database.ref('capacitive');
    const lightRef = database.ref('light');

    const analogToPercent = (analogValue) => {
      return (analogValue / 4095) * 100;
    };

    const analogToInversePercent = (analogValue) => {
      return 100 - (analogValue / 4095) * 100;
    };

    tempRef.on('value', (snapshot) => {
      const tempData = snapshot.val();
      document.getElementById('temperature').innerHTML = tempData + " &#8451;";
    });

    humRef.on('value', (snapshot) => {
      const humData = snapshot.val();
      document.getElementById('humidity').innerHTML = humData + "%";
    });

    capRef.on('value', (snapshot) => {
      const capData = snapshot.val();
      const capPercent = analogToInversePercent(capData);
      document.getElementById('capacitive').innerHTML = capPercent.toFixed(2) + "%";
    });

    lightRef.on('value', (snapshot) => {
      const lightData = snapshot.val();
      const lightPercent = analogToPercent(lightData);
      document.getElementById('light').innerHTML = lightPercent.toFixed(2) + "%";
    });

  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: `
      <div class="data-head">MEDICIONES DE TU PLANTA :D</div>

      <div class="data-container">
        <div class="data-item">
          <h2>Temperatura de tu Casa</h2>
          <p class="value" id="temperature">22 &#8451;</p>
        </div>
        <div class="data-item">
          <h2>Húmedad de tu Casa</h2>
          <p class="value" id="humidity">10%</p>
        </div>
        <div class="data-item">
          <h2>Húmedad de tu Planta</h2>
          <p class="value" id="capacitive">10%</p>
        </div>
        <div class="data-item">
          <h2>Iluminación de tu Planta</h2>
          <p class="value" id="light">10%</p>
        </div>
      </div>

      <style type="text/css">
        body {
          background: linear-gradient(to bottom right, #A8E063, #56AB2F);
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #fff;
        }
        .data-container {
          display: flex;
          justify-content: space-between;
          width: 60%;
          margin: 50px auto;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
        }
        .data-item {
          text-align: center;
          flex: 1;
          margin: 0 10px;
        }
        .data-item h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .data-item p {
          font-size: 48px;
          font-weight: bold;
          color: #FFD700;
        }
        .data-head {
          margin: 50px auto;
          width: 60%;
          text-align: center;
          font-size: 45px;
          font-weight: bold;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          border-radius: 25px;
        }
      </style>
    `}} />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Conexion />} />
        <Route path="/medidas" element={<MedidasHTML />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
