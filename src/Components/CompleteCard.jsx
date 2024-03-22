import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from 'react';

function CompleteCard() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center h-full transition-opacity duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-4 max-w-sm w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold mt-4 text-gray-700 dark:text-white">
            Thank you for Acknowledging
          </p>
          <div className="mt-4 bg-green-500 rounded-full p-2 inline-flex items-center justify-center">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteCard;
