import React, { useState } from 'react';
import { Button, Container, Form, Alert, Card } from 'react-bootstrap';
import './Conexion.css'
import { Link } from 'react-router-dom';
const Conexion = () => {
  const [devices, setDevices] = useState([]); // Estado para almacenar la lista de dispositivos escaneados
  const [linkedDeviceName, setLinkedDeviceName] = useState(''); // Estado para almacenar el nombre del dispositivo vinculado
  const [error, setError] = useState(''); //Variable para almacenar cualquier error que ocurra durante el proceso de solicitud del dispositivo Bluetooth
  const [ssid, setSsid] = useState(''); // Estado para el SSID de Wi-Fi
  const [password, setPassword] = useState(''); // Estado para la contraseña de Wi-Fi

  const requestBluetoothDevice = async () => { //Esta función usa la API Web Bluetooth para solicitar al usuario que seleccione un dispositivo Bluetooth
    try {
        console.log('Requesting Bluetooth Device...');
        const device = await navigator.bluetooth.requestDevice({ //Esto abre el cuadro de diálogo en el navegador para que el usuario seleccione un dispositivo
            acceptAllDevices: true, //Acepta todos los dispositivos
            optionalServices: [ //Incluye servicios específicos
            'generic_access', 'generic_attribute', 'device_information',
            'battery_service', 'heart_rate', 'health_thermometer',
            'current_time', 'cycling_power', 'cycling_speed_and_cadence',
            'glucose', 'running_speed_and_cadence', 'scan_parameters', 'tx_power',
            '3c795e44-4c2d-4eea-9f2b-aa4732fe4c52' // Añadido para incluir el servicio específico de tu ESP32
            ]
        });
        // Almacenamos el dispositivo en la lista de dispositivos escaneados
        setDevices([device]); 
        setLinkedDeviceName(device.name || 'Unknown Device'); // Establecer el nombre del dispositivo vinculado
        console.log('Device:', device);
        // Limpiar cualquier mensaje de error anterior
        setError('');
    } catch (error) {
      console.error('Error requesting Bluetooth device:', error);
      setError('Aún no se vinculó ningún dispositivo, vuelve a escanear');
    } //Si hay algún error se muestra el mensaje de escanear nuevamente
  };
  const sendWiFiCredentials = async () => {
    try {
      const device = devices[0]; // Selecciona el primer dispositivo de la lista de dispositivos encontrados
      const server = await device.gatt.connect(); // Conecta al servidor GATT del dispositivo
      const service = await server.getPrimaryService('3c795e44-4c2d-4eea-9f2b-aa4732fe4c52'); // Obtiene el servicio primario con el UUID específico
      const characteristic = await service.getCharacteristic('c013c029-035d-4549-9ede-468cda5947ba'); // Obtiene la característica con el UUID específico

      const credentials = `${ssid},${password}`; // Combina SSID y contraseña en una sola cadena separada por una coma
      const encoder = new TextEncoder(); // Crea un codificador de texto
      const encodedCredentials = encoder.encode(credentials); // Codifica las credenciales en formato Uint8Array

      await characteristic.writeValue(encodedCredentials); // Escribe las credenciales codificadas en la característica
      console.log('WiFi credentials sent:', credentials);
    } catch (error) {
      console.error('Error sending WiFi credentials:', error); // Maneja cualquier error que ocurra durante el proceso
    }
  };

  const resetEEPROM = async () => {
    try {
      const device = devices[0]; // Selecciona el primer dispositivo de la lista de dispositivos encontrados
      const server = await device.gatt.connect(); // Conecta al servidor GATT del dispositivo
      const service = await server.getPrimaryService('3c795e44-4c2d-4eea-9f2b-aa4732fe4c52'); // Obtiene el servicio primario con el UUID específico
      const resetCharacteristic = await service.getCharacteristic('133baee8-3cdf-4a13-a120-0594d6fc39bc'); // Obtiene la característica de reseteo con el UUID específico

      const command = 'RESET'; // Comando de reseteo
      const encoder = new TextEncoder(); // Crea un codificador de texto
      const encodedCommand = encoder.encode(command); // Codifica el comando en formato Uint8Array

      await resetCharacteristic.writeValue(encodedCommand); // Escribe el comando codificado en la característica
      console.log('Reset command sent');
    } catch (error) {
      console.error('Error sending reset command:', error); // Maneja cualquier error que ocurra durante el proceso
    }
  };
  

    return (
        <div className="background-image">
            <div className="pacha-header">
                <h1 className="mt-3">PACHA</h1>
            </div>
            <Container className='mt-5'>
                <Card className='text-center p-3 card-custom'>
                    <Card.Header as="h2" className="text-dark">Conexión Bluetooth Pacha</Card.Header>
                    <Card.Body>
                        <Button variant='success' onClick={requestBluetoothDevice} className='mb-3 primary'>
                            Busca Tu Dispositivo Pacha :D
                        </Button>
                        {linkedDeviceName ? (
                            <>
                                <Alert variant="success">
                                    Tu Dispositivo Vinculado es: {linkedDeviceName}
                                </Alert>
                                <Card className="mt-3 card-custom">
                                    <Card.Header as="h2" className="bg-primary text-light">Conectar a Wi-Fi</Card.Header>
                                    <Card.Header as="h3" className="bg-secondary text-light">Pacha Requiere De Internet Para Poder Cuidar A Tu Planta =D</Card.Header>
                                    <Card.Body>
                                        <p>Ingresa Los Datos Para Conectar A Pacha A Internet</p>
                                        <Form>
                                            <Form.Group className="mb-3" controlId='formSsid'>
                                                <Form.Label>Ingresa el nombre (SSID) de tu Wi-Fi</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre de tu red Wi-Fi"
                                                    value={ssid}
                                                    onChange={(e) => setSsid(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId='formPassword'>
                                                <Form.Label>Ingresa la contraseña de tu Wi-Fi</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Contraseña"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Button variant="primary" onClick={sendWiFiCredentials} className='primary'>
                                                Enviar Datos Wi-Fi
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                                <Button variant="danger" onClick={resetEEPROM} className='mt-3 danger'>
                                    Conectar a otra red/Desconectar
                                </Button>
                            </>
                        ):(
                            error && <Alert variant="danger">{error}</Alert>
                        )}
                        {devices.length > 0 && (
                            <ul className="list-unstyled mt-3">
                                {devices.map((device, index)=>(
                                    <li key={index}>{device.name || 'Unknown Device'}</li>
                                ))}
                            </ul>
                        )}
                    </Card.Body>
                </Card>
            </Container>
            <div className="download-app">
                <p>Una vez que hayas conectado a Pacha a Internet, descarga la App para empezar esta aventura :D</p>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Descargar la App Aquí</a>
            </div>
            <div className="sensor-section">
                <p className="extra-option">Opción Extra</p>
                <Link to="/medidas" className="btn btn-primary">
                    MEDICIONES WEB
                </Link>
            </div>
        </div>
    );
};

export default Conexion;
