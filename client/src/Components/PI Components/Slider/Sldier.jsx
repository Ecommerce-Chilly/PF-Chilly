import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../img/banners/banner1.jpeg';
import banner2 from '../../../img/banners/banner2.jpeg';
import banner3 from '../../../img/banners/banner3.jpeg';

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
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div>
          <img src={banner3} />
        </div>
      </Carousel>
    );
  }
}
export default DemoCarousel;
