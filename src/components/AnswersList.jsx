import PropTypes from "prop-types"; // Import PropTypes
import AnswersItem from "./AnswersItem";

export default function AnswersList(props) {
  const { answersList, onEdit } = props; // Destructure onEdit from props

  return (
    <ul>
      {answersList.map((answerItem, i) => (
        <AnswersItem answerItem={answerItem} key={i} onEdit={onEdit} /> // Pass onEdit to AnswersItem
      ))}
    </ul>
  );
}

// Add prop validation
AnswersList.propTypes = {
  answersList: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      colour: PropTypes.string,
      timeSpent: PropTypes.arrayOf(PropTypes.string),
      review: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired, // Add prop validation for onEdit
};
