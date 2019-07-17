import React, { Component } from 'react';
import { CardDeck, CardImg, Card, CardBody, CardText, CardTitle, Button, } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {asyncFetchProgrames} from '../../actions/fetchPrograme';

class Programe extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const { asyncFetchProgrames } = this.props;
    asyncFetchProgrames();
  }
  

  render() {
    const { programes, loading, error } = this.props;
    console.log(programes);
    return ( 
      <div className="Programe">
        <div className="acts">

          {error !== '' ? <div>{error}</div> : ''}
        {loading ? <div>Loading programes ...</div> : (
          <CardDeck className="container row">
          {(programes && programes.length > 0)
          ? programes.map(programe => (
            <Card className="col-4">
                <CardImg top width="100%" src={programe.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{programe.title}</CardTitle>
                  <CardText>{programe.description}</CardText>
                  <Button>Edit</Button>
                </CardBody>
              </Card>
          ))
          : <div> There are no programes ... </div>
          }
          </CardDeck>
        )}

      </div>
      </div>
     );
  }
}

const mapStateToProps = (state) => ({
  loading: state.programes.loading,
  programes: state.programes.list,
  error: state.programes.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchProgrames
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Programe)
