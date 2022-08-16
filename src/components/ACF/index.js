import React from 'react';

// Import ACF Components
import HeroSlider from 'components/ACF/HeroSlider';
import HeroTiles from 'components/ACF/HeroTiles';
import HeroNavigation from 'components/ACF/HeroNavigation';
import HeaderAcf from 'components/ACF/Header';
import ContentAfterHeader from 'components/ACF/ContentAfterHeader';
import SectionWithPebbles from 'components/ACF/SectionWithPebbles';
import SectionWithTextAndImage from 'components/ACF/SectionWithTextAndImage';
import SectionWithBackgroundAndText from 'components/ACF/SectionWithBackgroundAndText';
import ParallaxSection from 'components/ACF/ParallaxSection';
import ImageSlider from 'components/ACF/ImageSlider';
import LatestNews from 'components/ACF/LatestNews';
import PromoBanner from 'components/ACF/PromoBanner';
import TicketsSelect from 'components/ACF/TicketsSelect';
import TicketTiles from 'components/ACF/TicketTiles';
import PartnersTiles from 'components/ACF/PartnersTiles';
import Faqs from 'components/ACF/Faqs';
import Categories from 'components/ACF/Categories';
import FormContact from 'components/ACF/FormContact';
import FormCharity from 'components/ACF/FormCharity';
import FormEvents from 'components/ACF/FormEvents';
import FormResident from 'components/ACF/FormResident';
import FormProposals from 'components/ACF/FormProposals';
import Ctas from 'components/ACF/Ctas';

const AcfComponents = {
  Page_Allcpt_Blocks_HeroSlider: HeroSlider,
  Page_Allcpt_Blocks_HeroTiles: HeroTiles,
  Page_Allcpt_Blocks_HeroNavigation: HeroNavigation,
  Page_Allcpt_Blocks_Header: HeaderAcf,
  Page_Allcpt_Blocks_ContentAfterHeader: ContentAfterHeader,
  Page_Allcpt_Blocks_SectionWithPebbles: SectionWithPebbles,
  Page_Allcpt_Blocks_SectionWithTextAndImage: SectionWithTextAndImage,
  Page_Allcpt_Blocks_SectionWithBackgroundAndText: SectionWithBackgroundAndText,
  Page_Allcpt_Blocks_ImageSlider: ImageSlider,
  Page_Allcpt_Blocks_Parallax: ParallaxSection,
  Page_Allcpt_Blocks_LatestNews: LatestNews,
  Page_Allcpt_Blocks_PromoBanner: PromoBanner,
  Page_Allcpt_Blocks_Tickets: TicketsSelect,
  Page_Allcpt_Blocks_TicketTiles: TicketTiles,
  Page_Allcpt_Blocks_PartnersTiles: PartnersTiles,
  Page_Allcpt_Blocks_Faqs: Faqs,
  Page_Allcpt_Blocks_Ctas: Ctas,
  Page_Allcpt_Blocks_Categories: Categories,
  Page_Allcpt_Blocks_FormContact: FormContact,
  Page_Allcpt_Blocks_FormCharity: FormCharity,
  Page_Allcpt_Blocks_FormEvents: FormEvents,
  Page_Allcpt_Blocks_FormResident: FormResident,
  Page_Allcpt_Blocks_FormProposals: FormProposals,
};

const AllComponents = ({ layout, posts }) => {
  if (!layout?.__typename) {
    return (
      <section id={layout?.id} className="page missing">
        <div className="inner">
          Some ACF component is missing, which is not passed as layout. This means something in the schema is broken for
          this component. Check build console errors.<span>🙅‍</span>
        </div>
      </section>
    );
  }

  const type = layout.__typename;
  const ComponentName = AcfComponents[type];

  if (!ComponentName) {
    return (
      <section id={layout?.id} className="page missing">
        <div className="inner">
          The ACF component <strong>`${layout.__typename}`</strong> is missing. <span>🙅‍</span>
        </div>
      </section>
    );
  }

  return <ComponentName data={layout} posts={posts} />;
};

export default AllComponents;
