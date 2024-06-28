import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTma } from "../../../context/tmaProvider";
import axios from "axios";

function Quizzes() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const apiUrl = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const { setIsLoading } = useTma();
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const domainDetails = {
    Technology: {
      name: "Technology",
      img: "/techdomain.png",
    },
    "General Knowledge": {
      name: "General Knowledge",
      img: "/gkdomain.png",
    },
  };
  const { domain } = useParams();

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}questions/10/${domain}`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (domainDetails[domain]) {
      setSelectedDomain(domainDetails[domain]);
    } else {
      console.error(`Domain "${domain}" is not recognized.`);
    }
    fetchQuestions();
  }, [domain]);

  const handleAnswerChange = (question, answer) => {
    setAnswers({
      ...answers,
      [question]: answer,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[question.question] === question.correctAnswer) {
        score += 1;
      }
    });

    if (
      window.confirm(
        `Your score is ${score} out of ${questions.length}\nDo you want to play again?`
      )
    ) {
      setCounter(0);
      setAnswers({});
      fetchQuestions();
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedDomain) {
    return <div>Invalid domain selected</div>;
  }

  return (
    <div className="Quizzes">
      <div className="domain-intro">
        <img src={selectedDomain.img} alt={selectedDomain.name} />
        <h2>{selectedDomain.name}</h2>
      </div>
      <div className="line"></div>
      <h1>{selectedDomain.name} Questions</h1>
      <div className="questionsContainer">
        {questions.map((question, index) => (
          <div
            key={index}
            style={{
              transform: `translateX(-${counter * 100}%)`,
            }}
            className="oneQuestion"
          >
            <label htmlFor="">{question.question}</label>
            <div>
              {question.options.map((option, optionIndex) => (
                <span key={optionIndex}>
                  <input
                    type="radio"
                    id={option}
                    name={question.question}
                    value={option}
                    onChange={() =>
                      handleAnswerChange(question.question, option)
                    }
                  />
                  <label htmlFor={option}>{option}</label>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="controller">
        <button
          disabled={counter === 0}
          onClick={() => {
            setCounter(counter - 1);
          }}
        >
          Prev
        </button>
        {counter !== questions.length - 1 ? (
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            Next
          </button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default Quizzes;
