import React,{useEffect,useState} from "react";

export default function YourBotArmy(){
    const [armybotInfo,setarmybotInfo] = useState([])
    useEffect(()=>{
        fetchArmyData()
    },{})
    
    const fetchArmyData = async () => {
        const url = 'http://localhost:8001/army'
        try {
            const response = await fetch(url);
            const data = await response.json();
            setarmybotInfo(data);
          } catch (error) {
            console.error('Error fetching data', error);
          }
    }
    return(
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Bot Army</h1>
          <div className="row">
           {armybotInfo.map((bot, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img src={bot.avatar_url} className="card-img-top" alt={bot.name} />
                <div className="card-body">
                  <h5 className="card-title">{bot.name}</h5>
                  <p className="card-text">Armor: {bot.armor}</p>
                  <p className="card-text">Class: {bot.bot_class}</p>
                  <p className="card-text">Damage: {bot.damage}</p>
                  <p className="card-text">Health: {bot.health}</p>
                  <button className="btn btn-danger onclick={}">X</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )

}