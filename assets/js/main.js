$(document).ready(function() {
    /* Show the search history from localStorage on first page load */
    displaySearchHistory();
    
    /* Event listener for submitting search form directly */
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        let searchTerm = $('#search-field').val();
        displaySearchHistory(searchTerm);
    });
});



