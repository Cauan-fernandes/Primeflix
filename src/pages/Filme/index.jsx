import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Api";
import "./index.css";
import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "6e8af1fec6099c4c0184ef3f88825685",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
        })
        .catch(() => {
          console.log("Filme nao encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let listaFilmes = JSON.parse(minhaLista) || [];
    const hasFilme = listaFilmes.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );
    if (hasFilme) {
      toast.warn("Filme já está na lista", {
        autoClose: 900,
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }
    listaFilmes.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(listaFilmes));
    toast.success("Filme salvo com sucesso", {
      autoClose: 900,
      pauseOnHover: false,
      closeOnClick: true,
    });
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}/10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://www.youtube.com/results?search_query=${filme.title}  trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
