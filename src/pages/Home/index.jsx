import api from "../../Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "6e8af1fec6099c4c0184ef3f88825685",
          language: "pt-BR",
          page: page,
        },
      });
      setFilmes(response.data.results.slice(0, 12));
      setLoading(false);
    }
    loadFilmes();
    window.scrollTo(0, 0);
  }, [page]);
  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filmes) => {
          return (
            <article key={filmes.id}>
              <strong>{filmes.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`}
                alt={filmes.title}
              />
              <Link to={`filme/${filmes.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
      <div className="botoes">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          <FcPrevious />
        </button>
        <button onClick={() => setPage((p) => p + 1)}>
          <FcNext />
        </button>
      </div>
    </div>
  );
}
