import { notFound } from 'next/navigation'; 
import Image from 'next/image';

type PokemonDetailProps = {
  pokemon: {
    name: string;
    id: number;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    sprites: { other: { 'official-artwork': { front_default: string } } };
  };
};

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetching the Pokémon details
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    notFound();
  }

  const getBorderColor = (type: string) => {
    const colorTypes: { [key: string]: string } = {
      bug: 'border-[#a8b820]',
      dark: 'border-[#705848]',
      dragon: 'border-[#7038f8]',
      electric: 'border-[#f8d030]',
      fairy: 'border-[#f0a6f7]',
      fighting: 'border-[#c03028]',
      fire: 'border-[#f08030]',
      flying: 'border-[#a890f0]',
      ghost: 'border-[#705898]',
      grass: 'border-[#78c850]',
      ground: 'border-[#e0c068]',
      ice: 'border-[#98d8d8]',
      normal: 'border-[#a8a878]',
      poison: 'border-[#a040a0]',
      psychic: 'border-[#f85888]',
      rock: 'border-[#b8a038]',
      water: 'border-[#6890f0]',
    };

    return colorTypes[type] || 'border-[#a8a878]'; 
  };

  const data = await res.json();

  const pokemon = {
    name: data.name,
    id: data.id,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    types: data.types,
    sprites: data.sprites,
  };

  return (
    <div className="bg-[#E0F5FF] min-h-screen py-8">
      <h1 className="text-4xl text-center mb-6 text-red-700">{pokemon.name} - Detalles del Pokemon</h1>
      <div className="flex justify-center mb-6">
        <div className="border-4 border-[#78c850] p-4 rounded-lg">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width={250}
            height={250}
          />
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <p className="text-xl">Altura: {pokemon.height / 10} m</p>
          <p className="text-xl">Peso: {pokemon.weight / 10} kg</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl text-center mb-4">Habilidades:</h2>
          <ul className="list-disc pl-8">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="text-lg">{ability.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl text-center mb-4">Tipos:</h2>
          <div className="flex justify-center gap-4">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-white ${getBorderColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#11463B] text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Pokémon. Todos los derechos reservados.</p>
          <p className="mt-2">Desarrollado para: ISIS3710</p>
        </div>
      </footer>
    </div>
  );
};

export default PokemonDetail;

