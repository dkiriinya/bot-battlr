import React from "react";

export default function Displaybots({ botlist }) {
  return (
    <div className="container">
    <h1 style={{textAlign:"center"}}>Bot List</h1>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
