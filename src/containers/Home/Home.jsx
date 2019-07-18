import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card, CardImg, CardTitle, CardText, CardDeck, CardBody
} from 'reactstrap';

import { asyncFetchProgrames } from '../../actions/fetchPrograme';
import './Home.scss'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

componentDidMount = () => {
    const { asyncFetchProgrames } = this.props;
    asyncFetchProgrames();
  }


  render() {
    const { programes } = this.props;
    return (
      <div className="Home">
        <div>
          <h2 className="title">Welcome to the wild circus</h2>
          <img src="/assets/becky-phan-o8-670KHgK8-unsplash.jpg" alt="header" className="promo" />
        </div>
        <h3 className="title">Amazing Acts</h3>
        <CardDeck className="container row acts">
          {programes.map(act => (
            <Card className="col-4" key={act.id}>
                <CardImg top width="100%" src={act.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{act.name}</CardTitle>
                  <CardText>{act.description}</CardText>
                </CardBody>
              </Card>
          ))}
        </CardDeck>
      </div>
    );
  }
}

const mstp = state => ({
  loading: state.programes.loading,
  programes: state.programes.list,
  error: state.programes.error,
});

const mdtp = dispatch => bindActionCreators({ asyncFetchProgrames }, dispatch);

export default connect(mstp, mdtp)(Home);
