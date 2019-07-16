import React, { Component } from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck, CardBody
} from 'reactstrap';
import './Home.scss'

const sampleActs = [
  {
    name: "Toto",
    image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fs.hswstatic.com%2Fgif%2Fdangerous-circus-acts-orig.jpg&f=1",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium beatae sequi quas dolorum maiores ducimus vel deleniti molestiae perferendis quasi nulla, ex, quam quae vero facilis consequatur reprehenderit. Provident, dolorum."
  },
  {
    name: "Jojo",
    image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fs.hswstatic.com%2Fgif%2Fdangerous-circus-acts-orig.jpg&f=1",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium beatae sequi quas dolorum maiores ducimus vel deleniti molestiae perferendis quasi nulla, ex, quam quae vero facilis consequatur reprehenderit. Provident, dolorum."
  },
  {
    name: "Coco",
    image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fs.hswstatic.com%2Fgif%2Fdangerous-circus-acts-orig.jpg&f=1",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium beatae sequi quas dolorum maiores ducimus vel deleniti molestiae perferendis quasi nulla, ex, quam quae vero facilis consequatur reprehenderit. Provident, dolorum."
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="Home">
        <div>
          <h2>This is a home page</h2>
          <img src="/assets/becky-phan-o8-670KHgK8-unsplash.jpg" alt="header" className="promo" />
        </div>
        <h2>The Best Acts</h2>
        <div className="acts">
          <CardDeck className="container row">
            {sampleActs.map(Act =>
              <Card className="col-4">
                <CardImg top width="100%" src={Act.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{Act.name}</CardTitle>
                  <CardText>{Act.description}</CardText>
                  <Button>See more</Button>
                </CardBody>
              </Card>
            )}
          </CardDeck>
        </div>
      </div>
    );
  }
}

export default Home;