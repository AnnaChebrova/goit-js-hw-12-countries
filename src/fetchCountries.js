function fetchCountry(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(url)
        .then(response=> { return response.json() })
        .catch(error => {
            console.log('This is error:', error)
        });
}

    export default { fetchCountry };