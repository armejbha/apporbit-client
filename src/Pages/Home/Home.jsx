
import Banner from '../../Components/Home/Banner';
import Featured from '../../Components/Home/Featured';
import Trending from '../../Components/Home/Trending';
import Container from '../../Components/Shared/Container';


const Home = () => {

    return (
        <Container>
            <Banner/>
            <Featured/>
            <Trending/>
        </Container>
    );
};

export default Home;