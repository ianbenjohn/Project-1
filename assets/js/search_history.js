/* Search history function
Works with localStorage to keep the history list updated on new page loads
Also connects to search button and form submit
Runs on page load and on search button click
*/

const displaySearchHistory = (newSearchTerm) => {
    const searchHistoryList = $('#search-history-list');
    let searchHistory = [];
    if (localStorage.getItem('search_history')) {
        searchHistory = JSON.parse(localStorage.getItem('search_history'));
        $('#search-history').removeClass('hidden');
    };

    if (searchHistory.includes(newSearchTerm)) {
        return;
    } else if (newSearchTerm != null) {
        searchHistory.push(newSearchTerm);
        localStorage.setItem('search_history', JSON.stringify(searchHistory));
    };

    searchHistoryList.empty();
    for (let i=0; i<searchHistory.length; i++) {
        const searchTermElement = $('<li>');
        searchTermElement.text(searchHistory[i]);
        searchHistoryList.append(searchTermElement);
    };
}
