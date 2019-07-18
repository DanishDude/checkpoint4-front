import React, { Component } from 'react';
import {
  Carousel, CarouselItem, CarouselControl, CarouselIndicators,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncFetchProgrames } from '../actions/fetchPrograme';
import './OurStory.scss';

class OurStory extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      programes: [],
       };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount = () => {
    const { asyncFetchProgrames } = this.props;
    asyncFetchProgrames();
    const { programes } = this.props;
    this.setState({
      programes: programes,
    });
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.programes.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.programes.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() { 
    const { programes } = this.props;
    const { activeIndex } = this.state;
    const slides = programes.map(programe => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={programe.id}
        >
          <img src={programe.image} alt={programe.title} />
        </CarouselItem>
      );
    });

    return ( 
      <div className="OurStory">
      <h2>Our Story</h2>
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={programes} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>

      <p className="text">
        Travel with Bubba into this year's magic circus adventure filled with thrilling performances, 
        circus songs and a selection of the world's best artists in the Wild Circus new performance.
        Experience an original story as Bubba shows you all the corners of the circus's magical world. 
        Together you will meet the most hilarious Clowns that show their incredible acrobatics as they 
        turn the world upside down. Duo Costache magician group that will keep you on the edge of your 
        seat in a new impressive number. Meet the fearless tamer from Diorios who are back in the jungle 
        of Wild Circus 2019. A fun and exilerating adventure awaits the whole family when Wild Circus 
        comes to a city near you in 2019.
      </p>
      </div>
     );
  }
}
 
const mstp = state => ({
  loading: state.programes.loading,
  programes: state.programes.list,
  error: state.programes.error,
});

const mdtp = dispatch => bindActionCreators({
  asyncFetchProgrames
  }, dispatch);

export default connect(mstp, mdtp)(OurStory);