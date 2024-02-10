import React, { useEffect, useState } from "react";
import SortBar from "./SortBar";
import FilterBar from "./FilterBar";

export default function BotCollection({ botlist, addToArmy }) {
  const [armyBots, setArmyBots] = useState([]);
  const [sortCategory, setSortCategory] = useState('health');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterClass, setFilterClass] = useState('');

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

  const handleSortChange = (category) => {
    setSortCategory(category);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleFilterChange = (selectedFilter) => {
    setFilterClass(selectedFilter);
  };

  // Sorting logic
  const sortedBotList = [...botlist].sort((a, b) => {
    const valueA = a[sortCategory];
    const valueB = b[sortCategory];

    if (sortOrder === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

    // Filtering logic
    const filteredBotList = filterClass
    ? sortedBotList.filter((bot) => bot.bot_class === filterClass)
    : sortedBotList;

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
      <h1 style={{ textAlign: "center" }}>Bot Collection</h1>
      <SortBar
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
        sortCategory={sortCategory}
      />
      <FilterBar
      onFilterChange={handleFilterChange}
      selectedFilter={filterClass}
    />
      <div className="row">
        {filteredBotList.map((bot, index) => (
          <div key={index} className="col-md-3 mb-3">
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
