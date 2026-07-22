import './App.css'
import PokemonList from './components/PokemonList'

function App() {
  
  return (
    <>
      <div>
        <h1>Pokedex</h1>
        <p>Welcome to the Pokedex! Explore the world of Pokémon and discover their unique characteristics, types, and evolution lines.</p>
        <p>Click on a Pokémon to learn more about it!</p>
      </div>
      <div>
        {/* Here you can add your PokemonList component or any other components */}
        <PokemonList />
      </div>
    </>
  )
}

export default App
