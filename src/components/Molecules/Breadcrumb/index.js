import React from 'react';
import { useLocation } from 'react-router-dom';

import arrowLeft from '../../../assets/brand/arrow-left.svg';

const Breadcrumb = () => {
  const location = useLocation();
  return (
    <aside className="row">
      <div className="col-6">
        <ul className="d-flex mt-4">
          <li>
            <p className="text-grey">
              <small>Home</small>
            </p>
          </li>
          {(location.pathname.length > 1) && (
            <>
              <li className="px-2">
                <img src={arrowLeft} alt="" />
              </li>
              <li>
                <p className="text-grey">
                  <small className="text-capitalize">
                    {location.pathname.substring(1).replace('/', ' > ').replace('-', ' ')}
                  </small>
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Breadcrumb;
