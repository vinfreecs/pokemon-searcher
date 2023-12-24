
import PropTypes from "prop-types"
import ImagePoke from "./ImagePoke"
export default function CardHolder({pokemonList}){
  
    return(
        <>
        <section className="card-holder">
        {pokemonList &&
          pokemonList.map((item, index) => (
            <div key={index} className="pokemon-card">
              <p className="pokemon-name">{item.name}</p>
              <div className="pokemon-types">
                {item.types.map((type,ind)=> (
                  <p key={ind}>{type}</p>
                ))}
              </div>
                  <ImagePoke item={item} />
            </div>
          ))}
      </section>
        </>
    )
}

CardHolder.propTypes = {
    pokemonList : PropTypes.array
}