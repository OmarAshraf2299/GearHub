import React from 'react'

function Footer() {
  return (
    <>
    <div className='footer flex flex-col justify-between w-full h-[30vh] bg-[#252525] text-white py-8 px-12 mt-12'>
      <div className='max-w-7xl w-full mx-auto flex justify-center '>
        {/* Navigation Column */}
        <div className='left-side flex flex-col'>
          <h3 className='Navigation-side font-bold text-2xl mb-5 pb-2  '>Navigation</h3>
          <div className='link-footer flex flex-col gap-3 text-sm'>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Home</a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>About</a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Contact</a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Reviews</a>
          </div>
        </div>
        
        {/* Policies Column */}
        <div className=' right-side flex flex-col'>
          <h3 className=' Navigation-side text-white font-bold text-lg mb-4 pb-2 '>Policies</h3>
          <div className='link-footer flex flex-col gap-3 text-sm'>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Shipping Policy</a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Return Policy</a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Privacy Policy</a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors duration-200'>Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className='bottom-bar max-w-7xl w-full mx-auto flex justify-between items-center text-sm pt-4 border-t border-[#333]'>
        <a href='#' className=' text-white  hover:text-gray-300'>Terms of Service & Conditions</a>
        <span>Copyright © 2026 Gear Hub Parts Online</span>
      </div>
    </div>
    
    
    
    
    </>
  )
}

export default Footer