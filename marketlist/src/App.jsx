import "./App.css";
import { useState } from "react";
const intialListItem = [
  { title: "i want to go to the market", id: 1234, checked: false },
  { title: "i want to go to the church", id: 1235, checked: false },
  { title: "attend to a prom date tonight", id: 1237, checked: false },
  { title: "i want to go to the market", id: 1236, checked: false },
];
export default function () {
  const [list, setList] = useState([]);
  return (
    <div className="app">
      <ListLogo>🏪 Market Carter 🛒</ListLogo>
      <ListStats />
      <ListForm />
      <ListContainer list={list} />
    </div>
  );
}

function ListLogo({ children }) {
  return <h1 className="logo">{children}</h1>;
}

function ListStats() {
  return <h2 className="stats">Number Of Task (0/0)</h2>;
}

function ListForm() {
  const [title, setTitle] = useState("");

  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    const addNewList = {
      title,
      id,
      checked: false,
    };
    setTitle("");

    console.log(addNewList);
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add task..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn">Submit</button>
    </form>
  );
}

function ListContainer({ list }) {
  return (
    <div className="container">
      {list.length !== 0 ? (
        <ul>
          {list.map((lists) => (
            <Lists list={lists} key={lists.id} />
          ))}
        </ul>
      ) : (
        <p className="message">List item is a kinda empty 😔</p>
      )}
    </div>
  );
}

function Lists({ list }) {
  return (
    <li>
      <input type="checkbox" />
      <p>{list.title}</p>
      <span>❌</span>
    </li>
  );
}
