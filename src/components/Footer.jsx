import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="Footer">
        <img src="http://www.visiondiversite.com/wp-content/uploads/2018/06/Logo-Facebook.jpg" alt="facebook" />
        <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fe%2Fe7%2FInstagram_logo_2016.svg%2F1024px-Instagram_logo_2016.svg.png&f=1" alt="insta" />
        <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fsguru.org%2Fwp-content%2Fuploads%2F2018%2F02%2FTwitter_logo_white_blue.png&f=1" alt="twitter" />
      </div>
     );
  }
}
 
export default Footer;