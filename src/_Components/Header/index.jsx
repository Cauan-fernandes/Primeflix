import { Link } from "react-router-dom";
import "./index.css";
export default function Header() {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          Primeflix
        </Link>
        <Link to={"/favoritos"} className="link">
          Meus Filmes
        </Link>
      </header>
    </>
  );
}
