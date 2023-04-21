import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 } from "uuid";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [todo, setTodo] = useState([]);

  const getAllData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/get");
      setTodo(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllData();
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      userName,
      id: v4(),
    };

    try {
      const res = await axios.post("http://localhost:8000/post", data);
      setTodo([...todo, res.data]);
      console.log("data", res.data);
      setName("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      const filteredItems = todo.filter((each) => {
        return each.id !== id;
      });
      setTodo(filteredItems);
    } catch (error) {}
  };

  return (
    <div className="container">
      <h3>fill the form</h3>
      <form onSubmit={submitHandler}>
        <input
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <br />
        <input
          name="userName"
          type="email"
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
        />
        <br />
        <br />
        <button type="submit">ADD</button>
      </form>
      <div>
        {todo.map((each) => {
          return (
            <div className="user-card" key={each.id}>
              <p>{each.name}</p>
              <p>{each.userName}</p>
              <div className="btn-container">
                <button
                  className="delete-btn"
                  onClick={() => deleteHandler(each._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default App;
