import React, { Component } from 'react';
import { CardDeck, CardImg, Card, CardBody, CardText, CardTitle, Button, } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { asyncFetchProgrames } from '../../actions/fetchPrograme';
import NewPrograme from './NewPrograme';
import './Programe.scss';

class Programe extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { asyncFetchProgrames } = this.props;
    asyncFetchProgrames();
  }

  handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this act?")) {
      fetch(`http://localhost:5000/api/programe/${id}`, {
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
          alert('Ah Snap :-/ this act was not deleted. Please try again later')
        });

    } else {
      alert("Nothing was deleted")
    }
  }

  render() {
    const { programes, loading, error } = this.props;
    return (
      <div className="Programe">
        <NewPrograme />
        <div className="acts">

          {error !== '' ? <div>{error}</div> : ''}
          {loading ? <div>Loading programes ...</div> : (
            <CardDeck className="container row">
              {(programes && programes.length > 0)
                ? programes.map((programe, index) => (
                  <Card key={index} className="col-4">
                    <CardImg top width="100%" src={programe.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{programe.title}</CardTitle>
                      <CardText>{programe.description}</CardText>
                      <Button color="danger" onClick={() => this.handleDelete(programe.id)}>Delete</Button>
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
