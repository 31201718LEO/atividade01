const apiKey = 'e3f3e2afa66e2fd8d20bbfc903aa07bc' // Substitua pela sua chave de API
let correctMedia;
let options = [];
let isMovieRound = true; // Controla se a rodada será sobre filme ou série

function getRandomMedia() {
if (isMovieRound) {
// Busca filme

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=
pt-BR&page=1`)
.then(response => response.json())
.then(data => {
const randomIndex = Math.floor(Math.random() * data.results.length);
correctMedia = data.results[randomIndex];
options = [correctMedia];

// Adiciona mais 3 opções aleatórias
while (options.length < 4) {
const randomOption = data.results[Math.floor(Math.random() * data.results.length)];
if (!options.includes(randomOption)) {
options.push(randomOption);
}
}

// Embaralha as opções
options.sort(() => Math.random() - 0.5);
displayQuestion();
})
.catch(error => console.error('Erro:', error));
} else {
// Busca série

fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=pt-BR&page=1`)

.then(response => response.json())
.then(data => {
const randomIndex = Math.floor(Math.random() * data.results.length);
correctMedia = data.results[randomIndex];
options = [correctMedia];

// Adiciona mais 3 opções aleatórias
while (options.length < 4) {
const randomOption = data.results[Math.floor(Math.random() * data.results.length)];
if (!options.includes(randomOption)) {
options.push(randomOption);
}
}

// Embaralha as opções
options.sort(() => Math.random() - 0.5);
displayQuestion();
})
.catch(error => console.error('Erro:', error));
}

// Alterna entre filme e série para a próxima rodada
isMovieRound = !isMovieRound;
}
function displayQuestion() {
    document.getElementById('question').innerHTML = `<h1> Qual é o filme ou série?</h1>`;
    document.getElementById('mediaImage').src =`https://image.tmdb.org/t/p/w500${correctMedia.poster_path}`;
    document.getElementById('mediaImage').style.height = '150px'; // Mostra a imagem cortada
    document.getElementById('mediaImage').style.display = 'block';
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    // Cria botões para as opções
 0
    options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option.title || option.name; // title para filmes, name para séries
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
    });
    }
    function checkAnswer(selected) {
        const resultDiv = document.getElementById('result');
        if (selected.id === correctMedia.id) {
        resultDiv.innerHTML = '<p>Correto!</p>';
        } else {
        resultDiv.innerHTML = `<p>Incorreto! O filme ou série era: ${correctMedia.title
        || correctMedia.name}</p>`;
        }
        
        // Mostra a imagem completa após responder
        document.getElementById('mediaImage').style.height = 'auto';
        document.getElementById('mediaImage').style.objectPosition = 'center';
        
        document.getElementById('nextButton').style.display = 'block';
        }
        
        document.getElementById('nextButton').onclick = () => {
        document.getElementById('result').innerHTML = '';
        document.getElementById('nextButton').style.display = 'none';
        getRandomMedia();
       
        };
     
        
        // Inicia o jogo
        getRandomMedia();

        document.getElementById('nextButton').onclick = () => {
            // Limpa o resultado e esconde o botão de "Próximo"
            document.getElementById('result').innerHTML = '';
            document.getElementById('nextButton').style.display = 'none';
            
            // Chama a função que carrega um novo filme ou série
            getRandomMedia();
            };
