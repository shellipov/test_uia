import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeHisrory } from "../../redux/actions";

import langData from "../../data/langData";

const HistoryWeather: React.FC = () => {
  const dispatch = useDispatch();
  const userHistory = useSelector((store) => store.main.userHistory);
  const lang = useSelector((store) => store.main.lang);
  const [isSorted, setIsSorted] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(5);

  const handleSort = (e): void => {
    setIsSorted(!isSorted);
    const sortHistory = userHistory.reverse();
    dispatch(changeHisrory(sortHistory));
  };

  const moreCards = (e): void => {
    setNumberOfCards(numberOfCards + 5);
  };

  return (
    <>
      <section className="container-fluid">
        <h1>{langData[lang].weatherHistory}</h1>
        <div>
          <span>{langData[lang].sort} </span>
          <button className="btn " onClick={handleSort}>
            {isSorted ? "⬆️" : "⬇️"}
          </button>
        </div>
        {userHistory.slice(0, numberOfCards).map((item) => {
          return (
            <div className="card" key={item.number}>
              <div>
                {" "}
                {langData[lang].requestNumber} - {item.number}{" "}
              </div>
              <div>
                {" "}
                {langData[lang].requestDate} - {item.date}{" "}
              </div>
              <div>
                {" "}
                {langData[lang].city} - {item.city}
              </div>
              <div>
                {" "}
                {langData[lang].temp} - {item.temp}{" "}
              </div>
            </div>
          );
        })}
        <div>
          <span>{langData[lang].sort} </span>
          <button className="btn " onClick={handleSort}>
            {isSorted ? "⬆️" : "⬇️"}
          </button>
        </div>
        <button className="btn btn-primary" onClick={moreCards}>
          {langData[lang].more}
        </button>
      </section>
    </>
  );
};

export default HistoryWeather;
