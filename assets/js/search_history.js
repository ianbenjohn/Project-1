/* Search history function
Works with localStorage to keep the history list updated on new page loads
Also connects to search button and form submit
Runs on page load and on search button click
*/

const displaySearchHistory = (newSearchTerm) => {
    const searchHistoryList = $('#search-history-list');
    let searchHistory = [];
    if (localStorage.getItem('search_history')) {
        searchHistory = localStorage.getItem('search_history');
    };

    if (searchHistory.includes(newSearchTerm) {
        return;
    } else {
        searchHistory.push(newSearchTerm);
        localStorage.setItem('search_history', searchHistory);
    };

    for (searchTerm of searchHistory) {
        const searchTermElement = $('<li>');
        searchTermElement.text(searchTerm);
    }
}
