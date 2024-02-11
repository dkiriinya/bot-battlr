import React, { useEffect, useState } from "react";

export default function YourBotArmy() {
  const [armybotInfo, setArmybotInfo] = useState([]);

  useEffect(() => {
    fetchArmyData();
  }, []);

  const handleRelease = async (index) => {
    alert('Bot has been released')
    setArmybotInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));

  }

  const handleDelete = async (index) => {
    const isConfirmed = window.confirm('Are you sure you want to discharge this bot?');

    if (isConfirmed) {
      try {
        const botIdToDelete = armybotInfo[index].id; // Adjust this based on your bot data structure
        const deleteUrl = `http://localhost:8001/army/${botIdToDelete}`;

        // Make a delete request
        await fetch(deleteUrl, { method: 'DELETE' });

        // Update the state to remove the deleted bot
        setArmybotInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));

        alert('Bot has been discharged');
      } catch (error) {
        console.error('Error deleting bot', error);
      }
    }
  };

  const fetchArmyData = async () => {
    const url = 'http://localhost:8001/army';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArmybotInfo(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Your Bot Army</h1>
      <p style={{textAlign:"center"}}>
      consists of up to 6 bots that you can enlist to your personal army. One for each class. Choose wisely!
      </p>
      <div className="row">
        {armybotInfo.map((bot, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card mx-auto">
              <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
              <div className="card-body">
                <h5 className="card-title">{bot.name}</h5>
                <p className="card-text">Armor: {bot.armor}</p>
                <p className="card-text">Class: {bot.bot_class}</p>
                <p className="card-text">Damage: {bot.damage}</p>
                <p className="card-text">Health: {bot.health}</p>
                <button className="btn btn-primary" onClick={() => handleRelease(index)}>Release Bot</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>X</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
