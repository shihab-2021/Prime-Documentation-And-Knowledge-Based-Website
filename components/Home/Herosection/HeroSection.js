/* eslint-disable @next/next/no-img-element */
import React from 'react';

const HeroSection = () => {
  return (
    <div className='bg-violet-900'>
      <div className='flex'>
      <div className='hidden sm:block' >
        <img src="https://wordpress-theme.spider-themes.net/docy-dark/wp-content/plugins/docy-core/widgets/inc/hero/controls/images/banner_shap4.png" alt="" />
       </div>
       <div  style={{ marginLeft: '-187px'}} className='hidden sm:block'>
        <img src="https://wordpress-theme.spider-themes.net/docy-dark/wp-content/plugins/docy-core/widgets/inc/hero/controls/images/banner_shap1.png" alt="" />
       </div>
      </div>
      <div style={{ marginTop: '-242px'}} className='text-center pb-80'>
        <h1 className='text-6xl font-bold text-white pb-6	'>How can we help you</h1>
        <p className='text-xl font-bold text-white pb-6'> Search here to get answers to your questions</p>
        <div className='flex justify-center'>
        <div className='bg-white w-52 h-10 rounded'>
          <input className='h-10' type="text" />
          <button className='h-10 hover:bg-violet-900'>aa</button>
        </div>
        </div>
        
      </div>
       
    </div>
  );
};

export default HeroSection;
