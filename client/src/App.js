import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    axios.get('http://localhost:5000/api/projects/')
    .then(res => {
      this.setState({ projects: res.data});
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.projects.map(project => {
          return <div key={project.id}>Project Name: {project.name}</div>
        })}
      </div>
    );
  }
}

export default App;
