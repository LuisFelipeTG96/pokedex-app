export const PokemonModel = {
  // Define the properties of the Pokemon model
  id: {
    type: "number",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  type: {
    type: "string",
    required: true,
  },
}