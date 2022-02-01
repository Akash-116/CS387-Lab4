import { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import ListMatches from "./components/ListMatches";

function App() {
  return (
    // <BrowserRouter>
    //   <div className="container">
    //     <InputTodo />
    //     <ListTodos />
    //     <Route path="/" >
    //       <ListMatches />
    //     </Route>

    //   </div>
    //   {/* <ListMatches /> */}


    // </BrowserRouter>

    <BrowserRouter>
      <Switch>
        <Route path="/" component={ListMatches} />
        {/* <Route path="/about" component={About} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
