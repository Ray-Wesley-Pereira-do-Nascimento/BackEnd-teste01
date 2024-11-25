import React, { useState } from 'react';
import axios from 'axios';
import './TelaGit.css';
import Header from '../../Header/Header.js';

function TelaGit() {
  const [projeto, setProjeto] = useState('');
  const [branch, setBranch] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('projeto', projeto);
    formData.append('branch', branch);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000
      });
      setIsLoading(false); // Oculta o pop-up antes de exibir o alerta
      alert('Arquivo enviado com sucesso!');
    } catch (error) {
      setIsLoading(false); // Oculta o pop-up antes de exibir o alerta de erro
      console.error('Erro ao enviar arquivo:', error);
      alert('Erro ao enviar arquivo. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <Header />
      <div className='telagit'>
        <body className='bodyy'>
          <form onSubmit={handleSubmit}>
            <h2>Insira as Informações</h2>
            <div className="input-container">
              <label htmlFor="projeto">Projeto (URL do repositório Git):</label>
              <input
                type="text"
                id="projeto"
                value={projeto}
                onChange={(e) => setProjeto(e.target.value)}
                placeholder="Digite a URL do repositório"
              />
            </div>
            <div className="input-container">
              <label htmlFor="branch">Branch:</label>
              <input
                type="text"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Digite o nome da branch"
              />
            </div>
            <div className="input-container">
              <label htmlFor="arquivo">Anexar:</label>
              <input
                type="file"
                id="arquivo"
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
              />
            </div>
            <button type="submit">Enviar</button>
          </form>

          {/* Pop-up de carregamento */}
          {isLoading && (
            <div className="popup">
              <p>Aguarde, enviando...</p>
            </div>
          )}
        </body>
      </div>
    </div>
  );
}

export default TelaGit;
