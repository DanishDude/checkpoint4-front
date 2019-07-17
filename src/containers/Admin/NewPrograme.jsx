import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { asyncFetchNewShow } from '../../actions/fetchNewShow';


class NewPrograme extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      modal: false,
      title: '',
      description: '',
      image: '',
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

  handleSubmit(e) {
    const newPrograme = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
    }
    console.log(newPrograme);
    e.preventDefault();

    const config = {
      method: 'POST',
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(newPrograme),
    };

    const url = 'http://localhost:5000/api/programe'

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`A new act has been added with id : ${res}!`);
        }
      }).catch(event => {
        console.error(event); alert('Ah Snap! This didn\'t work. Please try again later');
      });

  }

  render() {
    return (
      <div className="NewShow">
        <div>
          <Button color="primary" onClick={this.toggle}>New Act</Button>
          <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Add new act to the show</ModalHeader>
            <Form>
              <ModalBody>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" placeholder="Act tile" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Image</Label>
                  <Input type="text" name="image" id="image" placeholder="Insert link to image" onChange={this.handleChange} />
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

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchNewShow,
}, dispatch);

export default connect(null, mapDispatchToProps)(NewPrograme);