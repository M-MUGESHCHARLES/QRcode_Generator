import './QRcodeGenerator.css';
import QRGif from '../images/QRCodeLoading.gif';
import { useState } from "react";

export const QRcodeGenerator = () => {
  
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQRData] = useState("QRCodeGenerator"); 
  const [qrSize, setQRSize] = useState(150);
  
  async function GenerateQR() {

    setLoading(true);
  
    try {
      const url = ` https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data= ${encodeURIComponent(qrData)}`;
      setQrCode(url);

    } catch (error) {
      console.log("Error in loading QR Code", error);
    }
    finally {
       setLoading(false);
    }
  }
  
  function DownloadQR() {
     fetch(qrCode)
     .then((Response) => Response.blob())
     .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     })
     .catch((error) => {
      console.log("Error in downloading QR Code", error);
     });
  }

  return (
    <div id='QRcodeGenerator'> 

        <h1> QR-Code Generator </h1>

        <label htmlFor='Input-URL' className='url-label' > Enter the URL : </label>
        <input type='text' placeholder='Enter the URL' onChange={ (e) => {setQRData(e.target.value)} }/>

        <label htmlFor='Input-Size' className='size-label'> Enter QR size : (optional) </label>
        <input type='text' placeholder='Enter QR size eg:150' onChange={ (e) => {setQRSize(parseInt(e.target.value) || 150)} }/>

        <button className='GenerateQR-btn' onClick={GenerateQR} disabled={loading} > Generate QR Code </button>
        <button className='DownloadQR-btn'onClick={DownloadQR}  disabled={!qrCode}> Download QR Code </button>

         {qrCode && <img className='QRcode-img' src={qrCode} alt='QRCode' />  } 
        {loading && <img className='QRcode-loading' src={QRGif} alt='Please wait Loading...' /> }

        
    </div>
  )
} 
