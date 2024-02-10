import React, { useEffect, useState } from "react";

export default function Displaybots({ botlist, addToArmy }) {
  const [armyBots, setArmyBots] = useState([]);

  useEffect(() => {
    fetchArmyData();
  }, []);

  const fetchArmyData = async () => {
    const armyUrl = 'http://localhost:8001/army';
    try {
      const response = await fetch(armyUrl);
      const data = await response.json();
      setArmyBots(data);
    } catch (error) {
      console.error('Error fetching army data', error);
    }
  };

  const handleButtonClicked = async (botId) => {
    // Check if the bot is already in the army
    const isBotInArmy = armyBots.some((armyBot) => armyBot.id === botId);

    if (isBotInArmy) {
      console.log('Bot is already in the army');
      return;
    }

    addToArmy(botId);

    // Update the army data (assuming you have a function to update the army data)
    // updateArmyData(botId);

    // Optionally, you can refetch the army data to ensure it's up-to-date
    fetchArmyData();
  };

  const isBotAdded = (botId) => armyBots.some((armyBot) => armyBot.id === botId);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Bot List</h1>
      <div className="row">
        {botlist.map((bot, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
              <div className="card-body">
                <h5 className="card-title">{bot.name}</h5>
                <p className="card-text">Armor: {bot.armor}</p>
                <p className="card-text">Class: {bot.bot_class}</p>
                <p className="card-text">Damage: {bot.damage}</p>
                <p className="card-text">Health: {bot.health}</p>
                {isBotAdded(bot.id) ? (
                  <button className="btn btn-success" disabled>
                    Bot in Army
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleButtonClicked(bot.id)}>
                    Add to your Army
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
