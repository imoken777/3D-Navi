import { useState } from 'react';
import { apiClient } from 'utils/apiClient';

const TravelDestination = () => {
  const [destination, setDestination] = useState<string>('');
  const [response, setResponse] = useState<string[]>([]);

  const serch = async () => {
    console.log('destination', destination);
    await apiClient.travelStartingSpot.$post({ body: { destination } }).then((res) => {
      console.log('res', res);
      setResponse(res);
    });
  };

  return (
    <div>
      <h1>TravelDestination</h1>
      <input value={destination} onChange={(e) => setDestination(e.target.value)} />
      <button onClick={serch}>検索</button>
      <ul>
        {response.map((spot, index) => (
          <li key={index}>{spot}</li>
        ))}
      </ul>
    </div>
  );
};
export default TravelDestination;
