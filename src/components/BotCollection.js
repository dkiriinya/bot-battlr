// BotCollection.js
import React, { useEffect, useState } from "react";
import SortBar from "./SortBar";
import FilterBar from "./FilterBar";

export default function BotCollection({ botlist, addToArmy }) {
  const [armyBots, setArmyBots] = useState([]);
  const [sortCategory, setSortCategory] = useState('health');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterClass, setFilterClass] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBotList = filteredBotList.slice(indexOfFirstItem, indexOfLastItem);

  const handleButtonClicked = async (botId) => {
    const isBotInArmy = armyBots.some((armyBot) => armyBot.id === botId);

    if (isBotInArmy) {
      console.log('Bot is already in the army');
      return;
    }

    addToArmy(botId);
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
        {currentBotList.map((bot, index) => (
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
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBotList.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
