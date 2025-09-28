'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl'; 

type Pokemon = {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
};

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const t = useTranslations();

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
      const data = await res.json();

      const pokemonsData = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          const pokemonData = await res.json();
          return {
            name: pokemonData.name,
            id: pokemonData.id,
            types: pokemonData.types,
            sprites: pokemonData.sprites,
          };
        })
      );

      setPokemons(pokemonsData);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="bg-[#D9E9FE]">
      <h1 className="text-3xl text-center mb-6">{t('HomePage.title')}</h1> 

      <div className="grid grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`bg-white border-4 p-4 rounded-lg ${getBorderColor(pokemon.types[0].type.name)} flex flex-col items-center`}
          >
            <Link href={`/pokemon/${pokemon.id}`}>
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                width={150}
                height={150}
                className="mx-auto"
              />
            </Link>
            <h2 className="text-xl text-center mt-2">{pokemon.name}</h2>
            <p
              className={`text-center py-1 px-3 rounded-full text-white ${getBackgroundColor(
                pokemon.types[0].type.name
              )}`}
            >
              {pokemon.types[0].type.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

