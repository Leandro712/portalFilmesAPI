const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '20cdb8dd299b0db10013854d2e48ce57';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';



function carregaFilmes () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function pesquisaFilmes () {
    xhr = new XMLHttpRequest ();

    query = document.getElementById('pesquisa').value;

    xhr.open ('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY + '&query=' + query, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}


function exibeFilmes () {
    
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < 12; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let id = data.results[i].id;
        let date = data.results[i].release_date;
        let popularity = data.results[i].vote_average;

        textoHTML += `<div class="card col-lg-4 col-md-6" id="cards">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="releaseDate">Release date: ${date}</p>
                <p class="popularidade">Rating: ${popularity}/10</p>
                <a href="https://www.themoviedb.org/movie/${id}?language=pt-BR" class="btn btn-primary" id="btnInfo">More info</a>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML = textoHTML;
}