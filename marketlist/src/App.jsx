import "./App.css";
import { useState } from "react";
const intialListItem = [
  { title: "i want to go to the market", id: 1234, checked: false },
  { title: "i want to go to the church", id: 1235, checked: false },
  { title: "attend to a prom date tonight", id: 1237, checked: false },
  { title: "i want to go to the market", id: 1236, checked: false },
];

function Button({ children }) {
  return <button className="btn">{children}</button>;
}
export default function () {
  const [list, setList] = useState([]);

  function onAddItem(list) {
    setList((lists) => [...lists, list]);
  }

  function handleDeleteItem(id) {
    setList((item) => item.filter((items) => items.id !== id));
  }

  function handleCheckItem(id) {
    setList((lists) =>
      lists.map((list) =>
        list.id === id ? { ...list, checked: !list.checked } : list
      )
    );
  }

  function handleClearList() {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all list?"
    );
    if (confirmClear) setList(() => []);
  }
  return (
    <div className="app">
      <ListLogo>🏪 Market Carter 🛒</ListLogo>
      <ListStats list={list} />
      <ListForm onAddItem={onAddItem} />
      <ListContainer
        list={list}
        onDeleteItem={handleDeleteItem}
        onCheck={handleCheckItem}
        onClearList={handleClearList}
      />
    </div>
  );
}

function ListLogo({ children }) {
  return <h1 className="logo">{children}</h1>;
}

function ListStats({ list }) {
  const listLength = list.length;
  const isComplete = list.filter((list) => list.checked).length;
  const percent = Math.round((isComplete / listLength) * 100);
  return (
    <div>
      {percent === 100 ? (
        <h2 className="stats">All task completed 🎉</h2>
      ) : (
        <div>
          {listLength !== 0 ? (
            <h2 className="stats">
              Number Of Task: ({listLength} / {isComplete}){" "}
              <span>{`${+percent}%`}</span>
            </h2>
          ) : (
            <h2 className="stats">You don't have any task yet.</h2>
          )}
        </div>
      )}
    </div>
  );
}

function ListForm({ onAddItem }) {
  const [title, setTitle] = useState("");

  const id = crypto.randomUUID();

  function handleSubmit(event) {
    event.preventDefault();

    if (!title) return;

    const addNewList = {
      title,
      checked: false,
      id: id,
    };

    //console.log(addNewList);
    onAddItem(addNewList);
    setTitle("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button>Submit</Button>
    </form>
  );
}

function ListContainer({ list, onDeleteItem, onClearList, onCheck }) {
  return (
    <div className="container">
      {list.length !== 0 ? (
        <ul>
          {list.map((lists) => (
            <Lists
              list={lists}
              key={lists.id}
              onDeleteItem={onDeleteItem}
              onCheck={onCheck}
            />
          ))}
        </ul>
      ) : (
        <p className="message">List item is a kinda empty 😔</p>
      )}
      {!list.length ? null : (
        <button className="btn-clear" onClick={onClearList}>
          Clear list
        </button>
      )}
    </div>
  );
}

function Lists({ list, onDeleteItem, onCheck }) {
  //console.log(list);
  return (
    <li>
      <input
        type="checkbox"
        value={list.checked}
        onChange={() => onCheck(list.id)}
      />
      <span style={list.checked ? { textDecoration: "line-through" } : {}}>
        {list.title}
      </span>

      <span onClick={() => onDeleteItem(list.id)}>❌</span>
    </li>
  );
}
