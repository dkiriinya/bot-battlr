import './index.css';
import React, { useEffect, useState } from 'react';
import Displaybots from './components/Displaybots';

function App() {
  const [botList, setBotList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = 'https://json-server-example-seven.vercel.app/bots';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBotList(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  return (
    <div>
      <Displaybots botlist={botList}/> 
    </div>
  );
}

export default App;
