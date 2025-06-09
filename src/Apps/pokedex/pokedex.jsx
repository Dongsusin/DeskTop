import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonModal from "./components/PokemonModal";
import Pagination from "./components/Pagination";
import {
  fetchPokemonList,
  fetchTypeFilteredList,
  fetchFilteredPageDetails,
  getPokemonByName,
  getPokemonById,
} from "./utils/api";
import { typeKoMap } from "./utils/constants";
import "./pokedex.css";

function Pokedex() {
  const [showIntro, setShowIntro] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [recent, setRecent] = useState(() =>
    JSON.parse(localStorage.getItem("recent") || "[]")
  );
  const limit = 30;
  const [typeFilteredAll, setTypeFilteredAll] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeFilter === "favorite") {
      setPokemonList(favorites);
    } else if (typeFilter) {
      const typeKey = Object.keys(typeKoMap).find(
        (key) => typeKoMap[key] === typeFilter
      );
      fetchTypeFilteredList(typeKey, setLoading, setTypeFilteredAll);
    } else {
      setTypeFilteredAll([]);
      setPage(1);
      fetchPokemonList(1, setLoading, setPokemonList);
    }
  }, [typeFilter, favorites]);

  useEffect(() => {
    if (typeFilter && typeFilter !== "favorite" && typeFilteredAll.length > 0) {
      setPage(1);
      fetchFilteredPageDetails(
        1,
        typeFilteredAll,
        limit,
        setLoading,
        setPokemonList
      );
    }
  }, [typeFilteredAll]);

  useEffect(() => {
    if (typeFilter === "favorite") {
      setPokemonList(favorites);
    } else if (typeFilter) {
      fetchFilteredPageDetails(
        page,
        typeFilteredAll,
        limit,
        setLoading,
        setPokemonList
      );
    } else {
      fetchPokemonList(page, setLoading, setPokemonList);
    }
  }, [page]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    const result = await getPokemonByName(searchTerm);
    if (result) {
      setSelectedPokemon(result);
      setRecent((prev) =>
        [result, ...prev.filter((p) => p.id !== result.id)].slice(0, 5)
      );
    }
  };

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const handleDetailNav = async (direction) => {
    if (!selectedPokemon) return;
    const nextId =
      direction === "next" ? selectedPokemon.id + 1 : selectedPokemon.id - 1;
    if (nextId < 1) return;
    const result = await getPokemonById(nextId);
    if (result) setSelectedPokemon(result);
  };

  return (
    <div className="pokedex-container">
      {showIntro && (
        <div className="intro-container">
          <img
            src="/image/포켓볼.jpg"
            alt="Intro Pokeball"
            className="intro-image"
          />
        </div>
      )}
      {!showIntro && (
        <>
          <Header
            searchTerm={searchTerm}
            onSearchTermChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            typeFilter={typeFilter}
            onTypeChange={(e) => setTypeFilter(e.target.value)}
            typeOptions={Object.values(typeKoMap)}
          />
          {loading && <div className="loading">로딩 중...</div>}
          {!selectedPokemon && (
            <main>
              <PokemonList
                pokemonList={pokemonList}
                onSelect={setSelectedPokemon}
              />
              {typeFilter !== "favorite" && (
                <Pagination
                  page={page}
                  onPageChange={setPage}
                  total={typeFilter ? typeFilteredAll.length : 1118}
                  limit={limit}
                />
              )}
            </main>
          )}
          {selectedPokemon && (
            <PokemonModal
              pokemon={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
              onFavorite={toggleFavorite}
              favorites={favorites}
              onNavigate={handleDetailNav}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Pokedex;
