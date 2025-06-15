async function carregarCards() {
  const tipo = new URLSearchParams(window.location.search).get('tipo');
  console.log('Tipo da URL:', tipo);

  const resposta = await fetch('assets/server/dados.json');
  const dados = await resposta.json();
  console.log('JSON carregado:', dados);

  const container = document.getElementById('cards-container');

  if (tipo && dados[tipo]) {
    container.innerHTML = '';
    dados[tipo].forEach(card => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${card.imagem}" alt="Imagem do card">
        <p>${card.descricao}</p>
      `;
      container.appendChild(div);
    });
  } else {
    container.innerHTML = `<p>Tipo "${tipo}" não encontrado.</p>`;
  }
}

carregarCards();
