import "./App.css";
import { useState } from "react";

/*const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];*/

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ handleAddItens }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function HandleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItens(newItem);

    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={HandleSubmit}>
      <h3>What do you need for your trip? </h3>
      <select
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          (
            num //Atençao
          ) => (
            <option key={num}>{num}</option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ array, handleDell, handleToggleItem }) {
  return (
    <div className="list">
      <ul>
        {array.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDell={handleDell}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You have X items on your list, and you already packed X
    </footer>
  );
}

function Item({ item, handleDell, handleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={() => handleDell(item.id)}>❌</button>
    </li>
  );
}

export default function App() {
  const [itensList, setItensList] = useState([]);

  function handleAddItens(item) {
    setItensList((s) => [...s, item]);
  }

  function handleDell(id) {
    setItensList((s) => s.filter((item) => id !== item.id));
  }

  function handleToggleItem(id) {
    setItensList((s) =>
      s.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  console.log(itensList);

  return (
    <div className="app">
      <Logo />
      <Form handleAddItens={handleAddItens} />
      <PackingList
        array={itensList}
        handleDell={handleDell}
        handleToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

/**
 * criar state dentro de handleAddItens
 * 
 * 
 * 
 * const [itens, setItens] = useState([
    { n: 2, item: "escolva de dentes" },
    { n: 2, item: "bermuda" },
  ])
  const [n, setN] = useState(null)
  const [item, setItem] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(n, item)
    const novoItem = { n, item }
    setItens([...itens, novoItem])

  }

  const handleDell = (index) => {
    setItens(itens.filter((_, i) => i !== index))
  }

  function handleClearList() {
    setItens([])
  }

  return (
    <>
      <h1>FAR AWAY</h1>

      <form className="add-form">
        <h3>What do you need for your trip?</h3>
        <input type="number" placeholder={0} value={n} onChange={(e) => setN(e.target.value)} />
        <input type="text" placeholder='item' value={item} onChange={(e) => setItem(e.target.value)} />
        <button onClick={(e) => handleSubmit(e)}>ADD</button>
      </form>

      <div className="list">
        <ul>
          {itens.map((item, index) => (
            <li key={index}>
              <input type="checkbox" />
              {item.n} {item.item}
              <button onClick={() => handleDell(index)}>X</button>
            </li>
          ))}
        </ul>
        <button>SORT BY</button>
        <button onClick={() => handleClearList()}>CLEAR LIST</button>
      </div>

      <div className="stats">number of itens in your pack {itens.length}</div>
    </>
  );
 */
// state is internal data, component "memory", can be updated by the component itself, updating state causes component to re-render. state are used by developer to make components interactive
// props is external data, similar to function parameters, read-only, receiving new props causes component to re-render, usually when the parent's state has been updated. updating state re-render the component who owns the state and the component who received the state as props. props are used by developers to give the parent abilite to config child components
