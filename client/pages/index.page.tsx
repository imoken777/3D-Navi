import { Header } from 'components/header/Header';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { staticPath } from 'utils/$path';
import { apiClient } from 'utils/apiClient';
import { travelSpotsAtom } from 'utils/travelSpotsAtom';
import styles from './index.module.css';

const TravelDestination = () => {
  const [userDestination, setUserDestination] = useState<string>('');
  const [, setTravelSpots] = useAtom(travelSpotsAtom);
  const router = useRouter();

  const fetchTravelSpots = async () => {
    const res = await apiClient.travelStartingSpot.$post({
      body: { destination: userDestination },
    });
    setTravelSpots(res);
    router.push('/travelSpotList');
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>TravelDestination</div>
        </div>

        <div className={styles.imageBox}>
          <img
            src={staticPath.images.undraw_World_re_768g_png}
            alt="world Image"
            className={styles.image}
          />
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <div className={styles.normalText}>行きたい場所を入力してください</div>
            <div className={styles.box}>
              <div className={styles.subject}>観光地</div>
              <input
                value={userDestination}
                onChange={(e) => setUserDestination(e.target.value)}
                className={styles.inp}
                placeholder="例:京都"
              />
            </div>

            <button onClick={fetchTravelSpots} className={styles.search}>
              検索
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDestination;
