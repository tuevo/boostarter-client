import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import OwlCarousel from 'react-owl-carousel';
import CampaignPreview from '../CampaignPreview';
import './SingleCampaignPreviewCarousel.scss';

const SingleCampaignPreviewCarousel = ({ campaigns, onChange, from }) => {
  return (
    <div className="single-campaign-preview-carousel">
      <OwlCarousel
        className='owl-theme'
        loop margin={10}
        nav
        items={1}
        center
        autoplay
        autoplayTimeout={3000}
        onChange={e => {
          if (onChange) {
            onChange(e.item.index - 1);
          }
        }}
      >
        {campaigns.map(c => (
          <CampaignPreview key={c.id} data={c} from={from} featured />
        ))}
      </OwlCarousel>
    </div>
  );
};

SingleCampaignPreviewCarousel.propTypes = {
  campaigns: PropTypes.array.isRequired
}

export default React.memo(SingleCampaignPreviewCarousel);