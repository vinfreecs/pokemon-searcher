import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CardHolder from "./components/CardHolder";
import searchSvg from "./assets/search.svg"

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  const [search, setSearch] = useState("");
  const [value,setValue] = useState("")
  const pokeTypes = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow",
  ];
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

  const fetchSearchData = async (val) => {
    try {
      const responsePoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${val}`
      );
      console.log(responsePoke);
      setSearchedItem([
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
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchedItem([])
    fetchSearchData(e.target.value);
  };

  const fetchTypeData = async (val) =>{
    if(val[0]=="?"){
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${val}`
      );
      setPokemonList([])
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
    }
    else{
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${val}`)
    console.log(response.data.pokemon)
    setPokemonList([])
    await Promise.all(
      response.data.pokemon.map(async (item) => {
        const responsePoke = await axios.get(item.pokemon.url);
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
    )
    }
  }

  const handleSeChange = (e) =>{
    setValue(e.target.value)
    fetchTypeData(e.target.value)
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div className="search-wrapper">
      <img src={searchSvg} alt="" />
    <input
      className="search"
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search"
      />
    </div>
      
      <select name="pets" id="pet-select" value={value} onChange={handleSeChange}>
        <option value="?limit=5">--Please choose an option--</option>
        <option value="?limit=10">top 10</option>
        <option value="?limit=100">top 100</option>
        {pokeTypes.map((item,index) => (
          <option value={item} key={index}>{item}</option>
        ))}
      </select>
      <CardHolder pokemonList={searchedItem} />
      { searchedItem.length == 0  && <CardHolder pokemonList={pokemonList} />}
    </>
  );
}

export default App;
