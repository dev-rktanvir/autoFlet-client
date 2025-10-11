import React from 'react';
import Banner from './Banner/Banner';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import useAuth from '../../hooks/useAuth/useAuth';
import Loading from '../../Components/Loading/Loading';

const Home = () => {
    const { loading } = useAuth();
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;