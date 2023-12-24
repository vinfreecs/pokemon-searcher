import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function ImagePoke({ item }) {
  const [image, setImage] = useState(
    `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`
  );
  const fetchImg = async () => {
    try {
      const address = await axios.get(
        `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`
      );
      if (address.status == 200) {
        setImage((prevstate) => {
          let newState = prevstate;
          newState = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`;
          return newState;
        });
      }
    } catch (error) {
      console.log(error);
      setImage((prevstate) => {
        let newState = prevstate;
        newState = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;
        return newState;
      });
    }
  };
  useEffect(() => {
    fetchImg();
  }, []);
  return <img src={image} alt={item.name} />;
}
ImagePoke.propTypes = {
  item: PropTypes.object,
};
