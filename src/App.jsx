import { useState } from 'react';
import Card from './Components/Card';
import { ChevronRightIcon } from "@heroicons/react/solid";
import CustomizedSteppers from './Components/Stepper';
import CommentForm from './Components/CommentForm';
import SignatureForm from './Components/SignOnForm';
import CompleteCard from './Components/CompleteCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from './assets/images/img1.png';
import img2 from './assets/images/img2.png';
import img3 from './assets/images/img3.png';
import img4 from './assets/images/img4.png';
import img5 from './assets/images/img5.png';
import img6 from './assets/images/img6.png';
import img7 from './assets/images/img7.png';
import img8 from './assets/images/img8.png';
import img9 from './assets/images/img9.png';
import img10 from './assets/images/img10.png';
import img11 from './assets/images/img11.png';
import img12 from './assets/images/img12.png';


function App() {

  
  const slides = [

    {
      image: img1,
      paragraph: '1. Always speak up if you feel safety is being compromised'
    },

    {
      image: img7,
      paragraph: '2. Always keep the required safe distance from hazardous operations'
    },

    {
      image: img2,
      paragraph: '3. Always assess the risk before starying work'
    },

    {
      image: img8,
      paragraph: '4. Always wear the required personal protective equipment for the job'
    },

    { 
      image: img3,
      paragraph: '5. Always ensure you are trained and competent to complete the task'
    },

    {
      image: img9,
      paragraph: '6. Never use hand-held mobile phone while driving a vehicle or operating machinery'
    },

    {
      image: img4,
      paragraph: '7. Always wear a seat belt when driving or operating a vehicle or machinery, where fitted'
    },

    {
      image: img10,
      paragraph: '8. Never tamper with or over ride safety features on vehicles, plant or equipment'
    },

    {
      image: img5,
      paragraph: '9. Always isolate energy sources before working in vehicles, plant and equipment'
    },

    {
      image: img11,
      paragraph: '10. Never work under the influence of drugs or alcohol'
    },

    {
      image: img6,
      paragraph: '11. Always ensure any load is secure throughout the journey'
    },

    {
      image: img12,
      paragraph: '12. Never work near hazardous trees'
    },

    {
      paragraph: '13. Comment'
    },

    {
      paragraph: '14. Sign on Glass'
    },

    {
      paragraph: '15. Complete'
    },
       
  ];



  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsToShow = currentIndex < 12 ? 4 : 1;
  const startIndex = currentIndex < 12 ? Math.floor(currentIndex / 4) * 4 : currentIndex;

  const [activeStep, setActiveStep] = useState(0);
  
  const [employeeType, setEmployeeType] = useState('');
  const [comment, setComment] = useState('');
  const [signature, setSignature] = useState('');
  const [empNo, setEmpNo] = useState('001'); 
  const [empName, setEmpName] = useState('Ricky Murphy'); 
  const [tbId, setTbId] = useState('1');

  const [errorMessage, setErrorMessage] = useState("");







  const cardsToRender = slides.slice(startIndex, startIndex + cardsToShow).map((slide, index) => {
    // Determine the actual index in the slides array
    const actualIndex = startIndex + index;
  
    if (actualIndex < 12) {
      // Display image and text for the first 12 cards
      return (
        <div key={index} className="col-span-1 bg-white rounded-lg shadow overflow-hidden h-36">
        <div className="flex items-start space-x-4 p-4 h-full">
          <div className="w-1/3">
            {slide.image && <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />}
          </div>
          <div className="w-2/3">
            <p className="text-sm sm:text-base">{slide.paragraph}</p>
          </div>
        </div>
      </div>
      );
    } else if (actualIndex === 12) {
      // Comment form
      return (
        <div key={index} className="col-span-2">
          
          <CommentForm 
            comment={comment}
            setComment={setComment}
            employeeType={employeeType}
            setEmployeeType={setEmployeeType}
          />
         
        </div>
      );
    } else if (actualIndex === 13) {
      // Sign-on form
      return (
        <div key={index} className="col-span-2">
          <SignatureForm setSignature={setSignature}/>
        </div>
      );
    } else if (actualIndex === 14) {
      // Complete card
      return (
        <div key={index} className="col-span-2">
          <CompleteCard />
        </div>
      );
    } else {
      // Render normal card
      return (
        <Card key={index} title={slide.title} paragraph={slide.paragraph} />
      );
    }
  });


  //Comment form validation function
  const validateCommentForm = () => {
    if (employeeType === '' && comment.trim() === '') {
      toast.error("Please select an employee type and enter a comment before proceeding.");
      return false;
    } else if (employeeType === '') {
      toast.error("Please select an employee type before proceeding.");
      return false;
    } else if (comment.trim() === '') {
      toast.error("Please enter a comment before proceeding.");
      return false;
    }
    return true;
  };



//function to set the active step for the stepper
const nextSlide = () => {

  if (currentIndex === 12) {
    const isCommentFormValid = validateCommentForm();
    if (!isCommentFormValid) {
      return; 
    }
  }

  if (currentIndex === 13 && !signature) {
    toast.error("Please provide your signature before submitting.");
    return;
  }
  let acknowledgment = JSON.parse(sessionStorage.getItem('acknowledgment') || '{}');

  // Combine all data when moving away from the CommentForm
  if (currentIndex === 12) {
    acknowledgment = {
      ...acknowledgment,
      employeeType: employeeType,
      comment: comment,
      Emp_No: empNo,
      Emp_Name: empName,
      TB_ID: tbId,
    };
  }

  // Combine signature data when moving away from the SignOnForm
  if (currentIndex === 13 && signature) {
    acknowledgment = {
      ...acknowledgment,
      signatureUrl: signature,
      dateTime: new Date().toISOString(),
    };
  }


  console.log("Current Index:",currentIndex);
  console.log("Current Index:",activeStep);
  
 
  sessionStorage.setItem('acknowledgment', JSON.stringify(acknowledgment));
  // console.log('Acknowledgment updated:', acknowledgment);

  
  // The logic for adjusting the currentIndex and activeStep remains unchanged
  let newCurrentIndex = currentIndex + (currentIndex < 12 ? 4 : 1); 
  let newActiveStep = activeStep;
  
  if (newCurrentIndex >= slides.length) {
    newCurrentIndex = 0;
    newActiveStep = 0; 
  } else {
    if (currentIndex < 12) {
      newActiveStep = Math.floor(newCurrentIndex / 4);
    } else {
      newActiveStep += 1; 
    }
  }

 
  console.log("Current Index 2",currentIndex);

  setCurrentIndex(newCurrentIndex);
  setActiveStep(newActiveStep); 
};
  


const handleStepperClick = (stepIndex) => {
 
  if (activeStep >= 5) {
    return; 
  }

  
  if (stepIndex >= activeStep) {
    return;
  }

  console.log('stepIndex:', stepIndex);
  console.log('Active step:', activeStep);


  let newCurrentIndex = stepIndex * 4;


  if (stepIndex > 2) {
    newCurrentIndex += stepIndex - 3;
  }

  
  if (newCurrentIndex >= slides.length) {
    newCurrentIndex = slides.length - 1;
  }

 
  setCurrentIndex(newCurrentIndex);
  setActiveStep(stepIndex);
};



  function handleClose() {

    // console.log('Close button clicked');
    
  }
  
 
  

  return (
    <div className='max-w-[800px] mx-auto px-4 relative group'>
      <ToastContainer position="top-center" autoClose={5000} />
    {/* Employee Name and Toolbox ID Section */}
    <div className='flex justify-between items-center mt-4 px-6 py-3 bg-white rounded-md shadow border border-gray-300 space-x-10'> 
        <div className='flex-1'>
          <div className='text-lg font-semibold text-left bg-gray-100 rounded p-2 shadow-inner'>{empName}</div>
        </div>
        <div className='flex-1'>
          <div className='text-lg font-semibold text-left bg-gray-100 rounded p-2 shadow-inner'>{tbId}</div>
        </div>
      </div>

    {/* Custom Slider */}
    <div className='mt-8'>
    <CustomizedSteppers 
  value={activeStep} 
  onStepClick={handleStepperClick}
  totalSteps={Math.ceil(slides.length / 4)}
/>
  </div>

    {/* Content Section */}
    <div className="content-section mt-16">
      {/* Main Card Container */}
      <div className='rounded-2xl bg-gray-200 p-6 shadow-lg'>
        {/* Grid Container for Cards */}
        <div className='grid grid-cols-2 gap-4'>
        {cardsToRender}
        </div>
      </div>
    </div>

    {/* Next Button Section */}
    <div className='flex justify-end mt-4'>
  {currentIndex === slides.length - 1 ? (
    // This is the "Complete" card case
    <button
      className='flex items-center text-lg font-medium py-2 px-6 rounded-lg border border-transparent shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
      onClick={handleClose} 
    >
      Finish
    </button>
  ) : currentIndex === 13 ? ( 
    // This is the "Sign On Glass" card case

    <div className="space-y-4">

  {errorMessage && (
    <div className="text-center text-sm text-red-600 bg-red-100 rounded-lg py-2">
      {errorMessage}
    </div>
  )}

 
  <div className="flex justify-center">
    <button
      className='flex items-center text-lg font-medium py-2 px-6 rounded-lg shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
      onClick={nextSlide}
     
    >
      Submit
      <ChevronRightIcon className="w-5 h-5 ml-2" />
    </button>
  </div>
</div>



  ) : (
    // This is for all other cases
    <button
  className='flex items-center text-lg font-medium py-2 px-6 rounded-lg border border-transparent shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
  onClick={() => nextSlide()}
>    
  Next
  <ChevronRightIcon className="w-5 h-5 ml-2" />
</button>
  )}
</div>
  </div>
  );
}

export default App;