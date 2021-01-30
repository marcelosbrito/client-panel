import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeClientname = this.onChangeClientname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      clientname: '',
      clientsf: null
    }
  }

  onChangeClientname(e) {
    this.setState({
      clientname: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const client = {
      clientname: this.state.clientname,
      clientsf: this.state.clientsf
    }

    console.log(client);

    Axios.post('https://us-central1-portfolio-44c8a.cloudfunctions.net/cpanel/clients/add', client)
    .then(res => {
      console.log(res.data);
      if(res.data.status === 'fail') {
        this.setState({
          clientsf: false
        }); 
      } else {
        this.setState({
          clientsf: true
        });
      }
    })  
    .catch(err => {
      console.log(err);
      this.setState({
        clientsf: false 
      });
    });

    this.setState({
        clientname: ''
    }); //after submit stay in the page so can submit another client
  }

  render() {
    return (
      <div>
      <h3>Create New Client</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Client: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.clientname}
              onChange={this.onChangeClientname} />              
        </div>

        <div className="form-group">
            <input type="submit" value="Create Client" className="btn btn-primary" />
        </div>
        {this.state.clientsf === true && <p className="alert alert-success" value={this.state.clientsf}>Client added!</p>}
        {this.state.clientsf === false && <p className="alert alert-danger" value={this.state.clientsf}>Error. Try again later.</p>}
      </form>  
      </div> 
    )
  }
}