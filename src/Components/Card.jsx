import PropTypes from 'prop-types';

const Card = () => {
  return (
    <div className='rounded-md bg-white p-4 flex flex-col justify-between h-full'>
    </div>
  );
};

Card.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Card;