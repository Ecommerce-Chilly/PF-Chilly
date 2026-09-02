import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletOrderItem, clearOrderMsg } from '../../../redux/actions/actions';
import Swal from 'sweetalert2';

function OrderItem(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  token = JSON.parse(token);
  async function dispatchToDeleteOrderItem(items) {
    await Promise.all(
      items.map((item) => dispatch(deletOrderItem(item.id, token)))
    );
    dispatch(clearOrderMsg());
    setOpen(!open);
  }

  const confirmDeleteOrder = (items) => {
    Swal.fire({
      icon: 'question',
      text: 'Are you sure you want to delete this order?',
      confirmButtonText: 'Yes',
      showDenyButton: 'true',
      denyButtonText: 'No',
      customClass: {
        container: 'popup-container',
        popup: 'popup',
        confirmButton: 'confirm',
        denyButton: 'deny',
        cancelButton: 'cancel',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatchToDeleteOrderItem(items);
      }
    });
  };

  return (
    <div
      className={`${
        open && 'hidden-after-action'
      } bg-white rounded-xl shadow-xl border m-2 flex mx-auto min-h-40 w-1/2 justify-between py-5 mb-9`}
    >
      <div className="my-auto ml-9 w-2/3">
        <div>
          <p>
            <span className="font-bold">Order: </span>
            {props.id.startsWith('cs_') ? props.id.slice(-12) : props.id}
          </p>
          <p>
            <span className="font-bold">Date of purchase: </span>
            {props.createdAt}
          </p>
          <p>
            <span className="font-bold">User: </span>
            {props.items[0]?.user?.email || `#${props.items[0]?.userId}`}
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4">
            {props.items.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/panel+admin/orders/${item.id}`}
                  className="text-main hover:underline"
                >
                  Product #{item.productId} × {item.quantity}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" my-auto mr-9">
        <button
          onClick={() => confirmDeleteOrder(props.items)}
          className="text-main font-semibold rounded  right-5 top-1/3 px-3 py-1"
        >
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
