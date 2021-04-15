import React from 'react'

import arrowLeft from '../../../assets/brand/arrow-left.svg';

const Breadcrumb = () => {
  return ( 
    <aside className="row">
      <div className="col-6">
        <ul className="d-flex mt-4">
          <li>
            <p className="text-grey">
              <small>Home</small>
            </p>
          </li>
          <li className="px-2">
            <img src={arrowLeft} alt="" />
          </li>
          <li>
            <p className="text-grey">
              <small>
                Ordenes
              </small>
            </p>
          </li>
        </ul>
      </div>
    </aside>
   );
}
 
export default Breadcrumb;