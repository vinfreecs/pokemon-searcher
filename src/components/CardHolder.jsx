import PropTypes from "prop-types"
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
              <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`} alt="" />
            </div>
          ))}
      </section>
        </>
    )
}

CardHolder.propTypes = {
    pokemonList : PropTypes.array
}