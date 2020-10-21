import React, { useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isloading && <div>Shows are still loading</div>}
      {error && <div> Error occured: {error}</div>}
      {!isloading && !shows && <div>No shows were added</div>}
      {!isloading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
