import React from 'react';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';

const Container = styled.div`
  margin-left: 10px;
  margin-top: 50px;
`

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
        <Footer />
      </Container>
    </div>
  )
}

export default Home
