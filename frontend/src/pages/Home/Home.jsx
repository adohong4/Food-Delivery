import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import Banner from '../../components/Banner/Banner';
import Intro from '../../components/Intro/Intro';

const Home = () => {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(metaViewport);

    return () => {
      document.head.removeChild(metaViewport);
    };
  }, []);

  return (
    <div className='container-fluid'>
      <Banner />
      <Intro />
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
