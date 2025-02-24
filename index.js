function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const allContents = document.querySelectorAll('.panel');
    const allButtons = document.querySelectorAll('.accordion');

    // Fechar todos os conteúdos e remover classe ativa dos botões
    allContents.forEach(el => {
        if (el !== content) {
            el.style.display = 'none';
        }
    });
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.remove('active');
        }
    });

    // Alternar a exibição do conteúdo clicado e adicionar classe ativa ao botão
    if (content.style.display === 'flex') {
        content.style.display = 'none';
        button.classList.remove('active');
    } else {
        content.style.display = 'flex';
        button.classList.add('active');
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
