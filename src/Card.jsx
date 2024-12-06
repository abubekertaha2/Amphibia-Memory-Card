import PropTypes from 'prop-types';
const Card = ({ id = null, name = "Unknown", image = "", onClick = () => {} }) => {
    return (
        <div className="card" onClick={() => onClick(id)}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
};

export default Card;