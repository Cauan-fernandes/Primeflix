import { useEffect, useState } from "react";
import "./index.css";
import { toast } from "react-toastify";

export default function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const listaFilmes = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(listaFilmes) || []);
  }, []);
  function deleteFilme(id) {
    const novosFilmes = filmes.filter((filme) => filme.id !== id);
    setFilmes(novosFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(novosFilmes));
    toast.success("Filme removido com sucesso", {
      autoClose: 2000,
      pauseOnHover: false,
      closeOnClick: true,
    });
  }
  return (
    <>
      <h1>Filmes Favoritos</h1>
      {filmes.length === 0 && <span>Você não possui filmes favoritos :) </span>}
      <div className="filmes">
        {filmes.map((filme) => (
          <div className="filmes-info" key={filme.id}>
            <h2>{filme.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}
            />
            <button onClick={() => deleteFilme(filme.id)}>Remover</button>
          </div>
        ))}
      </div>
    </>
  );
}
