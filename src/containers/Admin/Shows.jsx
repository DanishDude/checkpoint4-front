import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {asyncFetchShows} from '../../actions/fetchShows';
import { Input } from 'reactstrap';
import './Shows.scss'
import NewShow from './NewShow';

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
