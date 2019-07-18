import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {asyncFetchShows} from '../../actions/fetchShows';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import './Shows.scss'
import NewShow from './NewShow';

class Shows extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      modal: false,
      date: '',
      location: '',
      capacity: 0,
      price: 0,
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    const { asyncFetchShows } = this.props;
    asyncFetchShows();
  }

  handleDelete(id) {
    if (window.confirm("Are you sure you wan to delete this show?")) {
      fetch(`http://localhost:5000/api/circus-show/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ id })
      })
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            window.location.reload();
          }

        }).catch(event => {
          console.error(event);
          alert('Ah Snap :-/ this show was not deleted. Pls try again later')
        });

    } else {
      alert("Nothing was deleted")
    }
  }

  handleEdit(show) {
    /* console.log(show.id);
    if (window.confirm("Are you sure you wan to delete this show?")) {
      fetch(`http://localhost:5000/api/circus-show/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ id })
      })
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            window.location.reload();
          }

        }).catch(event => {
          console.error(event);
          alert('Ah Snap :-/ this show was not deleted. Pls try again later')
        });

    } else {
      alert("Nothing was deleted")
    } */
  }

  render() {

    const { shows, loading, error } = this.props;
    console.log(shows);
    return (
      <div className="Shows">
        <NewShow />
        <h2>Upcomming Shows</h2>
        {error !== '' ? <div>{error}</div> : ''}
        {loading ? <div>Loading shows ...</div> : (
          <ul className="shows">
          {(shows && shows.length > 0)
          ? shows.map(show => (
            <li className="show row" key={show.id}>
            <span className="date col-lg-4 col-6">{show.date.split('').splice(0, 10).join('')} </span>
            <span className="city col-lg-4 col-6">{show.venue}, {show.city} </span>
            <Input
            className="qty col-1"
            placeholder="Qty"
            min={0} max={show.capacity}
            type="number"
            step="1"
            bsSize="sm"
            />
            <span className="price col-lg-2 col-6">€{show.price}</span>
            <Button color="danger" size={"sm"} onClick={() => this.handleDelete(show.id)}>X</Button>
            <Button color="secondary" size={"sm"} onClick={() => this.toggle(show)}>Edit</Button>
            <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modify show</ModalHeader>
            <Form>
              <ModalBody>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="date" name="date" id="date" value={show.date} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Location</Label>
                  <Input type="select" name="location" id="city" value={show.city} onChange={this.handleChange}>
                    <option>Select a venue</option>
                    <option value="1">Grand Théâtre, Bordeaux</option>
                    <option value="3">Théâtre Graslin", Nantes</option>
                    <option value="5">St. Martin Comedy, Paris</option>
                    <option value="6">Célestins, Lyon</option>
                    <option value="7">Théâtre Sébastopol, Lille</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Capacity</Label>
                  <Input type="number" name="capacity" id="capacity" value={show.capacity} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>Price</Label>
                  <Input type="number" name="price" id="price" value={show.price} onChange={this.handleChange} />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" value="value" color="primary" onClick={this.handleSubmit}>Add</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Form>

          </Modal>
            </li>
          ))
          : <div> There are no upcoming shows ... </div>
          }
          </ul>
          
        
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.shows.loading,
  shows: state.shows.list,
  error: state.shows.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchShows
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shows)
