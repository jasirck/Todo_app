import React, { useState, useRef, useEffect } from "react";
import './App.css';
import 'react-icons/fi';
import 'react-icons/md';

import { FiEdit3 } from "react-icons/fi";
import { MdOutlineSaveAs } from "react-icons/md";


function App() {
  let [todo, setTodo] = useState("");
  let [todos, setTodos] = useState([]);
  let  [editId,seteditId] = useState(null)
  const [unique, setUnique] = useState(true); 

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setTodo(newValue);

    const isUnique = !todos.some((obj) => obj.text === newValue);
    setUnique(isUnique);
  };

  const addTodo = () => {
    let foundDuplicate = false;
  
    todos.forEach((obj) => {
      if (obj.text === todo) {
        foundDuplicate = true;
        setUnique(false);
      }
    });
  
    if (!foundDuplicate) {
      if (editId !== null){
        setTodos(
          todos.map((obj) => {
            if (obj.id === editId) {
              obj.text = todo;
              return obj;
            }
            return obj;
          })
        );
      }else{
      setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
      setTodo("");
      setUnique(true);
      }
      setTodo("");
      seteditId(null);
    }
  };
  let inputValue = useRef(null);
  useEffect(() => {
    inputValue.current.focus();
  });
  const onDelete = (id) => {
    setTodos(
      todos.filter((value) => {
        return id !== value.id;
      })
    );
  };
  const onEdit = (id) =>{
    let editTodo = todos.find((value) => value.id === id)
    setTodo(editTodo.text)
    let todoId = editTodo.id
    seteditId(todoId)
    setUnique(true);
  };

  return (
    <div className="app">
      <div className="headdiv">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, I forgot that </h2>
      </div>
      </div>
      
      <div
        className="input"
        style={{
          borderColor: unique ? 'initial' : 'red',
          // backgroundColor: unique   ? 'initial' : '#ff6262',
        }}>
        <input
          value={todo}
          ref={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="🖊️ Add item..."
        />
          {editId == null ? <i onClick={addTodo} className="fas fa-plus" title="Add "></i>: <MdOutlineSaveAs onClick={addTodo} />}
      </div>
      {!unique ? <p className="red">Sorry, you already added that</p>:null }
      <div className="todos">
        {todos.map((item) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  title="Complete"
                  onChange={(e) => {
                    setTodos(
                      todos.map((obj) => {
                        if (obj.id === item.id) {
                          obj.status = e.target.checked;
                          return obj;
                        }
                        return obj;
                      })
                    );
                  }}
                  value={item.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p style={{ textDecoration: item.status ? 'line-through' : 'none' }}>{item.text}</p>

              </div>
              <div className="right">
              <FiEdit3 className="edit" onClick={() => onEdit(item.id)} title="Edit" />
                < i
                  className="fas fa-times"
                  onClick={() => onDelete(item.id)}
                  title="Delete"
                ></i>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
