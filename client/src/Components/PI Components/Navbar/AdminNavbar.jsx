import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <div className="w-72 pl-4 bg-slate-200 min-h-screen">
      <nav className="px-2 flex flex-col py-4 m-auto border-2">
        <h2 className="uppercase font-sans font-semibold text-lg mb-9 mt-2">
          Admin Tools
        </h2>
        <div class=" ">
          <ul class=" justify-betweenmx-auto uppercase font-sans underline-offset-4  font-regular text-main ">
            <li className="py-2">
              <Link to="/panel+admin/products" className="hover:underline">
                Manage Products
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/panel+admin/create/product"
                className="hover:underline"
              >
                Create new Product
              </Link>
            </li>
            <li className="py-2">
              <Link to="/panel+admin/deleted" className="hover:underline">
                Deleted Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
