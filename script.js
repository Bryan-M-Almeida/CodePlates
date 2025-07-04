const modal = document.getElementById("previewModal");
const iframe = document.getElementById("iframePreview");
const closeBtn = document.querySelector(".modal .close");
const cardContainer = document.querySelector(".template-container");
const inputBusca = document.getElementById("busca");
const quantidadeCards = document.querySelector("#quantidade");
const btnTopo = document.getElementById("btnTopo");

// Criar cards
function criarCard(img, nome, visualizar, codigo, categoria) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute('data-categoria', categoria);
    card.innerHTML = `
    <img src="${img}" alt="${nome}" />
    <h3>${nome}</h3>
    <div class="buttons">
        <a href="#" class="btn-preview" data-visualizar="${visualizar}">🔍 Visualizar</a>
        <a href="${codigo}" target="_blank">💻 Código</a>
    </div>`;
    cardContainer.appendChild(card);
}

criarCard("assets/barbearia.jpg", "Barbershop", "https://bryan-m-almeida.github.io/template-barbearia/", "https://github.com/Bryan-M-Almeida/template-barbearia", 'barbearia');
criarCard("assets/loja gold.jpg", "Gold", "https://bryan-m-almeida.github.io/template-loja/", "https://github.com/Bryan-M-Almeida/template-loja", "loja");
criarCard("assets/pizzaria.webp", "Pizzaria", "https://bryan-m-almeida.github.io/template-pizzaria/", "https://github.com/Bryan-M-Almeida/template-pizzaria", "restaurante");
criarCard("assets/restaurante.jpg", "Restaurante", "https://bryan-m-almeida.github.io/site-restaurante-estudo/", "https://github.com/Bryan-M-Almeida/site-restaurante-estudo", "restaurante");

// Modal de preview
cardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-preview")) {
        e.preventDefault();
        const visualizar = e.target.getAttribute("data-visualizar");
        iframe.src = visualizar;
        modal.classList.add("show");
    }
});

closeBtn.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => (iframe.src = ""), 300);
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => (iframe.src = ""), 300);
    }
};

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 0.2}s`;
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.2,
    }
);

reveals.forEach((el) => observer.observe(el));

// Botão "Voltar ao Topo"
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        btnTopo.classList.add("mostrar");
    } else {
        btnTopo.classList.remove("mostrar");
    }
});

btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Busca por nome
function atualizarQuantidade(visiveis) {
    quantidadeCards.textContent = visiveis === 0
        ? "Template não encontrado"
        : `${visiveis} template${visiveis > 1 ? "s" : ""}`;
    quantidadeCards.style.color = visiveis === 0 ? "red" : "#c084fc";
}

inputBusca.addEventListener("input", () => {
    const termo = inputBusca.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    let visiveis = 0;

    cards.forEach((card) => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        const match = titulo.includes(termo);
        card.style.display = match ? "block" : "none";
        if (match) visiveis++;
    });

    atualizarQuantidade(visiveis);
});

// Inicializa contador
setTimeout(() => {
    const cards = document.querySelectorAll(".card");
    atualizarQuantidade(cards.length);
}, 100);


const botoesFiltro = document.querySelectorAll('.filtros button');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        document.querySelector('.filtros .ativo').classList.remove('ativo');
        botao.classList.add('ativo');

        const categoria = botao.getAttribute('data-filtro');

        // agora pegamos os cards no momento do clique
        const cards = document.querySelectorAll('.card');
        let visiveis = 0;

        cards.forEach(card => {
            const catCard = card.getAttribute('data-categoria');

            if (categoria === 'todos' || catCard === categoria) {
                card.style.display = 'block';
                visiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        atualizarQuantidade(visiveis);
    });
});

