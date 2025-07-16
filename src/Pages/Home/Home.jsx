
import Banner from '../../Components/Home/Banner';
import Featured from '../../Components/Home/Featured';
import Trending from '../../Components/Home/Trending';
import Container from '../../Components/Shared/Container';
import CouponSlider from '../../Components/Home/CouponSlider';
import Newsletter from '../../Components/Home/NewsLettter';
import BlogSection from '../../Components/Home/BlogSection';


const Home = () => {

    return (
        <Container>
            <Banner/>
            <Featured/>
            <Trending/>
            <CouponSlider/>
            <BlogSection/>
            <Newsletter/>
        </Container>
    );
};

export default Home;