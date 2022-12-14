import React from 'react';
import { Link } from 'react-router-dom';

function PagoPendiente() {
  return (
    <div>
      {' '}
      <div className="h-full my-20 font-display ">
        <div className="bg-white p-6  md:mx-auto">
          <div className="w-24 m-auto mb-9">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 485.811 485.811"
            >
              <g>
                <path
                  fill="gold"
                  d="M476.099,353.968l-170.2-294.8c-27.8-48.7-98.1-48.7-125.8,0l-170.3,294.8c-27.8,48.7,6.8,109.2,62.9,109.2h339.9
        C468.699,463.168,503.899,402.068,476.099,353.968z M242.899,397.768c-14.8,0-27.1-12.3-27.1-27.1s12.3-27.1,27.1-27.1
        c14.8,0,27.1,12.3,26.5,27.8C270.099,385.468,257.099,397.768,242.899,397.768z M267.599,222.568c-1.2,21-2.5,41.9-3.7,62.9
        c-0.6,6.8-0.6,13-0.6,19.7c-0.6,11.1-9.3,19.7-20.4,19.7s-19.7-8-20.4-19.1c-1.8-32.7-3.7-64.8-5.5-97.5
        c-0.6-8.6-1.2-17.3-1.9-25.9c0-14.2,8-25.9,21-29.6c13-3.1,25.9,3.1,31.5,15.4c1.9,4.3,2.5,8.6,2.5,13.6
        C269.499,195.468,268.199,209.068,267.599,222.568z"
                />
              </g>
            </svg>
          </div>
          <div className="text-center">
            <h3 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              Payment Pending!
            </h3>
            <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
              Your payment is still processing.
            </p>
            <p className="font-light mt-4 mb-9 text-gray-500 md:text-sm xl:text-xl dark:text-gray-400">
              Have a great day!
            </p>
            <div className="py-10 text-center">
              <Link
                to="https://chilly-production.up.railway.app/"
                className="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
              >
                Back to Homepage!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoPendiente;
