import PropTypes from 'prop-types';

const Tolltip = ({ icon, text, color }) => {
  console.log('text');
  return (
    <>
      <p>{icon}</p>
      <p>{text}</p>
      <p>{color}</p>
    </>
  );
};

Tolltip.defaultProps = {
  color: '',
};

Tolltip.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Tolltip;
