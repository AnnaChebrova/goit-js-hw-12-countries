import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import API from './fetchCountries';
var debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error } from '@pnotify/core/dist/PNotify.js';

const countryContainer = document.querySelector('.country-container');
const searchForm = document.querySelector('.js-search-form');
searchForm.addEventListener('input', debounce(onFormSubmit, 500));

    function onFormSubmit(e) {
        e.preventDefault();

        const searchQuery = e.target.value;
        countryContainer.innerHTML = '';

        API.fetchCountry(searchQuery).then(data => {

            if (data.status === 404) {
                pnotifyMessage('Nothing was found for your query!')
            }
            else if (data.length > 10) {
                pnotifyMessage('Too many matches found. Please enter more specific query!');
            }
            else if (data.length === 1) {
                const countriesMarkup = renderCountryCard(data);
                countryContainer.insertAdjacentHTML('beforeend', countriesMarkup);
                searchForm.value = '';
            }
            else if (2 <= data.length <= 9) {
                const contriesList = renderCountriesList(data);
                countryContainer.insertAdjacentHTML('beforeend', contriesList);
            }
        })    
.catch(onFetchError).finally(() => {searchForm.reset();
    });
}

function renderCountryCard(data) {
    return countryCardTpl(data);
}

function renderCountriesList(data) {
    return countryListTpl(data);
}
    
function onFetchError(error) {
    pnotifyMessage(error);
    console.log(error);
};

function pnotifyMessage(message) {
    error ({
            title: `${message}`,
            delay: 1200,
        });
}