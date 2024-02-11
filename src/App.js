// App.js
import './styles/index.css';
import React, { useEffect, useState } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  const [botList, setBotList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = 'https://bots-server-0vqw.onrender.com/bots';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBotList(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  async function addBotToArmy(botId) {
    const url = 'https://bots-server-0vqw.onrender.com/army';
    const botToAdd = botList.find(bot => bot.id === botId);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(botToAdd),
      });

      if (response.ok) {
        alert('Bot added to army successfully');
      } else {
        console.error('Failed to add bot to army');
      }
    } catch (error) {
      console.error('Error adding bot to army', error);
    }
  }

  
  return (
    <div>
    <Navbar />
      <Routes>
        <Route path='/' element={<BotCollection botlist={botList} addToArmy={addBotToArmy} />} />
        <Route path='/about' element = {<About/>} />
        <Route path='/Army' element={<YourBotArmy/>} />
      </Routes>
      
    </div>
  );
}

export default App;
