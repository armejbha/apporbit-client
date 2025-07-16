
import Banner from '../../Components/Home/Banner';
import Featured from '../../Components/Home/Featured';
import Trending from '../../Components/Home/Trending';
import Container from '../../Components/Shared/Container';
import CouponSlider from '../../Components/Home/CouponSlider';
import BlogSection from '../../Components/Home/BlogSection';
import News from '../../Components/Home/News';



const Home = () => {

    return (
        <Container>
            <Banner/>
            <Featured/>
            <Trending/>
            <CouponSlider/>
            <BlogSection/>
            <News/>
        </Container>
    );
};

export default Home;