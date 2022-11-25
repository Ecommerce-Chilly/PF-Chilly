import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel
        showThumbs={false}
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
      >
        <div>
          <img src={require('../../../img/banners/banner1.jpeg')} />
        </div>
        <div>
          <img src={require('../../../img/banners/banner2.jpeg')} />
        </div>
        <div>
          <img src={require('../../../img/banners/banner3.jpeg')} />
        </div>
      </Carousel>
    );
  }
}
export default DemoCarousel;
