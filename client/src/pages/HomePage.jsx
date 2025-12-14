import { Box } from "@chakra-ui/react";
import Hero from "../sections/Hero";
import WhyChooseUs from "../sections/WhyChooseUs";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <Box id="top">
      <>
        <Hero />
        <WhyChooseUs />
        <Footer />
      </>
    </Box>
  );
}

export default HomePage;
