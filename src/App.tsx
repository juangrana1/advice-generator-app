import Divider from "./images/pattern-divider-desktop.svg";
import Dice from "./images/icon-dice.svg";
import { useEffect, useState } from "react";

function App() {
  const randomNumber = Math.floor(Math.random() * 224);
  const [fetchedData, setFetchedData] = useState<{
    id: number;
    advice: string;
  }>({ id: 0, advice: "" });
  const [randomId, setRandomId] = useState<number>(randomNumber);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://api.adviceslip.com/advice/${randomId}`
        );
        const data = await response.json();
        setFetchedData(data.slip);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }), [randomId];

  function randomizeAdvice() {
    setIsLoading(true);
    setRandomId(randomNumber);
  }

  return (
    <div className="background">
      <div className="container">
        {!isLoading ? (
          <>
            <div className="advice-number">{`ADVICE #${fetchedData.id}`}</div>
            <div className="advice">"{fetchedData.advice}"</div>
          </>
        ) : (
          <div className="loading">LOADING</div>
        )}
        <img src={Divider} alt="Divider" className="divider" />
        <button className="button" onClick={randomizeAdvice}>
          <img src={Dice} alt="Dice" className="button__content" />
        </button>
      </div>
    </div>
  );
}

export default App;
