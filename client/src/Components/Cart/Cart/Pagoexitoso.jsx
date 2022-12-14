import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PagoExitoso() {
  let user = useSelector((state) => state.userInfo);

  let data = {
    service_id: 'service_movy3fh',
    template_id: 'template_bwd3tub',
    user_id: '9Ttq_y5p96nZfIkib',
    template_params: {
      email: user.email,
      name: user.name,
    },
  };

  React.useEffect(async () => {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }, []);

  return (
    <div>
      <div class="h-full my-20 font-display ">
        <div class="bg-white p-6  md:mx-auto">
          <div className="w-24 m-auto mb-9">
            <svg viewBox="0 0 24 24" classname="w-9 mx-auto my-6">
              <path
                fill="green"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          </div>
          <div class="text-center">
            <h3 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              Payment Done!
            </h3>
            <p class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
              Thank you for your purchase.
            </p>
            <p className="font-light mt-4 mb-9 text-gray-500 md:text-sm xl:text-xl dark:text-gray-400">
              Have a great day!
            </p>
            <div class="py-10 text-center">
              <Link
                to="/"
                class="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
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

export default PagoExitoso;
