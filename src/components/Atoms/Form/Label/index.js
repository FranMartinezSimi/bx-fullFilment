import PropTypes from 'prop-types';

const Label = ({ label, id, children, className }) => (
  <label htmlFor={id} className={className}>
    <p className="mb-2">{label}</p>
    {children}
  </label>
);

Label.defaultProps = {
  className: undefined,
  children: undefined,
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
