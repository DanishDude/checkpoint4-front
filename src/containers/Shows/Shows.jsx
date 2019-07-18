import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {asyncFetchShows} from '../../actions/fetchShows';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Shows.scss';

class Shows extends Component {
  componentDidMount() {
    const { asyncFetchShows } = this.props;
    asyncFetchShows();
  }

  render() {

    const { shows, loading, error } = this.props;
    console.log(shows);
    return (
      <div className="Shows">
      <div>
        <h2>Upcoming Shows</h2>
        {error !== '' ? <div>{error}</div> : ''}
        {loading ? <div>Loading shows ...</div> : (
          <ul className="shows">
          {(shows && shows.length > 0)
          ? shows.map(show => (
            <li className="show row" key={show.id}>
            <span className="date col-lg-4 col-6">{show.date.split('').splice(0, 10).join('')} </span>
            <span className="city col-lg-4 col-6">{show.venue}, {show.city} </span>
            <span className="price col-lg-2 col-6">€{show.price}</span>
            </li>
          ))
          : <div> There are no upcoming shows ... </div>
          }
          </ul>


        )}
      </div>
      <div className="form">
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Your name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="email@example.com" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Message</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="Please describe which show you would like to see" />
        </FormGroup>
        <Button type="submigt"> Send</Button>
      </Form>
      </div>
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