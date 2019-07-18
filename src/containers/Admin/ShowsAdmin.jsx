import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { asyncFetchShows } from '../../actions/fetchShows';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import './ShowsAdmin.scss'
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

  handlePrefill(show) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      location: show.city,
      capacity: show.capacity,
      price: show.price,
    }));
    console.log(this.state);
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
    if (window.confirm("Are you sure you want to delete this show?")) {
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

  handleSubmit(show) {
    console.log(show);
  }

  render() {

    const { shows, loading, error } = this.props;
    return (
      <div className="Shows">
        <NewShow/>
        <h2 className="title">Upcomming Shows</h2>
        {error !== '' ? <div>{error}</div> : ''}
        {loading ? <div>Loading shows ...</div> : (
          <ul className="list">
            {(shows && shows.length > 0)
              ? shows.map(show => (
                <li className="show row" key={show.id}>
                  <span className="date col-lg-4 col-6">{show.date.split('').splice(0, 10).join('')} </span>
                  <span className="city col-lg-4 col-6">{show.venue}, {show.city} </span>
                  <span>{show.capacity} seats</span>
                  <span className="price col-lg-2 col-6">€{show.price}</span>
                  <Button color="danger" size={"sm"} onClick={() => this.handleDelete(show.id)}>X</Button>
                  {/* <Button color="secondary" size={"sm"} onClick={() => this.handlePrefill(show)}>Edit</Button> */}
                  <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 900 }}
                    toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                      <div>Edit Show:</div>
                      <div>{show.date.split('').splice(0, 10).join('')}, {show.venue}, {show.city}</div>
                    </ModalHeader>
                    <Form>
                      <ModalBody>
                        <FormGroup>
                          <Label for="date">Date</Label>
                          <Input type="date" name="date" id="date" value={show.date} onChange={this.handleChange}  />
                        </FormGroup>
                        <FormGroup>
                          <Label for="name">Location</Label>
                          <Input type="select" name="location" id="city" onChange={this.handleChange}>
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
                          <Input type="number" name="capacity" id="capacity" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                          <Label>Price</Label>
                          <Input type="number" name="price" id="price" onChange={this.handleChange} />
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button type="submit" value="value" color="primary" onClick={this.handleSubmit(show)}>Submit</Button>{' '}
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
