import PropTypes from "prop-types";
import ImagePoke from "./ImagePoke";
import { useState } from "react";

export default function PokeCard({ item }) {
  const [openDetails, setOpenDetails] = useState(false);
  const handleClickOpen = () => {
    setOpenDetails(!openDetails);
  };
  const getWidth = (value, key) => {
    let widthVal = 0;
    if (key == "hp") widthVal = `${(265 / 255) * value}px`;
    if (key == "speed") widthVal = `${(265 / 180) * value}px`;
    if (key == "attack") widthVal = `${(265 / 180) * value}px`;
    if (key == "defense") widthVal = `${(265 / 230) * value}px`;
    if (key == "sp_attack") widthVal = `${(265 / 180) * value}px`;
    if (key == "sp_defense") widthVal = `${(265 / 230) * value}px`;

    
    //((widthVal/180)>=0.6) ? colorVal="#EAB308" : ((widthVal/180)>=0.3 && (widthVal/180)<0.6) ? colorVal="#EAB308" : ((widthVal/180)<0.3) ? colorVal="#FB923C" : colorVal=""

    return widthVal;
  };
  const getColor = (widthVal) => {
    widthVal = widthVal/100
    let colorVal = "";
    if (widthVal>= 1) colorVal = "#14532D";
    if (widthVal>= 0.8 && widthVal <1) colorVal = "#16A34A";
    if (widthVal>= 0.6 && widthVal< 0.8) colorVal = "#CA8A04";
    if (widthVal>= 0.4 && widthVal< 0.6) colorVal = "#FACC15";
    if (widthVal< 0.4 && widthVal >= 0.2) colorVal = "#FB923C";
    if (widthVal< 0.2) colorVal = "#EF4444";
    return colorVal
  };
  return (
    <div className="pokemon-card" onClick={handleClickOpen}>
      <p className="pokemon-name">{item.name}</p>
      {!openDetails && (
        <div className="pokemon-types">
          {item.types.map((type, ind) => (
            <p key={ind}>{type}</p>
          ))}
        </div>
      )}
      {openDetails && (
        <div className="pokeDetails">
          {Object.keys(item.stats).map((key, index) => (
            <div key={index} className="stat-wrapper">
              <div className="key-value-wrapper">
                <label>{key}</label>
                <span>{item.stats[key]}</span>
              </div>
              <div className="stat-outer-bar">
                <div
                  className="stat-inner-bar"
                  style={{
                    width: getWidth(item.stats[key], key),
                    backgroundColor: getColor(item.stats[key]),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!openDetails && <ImagePoke item={item} />}
    </div>
  );
}

PokeCard.propTypes = {
  item: PropTypes.object,
};
