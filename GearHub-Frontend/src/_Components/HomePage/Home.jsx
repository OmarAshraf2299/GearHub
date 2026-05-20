import './Homepage.css'
import { useNavigate } from 'react-router-dom'
import popularSearch1 from '../../assets/brand-toyota-1716782448.webp'
import popularSearch2 from '../../assets/brand-nissan.webp'
import popularSearch3 from '../../assets/brand-hyundai.webp'
import popularSearch4 from '../../assets/brand-honda.webp'
import popularSearch5 from '../../assets/brand-ford.webp'

function Home() {
  const navigate = useNavigate();

  return (
    <>

    <div className='home'>
        <div className='home-content'>
    <span className='home-title'>Shop Gear  Hub Parts by Brand</span>
    <p className='home-description'>Your one-stop shop for all your automotive needs. We offer a wide range of products and services to keep your vehicle running smoothly.</p>


      <div className="search-box  flex  max-w-2xl mx-auto  rounded-full overflow-hidden">
        <input 
          type="text" 
          placeholder="Search for parts, brands, or accessories..." 
          className="input-box bg-white text-gray-700"
          style={{ border: "none", outline: "none", boxShadow: "none" }}
        />  
        <button 
          onClick={() => navigate('/products')}
          className="button-box  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 transition-colors duration-300 focus:outline-none"
        >
          Search
        </button>
      </div>


        </div>
        

<div className='foot-text d-flex justify-center items-center'>
        <div>
          <span>
          Popular Searches
        </span>
          </div>


      </div>

  <div className='popular-searches'>
            <ul className="cursor-pointer"> 
          <li onClick={() => navigate('/products')}>
            <img src={popularSearch1} alt="Popular Search 1" />
          </li>
          <li onClick={() => navigate('/products')}>
            <img src={popularSearch2} alt="Popular Search 2" />
          </li>
          <li onClick={() => navigate('/products')}>
            <img src={popularSearch5} alt="Popular Search 5" />
          </li>
          <li onClick={() => navigate('/products')}>
            <img src={popularSearch3} alt="Popular Search 3" />
          </li>
          
          <li onClick={() => navigate('/products')}>
            <img src={popularSearch4} alt="Popular Search 4" />
          </li>
          
          
        </ul>
            </div> 


    </div>
    

    <div className='description-about' id='about'>
      <span className='description-title'>
        Welcome to GearHub
      </span>

      <span className='description-subtitle'>
      your trusted destination for quality auto parts and accessories at competitive prices
      </span>
      <div className='description-text'>
        <p>At GearHub
, we make it easy to find the right auto parts and accessories for your vehicle. Shop quality parts by name, part number, or VIN, with reliable sourcing, competitive pricing, and fast nationwide shipping. From maintenance essentials to upgrades, GearHub helps keep your vehicle running at its best.</p>
        <p>Drive with confidence and keep your vehicle performing at its best with GearHub — where quality, convenience, and value come together.</p>
      </div>

    </div>


    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default Home;