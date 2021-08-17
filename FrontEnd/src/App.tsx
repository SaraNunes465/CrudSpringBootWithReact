import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddClient from "./components/add-client.component";
import Client from "./components/client.component";
import ListClient from "./components/list-client.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/cadastro"} className="navbar-brand">
            CRUD
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cadastro"} className="nav-link">
                cliente
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar Novo Cliente
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cadastro"]} component={ListClient} />
            <Route exact path="/add" component={AddClient} />
            <Route path="/cadastro/:id" component={Client} />
          </Switch>
        </div>
      </div>
    )
  };
}

export default App;