import React, { useState, useEffect } from "react";

import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get("/repositories");
        setRepositories(response.data);
      } catch (error) {
        toast.error("Erro ao carregar dados.");
      }
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Novo repositório ${Date.now()}`,
      url: "",
      techs: [],
    };

    const { data } = await api.post("/repositories", repository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const newRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(newRepositories);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
