import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import './QR.css';

//FUTURE IMPLEMENTATION

export function QR() {

    const qrcodeContainerRef = useRef(null);

    useEffect(() => {
        // Genera el código QR cuando el componente se monta
        generateQRCode();
    }, []);

    const generateQRCode = async () => {
        try {
            const url = 'http://localhost:5173/'; // URL a la que apunta el código QR
            const options = {
                width: 300, // Ancho del código QR
                height: 300, // Altura del código QR
                colorDark: '#000000', // Color de los módulos oscuros
                colorLight: '#ffffff', // Color de los módulos claros
                correctLevel: 'H' // Nivel de corrección de errores como cadena
            };
            await QRCode.toCanvas(qrcodeContainerRef.current, url, options);
        } catch (error) {
            console.error('Error al generar el código QR:', error);
        }
    };

    return (
        <canvas className='qr' ref={qrcodeContainerRef} width={200} height={200}></canvas>
    );
}


