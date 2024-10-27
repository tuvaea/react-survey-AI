import PropTypes from "prop-types"; // Import PropTypes

const answersSet = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  noTime: "I don't like to spend time with it",
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{answersSet[item]}</li>
      ))}
    </ul>
  );
}

// Define prop types for ItemsList
ItemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AnswersItem({ answerItem, onEdit }) {
  const { username, colour, timeSpent, review } = answerItem;

  return (
    <li>
      <article className="answer">
        <h3>{username || "Anon"} said:</h3>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{colour}</span>
        </p>
        <p>
          <em>How do you like to spend time with your rubber duck?</em>
          <ItemsList list={timeSpent} />
        </p>
        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
        <button onClick={() => onEdit(answerItem)}>Edit</button> {/* Edit button */}
      </article>
    </li>
  );
}

// Add prop validation
AnswersItem.propTypes = {
  answerItem: PropTypes.shape({
    username: PropTypes.string,
    colour: PropTypes.string,
    timeSpent: PropTypes.arrayOf(PropTypes.string),
    review: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};
