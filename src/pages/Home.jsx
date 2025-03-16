import 'react';
import AllProducts from '../components/ui/ContentHome/AllProducts';
import HeroSection from '../components/ui/ContentHome/HeroSection';
import HomeBanner from '../components/ui/ContentHome/HomeBanner';
import NewArrivals from '../components/ui/ContentHome/NewArrivals';
import ShopByCategory from '../components/ui/ContentHome/ShopByCategory';


const Home = () => {
    return (
        <>
            <HeroSection />
            <ShopByCategory />
            <NewArrivals />
            <HomeBanner />
            <AllProducts />
        </>
    );
};

export default Home;
