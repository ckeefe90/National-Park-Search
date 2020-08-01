'use strict';

const apiKey = "";

function searchParks() {
    if (!apiKey) {
        alert("API key is required")
        return
    }
    const stateCode = $('#state-code').val();
    const maxLimit = $('#max-limit').val();
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=${maxLimit}&api_key=${apiKey}`)
        .then(response => {
            if (response.ok)
                return response.json();
            throw "Unable to locate any parks, please try again."
        })
        .then(responseJson => {
            console.log(responseJson);
            displayResults(responseJson.data);
        })
        .catch(error => alert(error));
}

function displayAddresses(addresses) {
    let parkAddresses = "<ul>"
    for (let i = 0; i < addresses.length; i++) {
        parkAddresses += `<li>
            ${addresses[i].type} Address:<br>
            ${addresses[i].line1}<br>`;
        if (addresses[i].line2) parkAddresses += `${addresses[i].line2}<br>`
        if (addresses[i].line3) parkAddresses += `${addresses[i].line3}<br>`
        parkAddresses += `${addresses[i].city} ${addresses[i].stateCode} ${addresses[i].postalCode}</li>`
    }
    parkAddresses += "</ul>"
    return parkAddresses;
}

function displayResults(responseJson) {
    $('.results').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.results').append(
            `<li>
                <h3>${responseJson[i].fullName}</h3>
                <p>${responseJson[i].description}</p>
                <a href="${responseJson[i].url}">website</a>
                <p>${displayAddresses(responseJson[i].addresses)}</p>
            </li>`
        )
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        searchParks();
    });
}

$(function() {
    watchForm();
});