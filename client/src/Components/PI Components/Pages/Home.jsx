import React from 'react';
import Slider from '../Slider/Sldier';
import ArticleCard from '../Articles/ArticleCard/ArticleCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories } from '../../../redux/actions/actions';

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    console.log(categories.length);

    //;
  }, [dispatch]);
  return (
    <div>
      <Slider></Slider>
      <h2 className="text-center text-3xl text-slate-800 font-bold mt-10 mb-10">
        Articles
      </h2>
      <div className="flex	 justify-evenly">
        <ArticleCard></ArticleCard>
        <ArticleCard></ArticleCard>
        <ArticleCard></ArticleCard>
      </div>
      <h2 className="text-center text-3xl text-slate-800 font-bold mt-10 mb-10">
        Brands
      </h2>
      <div className="mb-12">
        <img
          className="w-11/12 m-auto"
          src={require('../../../img/banners/brands.png')}
        />
      </div>
    </div>
  );
}

export default Home;
