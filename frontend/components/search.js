import React from 'react';
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Snippet
} from "react-instantsearch-dom";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styles from './search.module.css';

const searchClient = instantMeiliSearch(
  "http://localhost:7700",
  ""
);


const Hit = ({ hit }) => (
  <div key={hit.id}>
    <div className="hit-Title">
      <Highlight attribute="Title" hit={hit} />
    </div>

    <div className="hit-Ingredient_Tags">
      <Snippet attribute="Ingredient_Tags" hit={hit} />
    </div>
  </div>
);

function Search() {
  return (
    <div className={styles.container}>
      <InstantSearch
    indexName="recipes"
    searchClient={searchClient}
  >
    <SearchBox className={styles.box}/>
    <Hits hitComponent={Hit} />
  </InstantSearch>
    </div>
    
  );
}

export default Search;
