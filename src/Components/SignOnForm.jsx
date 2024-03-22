// SignOnForm.jsx

import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function SignatureForm({ setSignature }) {
  const sigCanvasRef = useRef(null);

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setSignature(''); 
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <p className="text-lg font-semibold">Sign On Glass</p>
      <div className="border-2 border-gray-300 p-2 rounded">
        <SignatureCanvas
          penColor='blue'
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signatureCanvas',
          }}
          ref={sigCanvasRef}
          onEnd={() => setSignature(sigCanvasRef.current.toDataURL('image/png'))}
        />
      </div>
      <div className="flex justify-between">
        <button 
          type="button" 
          onClick={clearSignature} 
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md cursor-pointer inline-flex items-center justify-center"
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}

export default SignatureForm;
