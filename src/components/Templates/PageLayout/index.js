import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import arrowBack from 'assets/brand/breadcrumbGoBack.svg';

const PageLayout = ({
  title, description, children, noBreadcrumb,
}) => {
  const history = useHistory();
  const handleClickBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <>
      <Helmet>
        <title>{`${title ? `${title} | ` : ''} Fulfillment By BlueExpress`}</title>
        <meta
          name="description"
          content={`${description ? `${description} | ` : ''} Fulfillment By BlueExpress'`}
        />
      </Helmet>
      {!noBreadcrumb && (
        <aside className="row">
          <div className="col-6 mt-4 mb-2">
            <a href="!#" onClick={handleClickBack}>
              <ul className="d-flex">
                <li className="me-2">
                  <img src={arrowBack} alt="" />
                </li>
                <li>
                  <span style={{ color: '#2BB9FF', fontWeight: 700 }}>Volver atrás</span>
                </li>
              </ul>
            </a>
          </div>
        </aside>
      )}
      {children}
    </>
  );
};

PageLayout.defaultProps = {
  title: '',
  description: '',
  noBreadcrumb: false,
};

PageLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  noBreadcrumb: PropTypes.bool,
};

export default PageLayout;
