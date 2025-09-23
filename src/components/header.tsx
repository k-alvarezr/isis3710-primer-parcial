import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-[#E71309] py-4">
      <div className="container mx-auto flex justify-center">
        <Link href="/">
            <img
              src="/pokemon-logo.png"
              alt="Pokémon Logo"
              className="h-16"
            />
        </Link>
      </div>
    </header>
  );
};

export default Header;
