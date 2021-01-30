import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios';

export default class CreateProject extends Component {

  constructor(props) {
    super(props);

    this.onChangeClientname = this.onChangeClientname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      clientname: '',
      email: '',
      mobile: 0,
      project: '',
      date: new Date(),
      clients: [],
      projectsf: null
    }
  }

  componentDidMount() {
    Axios.get('https://us-central1-portfolio-44c8a.cloudfunctions.net/cpanel/clients/')
    .then(response => {
    if (response.data.length > 0){
        this.setState({
          clients: response.data.map(client => client.clientname),
          clientname: response.data[0].clientname
        })
      } 
    })
    
  }

  onChangeClientname(e) {
    this.setState({
      clientname: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value
    });
  }
  onChangeProject(e) {
    this.setState({
      project: e.target.value
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      clientname: this.state.clientname,
      email: this.state.email,
      mobile:  this.state.mobile,
      project: this.state.project,
      date:  this.state.date,
      projectsf: this.state.projectsf
    }

    console.log(project);

    Axios.post('https://us-central1-portfolio-44c8a.cloudfunctions.net/cpanel/projects/add', project)
    .then(res => {
      console.log(res.data);
      if(res.data.status === 'fail') {
        this.setState({
          projectsf: false
        }); 
      } else {
        this.setState({
          projectsf: true
        });
      }
    })  
    .catch(err => {
      console.log(err);
      this.setState({
        projectsf: false 
      });
    });

    this.setState({
      clientname: '',
      email: '',
      mobile:  '',
      project: '',
      date:  '',
      projectsf: ''
    }); 
   //window.location = 'https://mern-client-panel.web.app/'; //after submit project go back to hamepage
  }

  render() {
    return (
      <div>
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Client: </label>
            <select ref="clientInput"
                required
                className="form-control"
                value={this.state.clientname}
                onChange={this.onChangeClientname}>
                {
                  this.state.clients.map(function(client) {
                    return <option
                      key={client}
                      value={client}> {client} 
                    </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>E-mail: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail} />
          </div>
          <div className="form-group">
            <label>Phone Number: </label>
            <input type="number"
                required
                className="form-control"
                value={this.state.mobile}
                onChange={this.onChangeMobile} />
          </div>
          <div className="form-group">
            <label>Project: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.project}
                onChange={this.onChangeProject} />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate} />
            </div>      
          </div>

          <div className="form-group">
            <input type="submit" value="Create Project" className="btn btn-primary" />
          </div>
          {this.state.projectsf === true && <p className="alert alert-success" value={this.state.projectsf}>Project added!</p>}
          {this.state.projectsf === false && <p className="alert alert-danger" value={this.state.projectsf}>Error. Try again later.</p>}
        </form>
      </div>
    )
  }
}