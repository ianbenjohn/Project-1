$(document).ready(function() {
    /* Show the search history from localStorage on first page load */
    displaySearchHistory();
    
    /* Event listener for submitting search form directly */
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        let searchTerm = $('#search-field').val();
        runSearch(searchTerm);
    });

    /* Event listener for clicking on search button */
    $('#search-button').on('click', function(event) {
        let searchTerm = $('#search-field').val();
        runSearch(searchTerm);
    });

    /* Helper function to run the search */
    const runSearch = (searchTerm) => {
        displaySearchHistory(searchTerm);
        mealSearch(searchTerm);
    };
});