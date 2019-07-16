import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {asyncFetchShows} from '../../actions/fetchShows';

class Admin extends Component {
  componentDidMount() {
    const { asyncFetchShows } = this.props;
    asyncFetchShows();
  }

  render() {
    const { shows, loading, error } = this.props;
    console.log(shows);
    return (
      <div className="Admin">
        <h2>Upcomming Shows</h2>
        {error !== '' ? <div>{error}</div> : ''}
        {loading ? <div>Loading shows ...</div> : (
          <ul>
          {(shows && shows.length > 0)
          ? shows.map((show, index) => (
            <li>
            {show.date}
            {show.price}
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

})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchShows
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
