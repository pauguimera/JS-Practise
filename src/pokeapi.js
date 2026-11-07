const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemonImage(id) {
  try {
    const result = await fetch(`${POKEAPI_URL}/${id}`);
    const data = await result.json();
    return data.sprites.front_default;
  } catch (error) {
    console.log(error);
  }
}