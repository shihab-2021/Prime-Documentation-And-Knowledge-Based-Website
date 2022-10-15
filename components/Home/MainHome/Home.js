import CommunitiesCard from "../CommunitiesCard/CommunitiesCard";
import HeroSection from "../Herosection/HeroSection";
import Navbar from "../../Shared/Navbar/Navbar";
import Question from "../Question/Question";
import VideoList from "../VideoList/VideoList";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <CommunitiesCard></CommunitiesCard>
      <Question></Question>
      <VideoList></VideoList>
      <Footer></Footer>
    </div>
  );
};

export default Home;
