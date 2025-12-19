// src/pages/About.jsx
import AboutHeader from "../components/about/AboutHeader";
import AboutIntro from "../components/about/AboutIntro";
import AboutTeam from "../components/about/AboutTeam";
import CoreValuesAndStats from "../components/about/CoreValuesAndStats";
import MissionVisionSection from "../components/about/MissionVisionSection";
import MissionVisionSimple from "../components/about/MissionVisionSimple";


const AboutPage = () => {
  return (
    <>
      <AboutHeader/>
      <AboutIntro />
      
      <CoreValuesAndStats />
      <MissionVisionSection />
      {/* <AboutTeam/> */}
    </>
  );
};

export default AboutPage;
