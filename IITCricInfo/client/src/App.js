import { Fragment } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import './App.css';

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import ListMatches from "./components/ListMatches";

function App() {
  return (
    <BrowserRouter>
    {/* //   <div className="container">
    //     <InputTodo />
    //     <ListTodos />npm ls */}
      <Routes>
        <Route path="/matches" element={<ListMatches />} />
        <Route path="/"/>
          
      </Routes>
        

   {/* <ListMatches /> */}


    </BrowserRouter>


  );
}

export default App;
