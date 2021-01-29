import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeClientname = this.onChangeClientname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      clientname: ''
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
      clientname: this.state.clientname
    }

    console.log(client);

    Axios.post('https://us-central1-portfolio-44c8a.cloudfunctions.net/cpanel/clients/add', client)
    .then(res => console.log(res.data));

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

      </form>  
      </div> 
    )
  }
}