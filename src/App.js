import './App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import News from './component/News';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="container my-3">
            <Routes>
              {/* Route for Home */}
              <Route path="/" element={<News key="general" pageSize={6} category="general" />} />

              {/* Routes for each category */}
              <Route path="/business" element={<News key="business" pageSize={6} category="business" />} />
              <Route path="/entertainment" element={<News key="entertainment" pageSize={6} category="entertainment" />} />
              <Route path="/health" element={<News key="health" pageSize={6} category="health" />} />
              <Route path="/science" element={<News key="science" pageSize={6} category="science" />} />
              <Route path="/sports" element={<News key="sports" pageSize={6} category="sports" />} />
              <Route path="/technology" element={<News key="technology" pageSize={6} category="technology" />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}
