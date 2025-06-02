import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '../ui/Button';
import { ScanLine, Camera, CameraOff } from 'lucide-react';

interface QRScannerProps {
  onResult: (qrCode: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'qr-reader';

  useEffect(() => {
    // Initialize the scanner
    scannerRef.current = new Html5Qrcode(scannerContainerId);
    
    // Clean up on component unmount
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch((err) => {
          console.error("Error stopping scanner:", err);
        });
      }
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    if (!scannerRef.current) return;
    
    try {
      setIsScanning(true);
      
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          // This is called when QR code scanning fails
          // Avoid setting state here as it will flood with errors
        }
      );
    } catch (err) {
      setIsScanning(false);
      setError("Error accessing camera. Please ensure you've granted camera permissions.");
      console.error("Error starting scanner:", err);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
      }).catch((err) => {
        console.error("Error stopping scanner:", err);
      });
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    // Stop scanning after successful scan
    stopScanner();
    
    // Pass result to parent component
    onResult(decodedText);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        id={scannerContainerId} 
        className={`w-full aspect-square mx-auto relative overflow-hidden rounded-lg border-2 ${isScanning ? 'border-primary-500' : 'border-gray-300'}`}
      >
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <Camera size={48} className="mx-auto mb-2" />
              <p>Camera preview will appear here</p>
            </div>
          </div>
        )}
        
        {isScanning && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Scan animation */}
            <div className="h-0.5 w-full bg-primary-500 absolute animate-pulse-slow">
              <ScanLine className="text-primary-500 absolute -top-4 left-1/2 transform -translate-x-1/2" />
            </div>
            
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary-500"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary-500"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary-500"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary-500"></div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-2 bg-error-50 text-error-700 rounded text-sm text-center">
          {error}
        </div>
      )}
      
      <div className="mt-6 flex justify-center">
        {isScanning ? (
          <Button variant="outline\" onClick={stopScanner} className="flex items-center">
            <CameraOff className="mr-2 h-5 w-5" />
            Stop Scanning
          </Button>
        ) : (
          <Button onClick={startScanner} className="flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Start Scanner
          </Button>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Position a QR code on a product within the frame to scan</p>
      </div>
    </div>
  );
};