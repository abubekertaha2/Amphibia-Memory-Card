import PropTypes from 'prop-types';
const Scoreboard = ({ currentScore, bestScore }) => {
    return (
        <div className="scoreboard text-right pr-6 text-blue-700 text-2xl font-bold">
            <p>Current Score: {currentScore}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    );
};

Scoreboard.propTypes = {
    currentScore: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
};

export default Scoreboard;