const totalPages = 40; // Total number of pages

function createPagination(currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const createPageLink = (page) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = page.toString().padStart(2, '0'); // Format page number with two digits
        link.onclick = () => loadSentences(`hm${page.toString().padStart(2, '0')}.txt`, link);
        if (page === currentPage) {
            link.classList.add('active');
        }
        return link;
    };

    // Add previous button
    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.innerHTML = '&laquo;';
    prevLink.onclick = () => {
        if (currentPage > 1) {
            loadSentences(`hm${(currentPage - 1).toString().padStart(2, '0')}.txt`, null);
        }
    };
    paginationContainer.appendChild(prevLink);

    // Determine the range of pages to show
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (currentPage <= 4) {
        endPage = 7;
    } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 6;
    }

    // Add first page link
    if (startPage > 1) {
        paginationContainer.appendChild(createPageLink(1));
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
    }

    // Add middle page links
    for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i <= totalPages) {
            paginationContainer.appendChild(createPageLink(i));
        }
    }

    // Add last page link
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
        paginationContainer.appendChild(createPageLink(totalPages));
    }

    // Add next button
    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.innerHTML = '&raquo;';
    nextLink.onclick = () => {
        if (currentPage < totalPages) {
            loadSentences(`hm${(currentPage + 1).toString().padStart(2, '0')}.txt`, null);
        }
    };
    paginationContainer.appendChild(nextLink);
}

async function loadSentences(fileName, element) {
    const response = await fetch(fileName);
    const text = await response.text();
    const lines = text.split('\n');
    const title = lines[0].trim(); // First line is the title
    const sentences = lines.slice(1).map(line => line.split('->').map(part => part.trim()));

    // Update the title
    const titleElement = document.getElementById('title');
    titleElement.textContent = title;

    const container = document.getElementById('sentences-container');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    sentences.forEach(([english, portuguese]) => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.classList.add('sentence');

        const englishH1 = document.createElement('h1');
        englishH1.textContent = english;
        sentenceDiv.appendChild(englishH1);

        const portugueseH1 = document.createElement('h1');
        portugueseH1.textContent = portuguese;
        portugueseH1.classList.add('answer');
        portugueseH1.style.display = 'none'; // Começa escondido
        sentenceDiv.appendChild(portugueseH1);

        container.appendChild(sentenceDiv);
    });

    // Atualiza a classe 'active' na paginação
    createPagination(parseInt(fileName.match(/\d+/)[0]));
}

document.getElementById('toggleAnswers').addEventListener('change', function() {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.style.display = this.checked ? 'block' : 'none';
    });
});

// Carrega a primeira página por padrão
loadSentences('hm01.txt', null);