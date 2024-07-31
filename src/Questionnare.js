import React, { useState } from 'react';
import './Questionnaire.css'; // Import the CSS file

const initialQuestions = [
  { id: 1, text: "What is your name?", type: "text", answer: null },
  { id: 2, text: "What is your age?", type: "text", answer: null },
  { id: 3, text: "What is your favorite color?", type: "radio", options: ["Red", "Blue", "Green"], answer: null },
  { id: 4, text: "Please describe yourself", type: "textarea", answer: null }
];

const Questionnaire = () => {
  const [questions, setQuestions] = useState(initialQuestions);

  const handleAnswerChange = (e, questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, answer: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleRadioChange = (e, questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, answer: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    const jsonString = JSON.stringify(questions, null, 2);
  console.log('Answers in JSON format:', jsonString);
    
  };

  const questionElements = [];
  questions.forEach((question) => {
    if (question.type === "text") {
      questionElements.push(
        <div key={question.id} className="question">
          <p className="question-text">{question.text}</p>
          <input
            type="text"
            value={question.answer || ''}
            onChange={(e) => handleAnswerChange(e, question.id)}
          />
        </div>
      );
    } else if (question.type === "radio") {
      const radioOptions = question.options.map((option, index) => (
        <label key={index} className="radio-option">
          <input
            type="radio"
            value={option}
            checked={question.answer === option}
            onChange={(e) => handleRadioChange(e, question.id)}
          />
          {option}
        </label>
      ));
      questionElements.push(
        <div key={question.id} className="question">
          <p className="question-text">{question.text}</p>
          {radioOptions}
        </div>
      );
    } else if (question.type === "textarea") {
      questionElements.push(
        <div key={question.id} className="question">
          <p className="question-text">{question.text}</p>
          <textarea
            value={question.answer || ''}
            onChange={(e) => handleAnswerChange(e, question.id)}
          />
        </div>
      );
    }
  });

  return (
    <div className="questionnaire">
      <h1 className="title">Questionnaire</h1>
      {questionElements}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Questionnaire;