import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/actions/actions';

function PagoExitoso() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('confirming');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    let cancelled = false;

    const confirmPayment = async () => {
      const token = JSON.parse(localStorage.getItem('token') || 'null');
      if (!sessionId || !token) {
        setStatus('error');
        return;
      }

      try {
        await axios.post(`/checkout/session/${encodeURIComponent(sessionId)}/confirm`, null, {
          headers: { authorization: `Bearer ${token}` },
        });
        if (!cancelled) {
          dispatch(clearCart());
          setStatus('paid');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    };

    confirmPayment();
    return () => {
      cancelled = true;
    };
  }, [dispatch, sessionId]);

  if (status === 'confirming') {
    return (
      <div className="min-h-screen py-32 text-center text-xl">
        Confirming payment with Stripe…
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen py-32 text-center">
        <h3 className="text-4xl font-bold text-slate-800">Payment not confirmed</h3>
        <p className="my-6 text-gray-500">
          We could not verify this payment. Your cart has not been cleared.
        </p>
        <Link to="/cart" className="font-semibold text-main hover:underline">
          Return to cart
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="h-full my-20 font-display ">
        <div className="bg-white p-6  md:mx-auto">
          <div className="w-24 m-auto mb-9">
            <svg viewBox="0 0 24 24" className="w-9 mx-auto my-6">
              <path
                fill="green"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          </div>
          <div className="text-center">
            <h3 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              Payment Done!
            </h3>
            <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
              Thank you for your purchase.
            </p>
            <p className="font-light mt-4 mb-9 text-gray-500 md:text-sm xl:text-xl dark:text-gray-400">
              Have a great day!
            </p>
            <div className="py-10 text-center">
              <Link
                to="/"
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

export default PagoExitoso;
