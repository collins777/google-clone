import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener} from "./searchBar.js"; // prettier-ignore
import {deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js"; // prettier-ignore
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", e => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener); // listens for space bar or enter
  const form = document.getElementById("search-bar");
  form.addEventListener("submit", sumbitTheSearch);
};

// Procedural "workflow" function
const sumbitTheSearch = e => {
  e.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  //console.log(resultArray);
  setStatsLine(resultArray.length);
};
