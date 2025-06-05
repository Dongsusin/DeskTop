import { typeKoMap } from "./constants";

export const getPokemonImage = async (id, fallbackUrl) => {
  const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  try {
    const res = await fetch(gifUrl, { method: "HEAD" });
    if (res.ok) return gifUrl;
  } catch {}
  return fallbackUrl;
};

const getPokemonDetail = async (urlOrId) => {
  const detailRes = await fetch(
    typeof urlOrId === "string"
      ? urlOrId
      : `https://pokeapi.co/api/v2/pokemon/${urlOrId}`
  );
  const detail = await detailRes.json();

  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${detail.id}`
  );
  const species = await speciesRes.json();
  const koreanName =
    species.names.find((n) => n.language.name === "ko")?.name || detail.name;

  const image = await getPokemonImage(detail.id, detail.sprites.front_default);

  return {
    id: detail.id,
    name: koreanName,
    image,
    types: detail.types.map((t) => typeKoMap[t.type.name]),
    stats: detail.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  };
};

export const fetchPokemonList = async (page, setLoading, setList) => {
  setLoading(true);
  const offset = (page - 1) * 30;
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
    );
    const data = await res.json();
    const details = await Promise.all(
      data.results.map((p) => getPokemonDetail(p.url))
    );
    setList(details);
  } catch {
    alert("포켓몬 데이터를 불러오는 중 오류가 발생했습니다.");
    setList([]);
  }
  setLoading(false);
};

export const fetchTypeFilteredList = async (type, setLoading, setFiltered) => {
  setLoading(true);
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    setFiltered(data.pokemon.map((p) => p.pokemon));
  } catch {
    alert("타입 데이터를 불러오는 중 오류가 발생했습니다.");
    setFiltered([]);
  }
  setLoading(false);
};

export const fetchFilteredPageDetails = async (
  page,
  list,
  limit,
  setLoading,
  setList
) => {
  setLoading(true);
  const offset = (page - 1) * limit;
  const sliced = list.slice(offset, offset + limit);
  try {
    const details = await Promise.all(
      sliced.map((p) => getPokemonDetail(p.url))
    );
    setList(details);
  } catch {
    alert("상세 데이터를 불러오는 중 오류가 발생했습니다.");
    setList([]);
  }
  setLoading(false);
};

export const getPokemonByName = async (name) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Not found");
    return await getPokemonDetail(name);
  } catch {
    alert("포켓몬을 찾을 수 없습니다.");
    return null;
  }
};

export const getPokemonById = async (id) => {
  try {
    return await getPokemonDetail(id);
  } catch {
    return null;
  }
};

export const fetchEvolutionChain = async (id) => {
  try {
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const species = await speciesRes.json();
    const evoRes = await fetch(species.evolution_chain.url);
    const evoData = await evoRes.json();
    const chain = [];
    let current = evoData.chain;
    while (current) {
      const detail = await getPokemonDetail(current.species.name);
      chain.push(detail);
      current = current.evolves_to[0];
    }
    return chain;
  } catch {
    return [];
  }
};
