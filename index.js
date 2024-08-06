const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const magnifying_glass = document.querySelector('.fa-solid.fa-magnifying-glass')

const API_KEY = 'ef15ab55';

magnifying_glass.addEventListener('click', fetchTodos);

async function fetchTodos(event) {
    event.preventDefault();
    const movieTitle = todoInput.value.trim();
    const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieTitle}&plot=full`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);

        todoList.innerHTML = '';

        const movies = data.Search.slice(0, 5);
        console.log(movies);

        for (const movie of movies) {
            const API_URL_plot = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie.Title}`;
            const response2 = await fetch(API_URL_plot);
            const data2 = await response2.json();
            console.log(data2);

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-card');
            movieElement.innerHTML = `
                <div class="movie-card-inner">
                    <div class="movie-card-front">
                        <img src="${movie.Poster}" alt="poster">
                    </div>
                    <div class="movie-card-back">
                        <h2>${movie.Title}</h2>
                        <p>${data2.Plot}</p>
                        <p>Release Date: ${data2.Released}</p>
                    </div>
                </div>
            `;
            todoList.insertAdjacentElement('beforeend', movieElement);
        }
    } catch (error) {
        console.log(error);
    }
}