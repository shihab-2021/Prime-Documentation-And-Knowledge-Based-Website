import CommunitiesCard from "../CommunitiesCard/CommunitiesCard";
import HeroSection from "../Herosection/HeroSection";
import Navbar from "../../Shared/Navbar/Navbar";
import Question from "../Question/Question";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Question></Question>
      {/* <CommunitiesCard></CommunitiesCard> */}
    </div>
  );
};

export default Home;
