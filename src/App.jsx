import "./App.css";
import { useState } from "react";
import api from "./services/api/";
function App() {
  const [cep, setCep] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const handleFocus = () => {
    setIsFocused(true);
    setTimeout(() => {
      setIsFocused(false);
    }, 5000);
  };

  async function handleSearch() {
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("")
    } catch {
      alert("Erro ao buscar o cep");
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input != "") {
      handleSearch();
    }
    if (event.key === "Enter" && input === "") {
      alert("Preencha o campo necessário");
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Buscador de CEP</h1>
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite seu CEP..."
        />
        {Object.keys(cep).length > 0 && (
          <div className="content">
            <h2>{cep.cep}</h2>
            <span>Logradouro: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span className="cidade-estado">
              {cep.localidade} - {cep.uf}
            </span>
          </div>
        )}
      </div>
      {isFocused && (
        <div className="mensagem">
          <span>Clique em Enter para enviar</span>
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default App;
