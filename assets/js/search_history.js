/* Search history function
Works with localStorage to keep the history list updated on new page loads
Also connects to search button and form submit
Runs on page load and on search button click
*/
const displaySearchHistory = (newSearchTerm) => {
    let searchHistory = [];
    if (localStorage.getItem('search_history')) {
        searchHistory = JSON.parse(localStorage.getItem('search_history'));
    };

    /* Check if search history already includes this term */
    if (searchHistory.includes(newSearchTerm)) {
        return;
    } else if (newSearchTerm != null) {
        /* If there is a new term, add it to the search history */
        searchHistory.push(newSearchTerm);
        localStorage.setItem('search_history', JSON.stringify(searchHistory));
    };

    /* If the search history is not empty, show it on page */
    if (searchHistory.length > 0) {
        updateSearchHistoryList(searchHistory);
        $('#search-history').removeClass('hidden');
    }
};

/* Update the element on page with list of search history */
const updateSearchHistoryList = (searchHistory) => {
    const searchHistoryList = $('#search-history-list');
    searchHistoryList.empty();
    for (let i=0; i<searchHistory.length; i++) {
        const searchTermElement = $('<li>');
        searchTermElement.text(searchHistory[i]);
        searchHistoryList.append(searchTermElement);
    };    
};