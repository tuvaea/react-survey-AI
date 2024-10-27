import { useState } from "react";
import AnswersList from "./AnswersList"; // Import the AnswersList component

function Survey() {
  const [formData, setFormData] = useState({
    colour: "",
    timeSpent: [],
    review: "",
    username: "",
    email: "",
  });
  const [answersList, setAnswersList] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const newTimeSpent = checked
          ? [...prevData.timeSpent, value] // Add value if checked
          : prevData.timeSpent.filter((item) => item !== value); // Remove value if unchecked
        return { ...prevData, timeSpent: newTimeSpent };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the submitted answers

    // If editing an existing answer, replace it in the answers list
    const existingAnswerIndex = answersList.findIndex(item => item.username === formData.username && item.review === formData.review);
    
    if (existingAnswerIndex !== -1) {
      const updatedAnswersList = [...answersList];
      updatedAnswersList[existingAnswerIndex] = formData; // Replace with updated form data
      setAnswersList(updatedAnswersList);
    } else {
      // Add form data to answers list if it's a new submission
      setAnswersList([...answersList, formData]);
    }

    // Reset the form to its original state
    setFormData({
      colour: "",
      timeSpent: [],
      review: "",
      username: "",
      email: "",
    });
  };

  const handleEdit = (answerItem) => {
    // Populate the form with the values from the selected answer
    setFormData(answerItem);
    
    // Optionally remove the item being edited from the list
    // This step is often skipped if you want to keep the list unchanged during editing.
    setAnswersList(answersList.filter(item => item !== answerItem));
  };

  return (
    <main className="survey">
      <section className={`survey__list`}>
        <h2>Answers list</h2>
        <AnswersList answersList={answersList} onEdit={handleEdit} /> {/* Pass onEdit to display answers */}
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            {/* Radio inputs */}
            <ul>
              {[1, 2, 3, 4].map((num) => (
                <li key={num}>
                  <input
                    id={`color-${num}`}
                    type="radio"
                    name="colour"
                    value={num}
                    checked={formData.colour === num.toString()}
                    onChange={handleChange}
                  />
                  <label htmlFor={`color-${num}`}>{num}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck?</h3>
            {/* Checkboxes */}
            <ul>
              {["swimming", "bathing", "chatting", "noTime"].map((value) => (
                <li key={value}>
                  <label>
                    <input
                      name="timeSpent"
                      type="checkbox"
                      value={value}
                      checked={formData.timeSpent.includes(value)}
                      onChange={handleChange}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              value={formData.review}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
