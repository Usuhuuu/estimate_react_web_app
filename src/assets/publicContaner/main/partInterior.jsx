import React from 'react';
import NavigationBar from '../nav';
import { Link } from 'react-router-dom';
import './css/smallDesign.css'
const urlApi = 'http://localhost:3001';
import Artic from '../article';
import Footer from '../footer'

const PartInterior = () => {
  return (
    <>
      <NavigationBar />
      <div>
      <div className='bugdinTsagaan'>
      <div className='imageContainers'>
      <div className='imageChange'>
        <div className='imagesss'>
          <Link to="/interior/kitchen" className="image-link"><img src="/Photo/kitchen.jpg" alt="" /><p>주방</p></Link>
          </div>
        <div className='imagesss'>
          <Link to="/interior/floorAndWall" className="image-link"><img src="/Photo/wall.jpg" alt="" /><p>도배</p></Link>
          </div>
          </div>
        </div>
      <Artic/>
      <Footer/>
      </div>
      </div>
    </>
  );
  
};
export default PartInterior;
