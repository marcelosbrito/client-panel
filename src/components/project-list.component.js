import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Project = props => (
  <tr>
    <td>{props.project.clientname}</td>
    <td>{props.project.email}</td>
    <td>{props.project.mobile}</td>
    <td>{props.project.project}</td>
    <td>{props.project.date.substring(0,10)}</td>
    <td>
      <button><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={"/edit/"+props.project._id}>edit</Link></button> | <button onClick={() => { props.deleteProject(props.project._id) }}>delete</button>
    </td>
  </tr>
)

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);

    this.state = {projects: []};
  }

  componentDidMount() {
    Axios.get('https://us-central1-portfolio-44c8a.cloudfunctions.net/cpanel/projects/')
    .then((response) => {
      this.setState({ projects: response.data })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteProject(id) {
    Axios.delete('https://us-central1-portfolio-44c8a.cloudfunctions.net/cpanel/projects/'+id)
    .then(res => console.log(res.data));

    this.setState({
      projects: this.state.projects.filter(el => el._id !== id)
    })
  }

  projectList() {
    return this.state.projects.map(currentproject => {
      return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Projects</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Client</th>
              <th>E-mail</th>
              <th>Mobile</th>
              <th>Project</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
      </div>
    )
  }
}