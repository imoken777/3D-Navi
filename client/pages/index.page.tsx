import { Header } from 'components/header/Header';
import { Loading } from 'components/loading/Loading';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pagesPath, staticPath } from 'utils/$path';
import { apiClient } from 'utils/apiClient';
import { isMobileAtom, travelSpotsAtom } from 'utils/Atom';
import styles from './index.module.css';

const TravelDestination = () => {
  const [userDestination, setUserDestination] = useState<string>('');
  const [, setTravelSpots] = useAtom(travelSpotsAtom);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsMobile] = useAtom(isMobileAtom);

  const fetchTravelSpots = async () => {
    const checkUserInput = /./;
    if (checkUserInput.test(userDestination)) {
      setIsLoading(true);
      const res = await apiClient.travelStartingSpot.$post({
        body: { destination: userDestination },
      });
      setTravelSpots(res);
      router.push(pagesPath.travelSpotList.$url());
      setIsLoading(false);
    } else {
      alert('観光地を入力してください');
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return (
    <div className={styles.container}>
      <Loading visible={isLoading} />
      <Header />
      <div className={styles.main}>
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
