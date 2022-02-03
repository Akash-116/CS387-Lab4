import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import ListMatches from "./components/ListMatches";
import ListPlayers from "./components/ListPlayers";
import EachMatch from "./components/EachMatch/EachMatch";
import EachPlayer from "./components/EachPlayer/EachPlayer";
import EditTodo from "./components/EditTodo";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <nav class="navbar navbar-expand-sm bg-light justify-content-center">
        <Link to="/matches">Matches</Link>

      </nav>
      <div className="container">
        {/* <InputTodo />
        <ListTodos /> */}

        <Routes>


          <Route path="/" element={<ListMatches />} />
          <Route path="/matches" element={<ListMatches />} />
          <Route path="/players" element={<ListPlayers />} />
          <Route path="/matches/:match_id" element={<EachMatch />} />
          <Route path="/players/:player_id" element={<EachPlayer />} />
          <Route path="/*" element={<ErrorPage />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
