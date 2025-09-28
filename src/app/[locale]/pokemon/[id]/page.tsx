import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/footer';

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

  // Obtener las traducciones
  const t = await getTranslations('HomePage');

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    notFound();
  }

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
      <h1 className="text-4xl text-center mb-6 text-black font-bold">
        {t('title', { name: pokemon.name })}
      </h1>

      <div className="flex justify-center items-center mb-6">
        <div className={`border-4 ${getBorderColor(pokemon.types[0].type.name)} bg-white p-4 rounded-lg`}>
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width={250}
            height={250}
          />
        </div>

        <div className="ml-8 flex flex-col justify-center">
          <p className="text-xl">{t('height')}: {pokemon.height / 10} m</p>
          <p className="text-xl">{t('weight')}: {pokemon.weight / 10} kg</p>

          <div className="mt-4">
            <h3 className="text-xl">{t('abilities')}:</h3>
            <ul className="list-disc pl-6">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="text-lg">{ability.ability.name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl">{t('types')}:</h3>
            <div className="flex gap-4">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-white ${getBackgroundColor(type.type.name)}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer />
    </div>
  );
};

export default PokemonDetail;

const getBackgroundColor = (type: string) => {
  const colorTypes: { [key: string]: string } = {
    bug: 'bg-[#a8b820]',
    dark: 'bg-[#705848]',
    dragon: 'bg-[#7038f8]',
    electric: 'bg-[#f8d030]',
    fairy: 'bg-[#f0a6f7]',
    fighting: 'bg-[#c03028]',
    fire: 'bg-[#f08030]',
    flying: 'bg-[#a890f0]',
    ghost: 'bg-[#705898]',
    grass: 'bg-[#78c850]', 
    ground: 'bg-[#e0c068]',
    ice: 'bg-[#98d8d8]',
    normal: 'bg-[#a8a878]',
    poison: 'bg-[#a040a0]', 
    psychic: 'bg-[#f85888]',
    rock: 'bg-[#b8a038]',
    water: 'bg-[#6890f0]',
  };

  return colorTypes[type] || 'bg-[#a8a878]';
};

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
