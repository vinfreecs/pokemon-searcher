import PropTypes from "prop-types";
import PokeCard from "./PokeCard";
export default function CardHolder({ pokemonList }) {
  return (
    <>
      <section className="card-holder">
        {pokemonList &&
          pokemonList.map((item, index) => (
            <PokeCard key={index} item={item} />
          ))}
      </section>
    </>
  );
}

CardHolder.propTypes = {
  pokemonList: PropTypes.array,
};
