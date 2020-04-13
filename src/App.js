import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('repositories')
      setRepositories(response.data)
    }
    getRepositories();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/brunocrodriguessouza?tab=repositories",
      title: "SemanaOmnistackWeek11",
      techs: ["Node.js", "ReactJS", "React Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      setRepositories(repositories.filter((repository) => repository.id !== id));
    }
  }

  return (

    < div >
      <ul data-testid="repository-list">
        {
          repositories
            .map(repository => {
              return (
                <li key={repository.id}>
                  {repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
              )
            })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
