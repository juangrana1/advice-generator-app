import Divider from "./images/pattern-divider-desktop.svg";
import DividerMobile from "./images/pattern-divider-mobile.svg";
import Dice from "./images/icon-dice.svg";
import { useEffect, useState, useTransition } from "react";

interface Advice {
  id: number;
  advice: string;
}

function App() {
  const randomNumber = Math.floor(Math.random() * 224);
  const [fetchedData, setFetchedData] = useState<Advice>({
    id: 0,
    advice: "",
  });
  const [randomId, setRandomId] = useState<number>(randomNumber);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const mobileWidth = 600;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.adviceslip.com/advice/${randomId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data.slip);
      setFetchedData(data.slip);
      setIsLoading(false);
    };
    fetchData();
  }, [randomId, setFetchedData, setIsLoading]);

  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [window.innerWidth]);

  const [isPending, startTransition] = useTransition();

  function randomizeAdvice() {
    startTransition(() => {
      setRandomId(randomNumber);
    });
  }

  return (
    <div className="background">
      <div className="container">
        {!fetchedData ? (
          <div className="loading">SOMETHING WENT WRONG... TRY AGAIN</div>
        ) : !isLoading && !isPending ? (
          <>
            <div className="advice-number">{`ADVICE #${fetchedData.id}`}</div>
            <div className="advice">"{fetchedData.advice}"</div>
          </>
        ) : (
          <div className="loading">LOADING</div>
        )}
        {screenWidth <= mobileWidth ? (
          <img src={DividerMobile} alt="Divider" className="divider" />
        ) : (
          <img src={Divider} alt="Divider" className="divider" />
        )}
        <button className="button" onClick={randomizeAdvice}>
          <img src={Dice} alt="Dice" className="button__content" />
        </button>
      </div>
    </div>
  );
}

export default App;
