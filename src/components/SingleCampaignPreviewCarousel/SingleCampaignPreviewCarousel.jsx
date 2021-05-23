import PropTypes from 'prop-types';
import React from 'react';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import CampaignPreview from '../CampaignPreview';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};

const SingleCampaignPreviewCarousel = (props) => {
  const { campaigns } = props;

  return (
    <div>
      <Carousel
        swipeable={false}
        draggable={true}
        ssr={true} // means to render carousel on server-side.
        keyBoardControl={true}
        responsive={responsive}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={'desktop'}
        // itemClass={classes.item}
        itemClass="carousel-item-padding-40-px"
        infinite
      >
        {campaigns.map(c => (
          <CampaignPreview key={c.id} data={c} featured />
        ))}
      </Carousel>
    </div>
  );
};

SingleCampaignPreviewCarousel.propTypes = {
  campaigns: PropTypes.array.isRequired
}

export default SingleCampaignPreviewCarousel;