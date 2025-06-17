const modal = document.querySelector('.verCard');

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
        <img src="${card.image}" alt="Imagem do card">
        <p>${card.name}</p>
      `;

      div.addEventListener('click', () => abrirModal(card));

      container.appendChild(div);
    });
  } else {
    container.innerHTML = `<p>Tipo "${tipo}" não encontrado.</p>`;
  }
}

function abrirModal(card) {
  
  modal.querySelector('h2').textContent = card.name;
  modal.querySelector('h3').textContent = card.alternativeName || '';

  const img = modal.querySelector('img');
  img.src = card.image;
  img.alt = card.name;

  const ps = modal.querySelectorAll('p');
  ps[0].textContent = card.description || 'No description';
  if (card.chapter) {
    ps[1].textContent = `Chapter: ${card.chapter}`;
  } else {
    ps[1].textContent = 'Chapter not informed';
  }
    

  const status = (card.status || 'Unknown').toLowerCase();
  let color = (status === 'finalizado') ? 'green' : 'red';

  ps[2].innerHTML = `Status: <span style="color: ${color};">${card.status}</span>`;
  
  modal.classList.add('active');
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

modal.querySelector('.btn-close').addEventListener('click', () => {
  modal.classList.remove('active');
});

carregarCards();
