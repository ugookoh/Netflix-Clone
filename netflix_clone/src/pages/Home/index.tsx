import React from "react";
import styles from "./styles.module.scss";
import { Header, HomeItem, LoadingView } from "components";
import { useSearch } from "hooks";

const HomeScreen = () => {
  const { loading, results, query, randomList, setQuery } = useSearch();

  return (
    <div className={styles.container}>
      <div className={styles.headerCont}>
        <Header query={query} setQuery={setQuery} />
        <h1>Welcome to Ugo's Netflix Clone</h1>
      </div>

      <h3>Recently Added</h3>
      <div className={styles.scrollView}>
        {loading ? (
          <LoadingView />
        ) : results.length === 0 && !!query ? (
          <h1>No results found for "{query}"</h1>
        ) : (
          results.map((video) => <HomeItem video={video} key={video.videoId} />)
        )}
      </div>
      {!query && randomList.length !== 0 && (
        <>
          <h3>Randomized list to add a second column</h3>
          <div className={styles.scrollView}>
            {randomList.map((video) => (
              <HomeItem video={video} key={video.videoId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
