
import Banner from '../../Components/Home/Banner';
import Featured from '../../Components/Home/Featured';
import Trending from '../../Components/Home/Trending';
import Container from '../../Components/Shared/Container';
import CouponSlider from '../../Components/Home/CouponSlider';


const Home = () => {

    return (
        <Container>
            <Banner/>
            <Featured/>
            <Trending/>
            <CouponSlider/>
        </Container>
    );
};

export default Home;