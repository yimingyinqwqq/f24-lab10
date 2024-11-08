import React, { useState, useRef } from 'react'
import QuizCore from '../core/QuizCore';
import './Quiz.css'

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  const quizCoreRef = useRef<QuizCore>(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  const handleOptionSelect = (option: string): void => {
    if (selectedAnswer === option) {
      // unselect selected options
      setSelectedAnswer(undefined);
    } else {
      setSelectedAnswer(option);
    }
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    if (selectedAnswer === undefined) {
      // TODO:
    } else {
      quizCoreRef.current.answerQuestion(selectedAnswer);
      quizCoreRef.current.nextQuestion();

      // unselect selected options
      setSelectedAnswer(undefined);
    }
  }

  const currentQuestion = quizCoreRef.current.getCurrentQuestion();
  const score = quizCoreRef.current.getScore();
  const questionLength = quizCoreRef.current.getTotalQuestions();

  if (!currentQuestion) {
    return (
      <div className='quiz-completed'>
        <h2>Quiz Completed</h2>
        <p className='score'>Final Score: {score} out of {questionLength}</p>
      </div>
    );
  }

  return (
    <div className='quiz-container'>
      <div className='quiz-header'>
        <h1>My React Quiz</h1>
      </div>

      <h2>Quiz Question:</h2>
      <p className='question'>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      {
        quizCoreRef.current.hasNextQuestion() ?
          <button onClick={handleButtonClick}>Next Question</button> :
          <button onClick={handleButtonClick}>Submit</button>
      }

    </div>
  );
};

export default Quiz;