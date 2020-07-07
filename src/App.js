import React from 'react';
// import './sass/App.sass'
import DolarInfo from './views/DolarInfo';
import Home from './views/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/">INDICADORES ECONÓMICOS</Link>
        <button class="navbar-toggler" type="button btn-dark" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <Link className="nav-link" to="/informacion-dolar">Dolar</Link>
            </li>
          </ul>
        </div>
        <span class="navbar-text">
          Datos provistos por <a href="https://mindicador.cl/">MINDICADOR.CL</a>
        </span>
      </nav>
      <Switch>
        <Route path="/informacion-dolar">
          <DolarInfo/>
        </Route>
        <Route path="/" exact>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
