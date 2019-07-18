import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { asyncFetchNewShow } from '../../actions/fetchNewShow';

class NewShow extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    const newShow = {
      date: this.state.date,
      city_id: this.state.location,
      capacity: this.state.capacity,
      price: this.state.price,
    }
    console.log(newShow);

    const config = {
      method: 'POST',
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(newShow),
    };

    const url = 'http://localhost:5000/api/circus-show'

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`A new show has been added with id : ${res}!`);
        }
      }).catch(event => {
        console.error(event);
      });

  }

  render() {
    return (
      <div className="NewShow">
        <div>
          <Button color="primary" onClick={this.toggle}>New Show</Button>
          <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Add new show to the tour</ModalHeader>
            <Form>
              <ModalBody>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="date" name="date" id="date" onChange={this.handleChange} />
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
                <Button type="submit" value="value" color="primary" onClick={this.handleSubmit}>Add</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Form>

          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newShow: state.newShow,
  /* {
    date: state.date,
    location: state.location,
    capacity: state.capacity,
    price: state.price,
  }, */
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchNewShow,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewShow);