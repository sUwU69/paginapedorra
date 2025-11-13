import SearchHero from '../SearchHero';

export default function SearchHeroExample() {
  return (
    <SearchHero onSearch={(query, rubro, jornada, ubicacion) => {
      console.log('Búsqueda realizada:', { query, rubro, jornada, ubicacion });
    }} />
  );
}
