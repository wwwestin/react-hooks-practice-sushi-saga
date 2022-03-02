import {useState, useEffect} from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

function App() {
  const [sushis, setSushis] = useState([]);
  const [wallet, setWallet] = useState(100);

  useEffect(() => {
    fetch("http://localhost:3001/sushis")
    .then((r) => r.json())
    .then((sushis) => {
      const updatedSushis = sushis.map((sushi) => {
      return {...sushi, eaten: false};
    });
    setSushis(updatedSushis);
  });
}, []);

function handleEatSushi(eatenSushi) {
  if(wallet >= eatenSushi.price) {
    const updatedSushis = sushis.map((sushi) => {
      if (sushi.id === eatenSushi.id) return {...sushi, eaten:true};
      return sushi;
    });

    setSushis(updatedSushis);
    setWallet((wallet) => wallet - eatenSushi.price);
}else {
  alert("Need more money");
  }
}

function handleAddMoney(moreMoney) {
  setWallet((wallet) => wallet + moreMoney);
}

const eatenSushis = sushis.filter((sushi) => sushi.eaten);

  return (
    <div className="app">
      <SushiContainer sushis = {sushis} onEatSushi = {handleEatSushi}/>
      <Table wallet = {wallet} onAddMoney = {handleAddMoney} plates = {eatenSushis}/>
    </div>
  );
}

export default App;