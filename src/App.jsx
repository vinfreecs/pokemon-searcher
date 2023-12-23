import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CardHolder from "./components/CardHolder";

function App() {
  const [searchedItems, setSearchedItems] = useState();
  const [pokemonList, setPokemonList] = useState([]);
  const [search,setSearch] = useState("")
  const getTypesOfPoke = (types) => {
    const pokeTypes = [];
    types.map((item) => {
      pokeTypes.push(item.type.name);
    });
    return pokeTypes;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=5"
      );
      setSearchedItems(response.data);
      await Promise.all(
        response.data.results.map(async (item) => {
          const responsePoke = await axios.get(item.url);
          setPokemonList((prevState) => {
            const newState = [...prevState];
            if (
              newState.findIndex((ele) => ele.id == responsePoke.data.id) != -1
            ) {
              return newState;
            }
            return [
              ...newState,
              {
                id: responsePoke.data.id,
                name: responsePoke.data.name,
                stats: {
                  speed: responsePoke.data.stats[5].base_stat,
                  sp_defense: responsePoke.data.stats[4].base_stat,
                  sp_attack: responsePoke.data.stats[3].base_stat,
                  defense: responsePoke.data.stats[2].base_stat,
                  attack: responsePoke.data.stats[1].base_stat,
                  hp: responsePoke.data.stats[0].base_stat,
                },
                types: getTypesOfPoke(responsePoke.data.types),
              },
            ];
          });
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchData = async () =>{
    const response = await axios.get("")
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"  />
    <CardHolder pokemonList={pokemonList}/>
    </>
  );
}

export default App;
