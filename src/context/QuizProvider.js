import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const defaultQuizval = {
    numberOfQuestions: 20,
    range: 10,
    operators: ["+", "-", "*", "/"],
    questionNo: 1,
    userAnswers: [],
    score: 0,
  };
  const initialValue = {
    quiz1: defaultQuizval,
    quiz2: defaultQuizval,
  };
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "RESET_QUIZ": {
        const quizNo = action.payload;
        return {
          ...state,
          [quizNo]: defaultQuizval,
        };
      }

      case "SET_QUIZ_DATA": {
        const { quizNo, quizData } = action.payload;
        return {
          ...state,
          [quizNo]: { ...state[quizNo], ...quizData },
        };
      }
      case "SET_QUESTION_NO": {
        const { quizNo, questionNo } = action.payload;
        return {
          ...state,
          [quizNo]: { ...state[quizNo], questionNo: questionNo },
        };
      }

      case "SET_ANSWER": {
        const { quizNo, userAnswer } = action.payload;
        return {
          ...state,
          [quizNo]: {
            ...state[quizNo],
            userAnswers: [...state[quizNo].userAnswers, userAnswer],
          },
        };
      }
      case "SET_SCORE": {
        const { quizNo, score } = action.payload;
        return { ...state, [quizNo]: { ...state[quizNo], score } };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunc, initialValue);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
