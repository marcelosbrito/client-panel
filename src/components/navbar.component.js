import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Customer Base</Link>
        <div className="collpase nav-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to="/" className="nav-link">Client Panel</Link>
          </li>
          <li className="nav-item">
          <Link to="/create" className="nav-link">Create Project</Link>
          </li>
          <li className="nav-item">
          <Link to="/client" className="nav-link">Create Client</Link>
          </li>
        </ul>  
        </div>
      </nav>
    );
  }
}