export function popularityUp(a, b) {
    if (a.popularity > b.popularity) return -1;
    if (a.popularity == b.popularity) return 0;
    if (a.popularity < b.popularity) return 1;
  }
  export function popularityDown(a, b) {
    if (a.popularity > b.popularity) return 1;
    if (a.popularity == b.popularity) return 0;
    if (a.popularity < b.popularity) return -1;
  }
  export function  vote_averageUp(a, b) {
    if (a.vote_average > b.vote_average) return 1;
    if (a.vote_average == b.vote_average) return 0;
    if (a.vote_average < b.vote_average) return -1;
  }
  export function vote_averageDown(a, b) {
    if (a.vote_average > b.vote_average) return -1;
    if (a.vote_average == b.vote_average) return 0;
    if (a.vote_average < b.vote_average) return 1;
  }

  export function checkFilters(film, filteres){
    if (filteres.size === 0) return true
    const filmFiltersLength = film.genre_ids.length;
    const filtersSet = new Set(film.genre_ids);
    for (let item of filteres) filtersSet.add(item);
    return (filmFiltersLength == filtersSet.size)
}

export function changeFilteredList(currentFilmList, filters){
  const newFilmList = [];
  for (let film of currentFilmList){
    if (checkFilters(film, filters)) newFilmList.push(film)
  }
  return newFilmList
}