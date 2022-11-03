import CommunitiesCard from "../CommunitiesCard/CommunitiesCard";
import HeroSection from "../Herosection/HeroSection";
import Navbar from "../../Shared/Navbar/Navbar";
import Question from "../Question/Question";
import VideoList from "../VideoList/VideoList";
import Footer from "../../Shared/Footer/Footer";
import HomeBlogList from "../HomeBlogList/HomeBlogList";

const Home = () => {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <HeroSection></HeroSection>
      <CommunitiesCard></CommunitiesCard>
      <HomeBlogList></HomeBlogList>
      <Question></Question>
      <VideoList></VideoList>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;
