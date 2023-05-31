import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { IVideoSearchResults, constants } from "values";

const useSearch = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IVideoSearchResults[]>([]);
  const [randomList, setRandomList] = useState<IVideoSearchResults[]>([]); // I added this to have a second column to clone Netlix
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
    getVideos();
    // eslint-disable-next-line
  }, [query]);

  const getVideos = debounce(async () => {
    try {
      const result = await axios.get(`${constants.BASE_URL}/videos?query=${queryRef.current}`);
      setLoading(false);
      setResults(result.data);
      if (queryRef.current.length !== 0) setRandomList([]);
      else randomizeList(result.data);
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  }, 1000);

  const randomizeList = (results: IVideoSearchResults[]) => {
    const array = [...results];
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setRandomList(array);
  };

  return { loading, query, results, randomList, setQuery };
};

export default useSearch;
