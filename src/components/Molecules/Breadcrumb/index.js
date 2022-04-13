import { useLocation, useHistory } from 'react-router-dom';

import arrowLeft from '../../../assets/brand/arrow-left.svg';

const Breadcrumb = () => {
  const location = useLocation();
  const history = useHistory();

  const handleClickHome = (e) => {
    e.preventDefault();
    history.push('/');
  };
  const handleClickBack = (e) => {
    e.preventDefault();
    if (location.pathname.substring(1).includes('/')) {
      history.goBack();
    }
  };
  return (
    <aside className="row">
      <div className="col-6">
        <ul className="d-flex mt-4">
          <li>
            <p>
              <a href="!#" onClick={handleClickHome}>
                <small className="text-grey">Home</small>
              </a>
            </p>
          </li>
          {(location.pathname.length > 1) && (
            <>
              <li className="px-2">
                <img src={arrowLeft} alt="" />
              </li>
              <li>
                <p>
                  <a href="!#" onClick={handleClickBack}>
                    <small className="text-grey text-capitalize">
                      {location.pathname.substring(1).replace('/', ' > ').replace('-', ' ')}
                    </small>
                  </a>
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
