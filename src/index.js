import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInputForm, DEBOUNCE_DELAY));

function handleInputForm(e) {
    e.preventDefault();
    listEl.innerHTML = '';
    infoEl.innerHTML = '';

   const userInput = inputEl.value.trim();

    fetchCountries(userInput).then(data => {
        if (data.length === 1) {
            const obj = data[0].languages;
            const languages = Object.values(obj);
            createMarkupCard(data[0], languages);
        }
        if (data.length >= 2 && data.length <= 10) {
            data.forEach(function (country) {
                createMarkupList(country);
            });
        }
        if (data.length > 10) {
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        }
    }
    ).catch(() =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}



function createMarkupCard(country, languages) {
    infoEl.innerHTML = `<div class="country__wrapper">
    <img src="${country.flags.svg
        }" alt="Counrty flag" width="60" height="60" class="country-info__img">
    <h2 class="country-info__tittle">${country.name.common}</h2>
    </div>
    <p><span class="indicat">Capital:</span> ${country.capital}</p>
    <p><span class="indicat">Population:</span> ${country.population}</p>
    <p><span class="indicat">Languages:</span> ${[...languages].join(', ')}</p>`;
}

function createMarkupList(country) {
    listEl.insertAdjacentHTML(
        'beforeend',
        `<li class="country__wrapper">
      <img src="${country.flags.svg}" alt="Country flag" width="60" height="60" class="country-list__img"/>
      <h2 class="country-list__tittle">${country.name.common}</h2>
    </li>`
    );
}






























