import { Container, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled(Container)({
  padding: "24px",
  textAlign: "center",
  maxWidth: "800px",
  background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.18)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
});

const StyledCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 4px 12px rgba(31, 38, 135, 0.15)",
  padding: "24px",
  marginBottom: "24px",
  textAlign: "left",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(31, 38, 135, 0.25)",
  },
});

const SectionTitle = styled(Typography)({
  position: "relative",
  display: "inline-block",
  marginBottom: "16px",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: "0",
    width: "40px",
    height: "3px",
    background: "linear-gradient(90deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%)",
    borderRadius: "3px",
  },
});

const MainTitle = styled(Typography)({
  backgroundImage: "linear-gradient(135deg,rgb(0, 0, 0) 0%, #2575fc 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "700",
  letterSpacing: "1px",
});

const AboutPage = () => {
  return (
    <AboutContainer>
      <MainTitle variant="h3" gutterBottom>
        Samsara Adventures - Uttarakhand
      </MainTitle>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Explore the untamed beauty and spiritual essence of the Himalayas.
      </Typography>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            About Samsara Adventures
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Samsara Adventures is dedicated to providing immersive and sustainable travel experiences across the mystical landscapes of Uttarakhand. We curate bespoke trekking, camping, and cultural journeys that allow travelers to explore the unspoiled beauty of the Himalayas.
          </Typography>
          <Typography variant="body1" paragraph>
            Our expert guides, deep-rooted local knowledge, and commitment to eco-friendly tourism ensure an unforgettable adventure while preserving the natural and cultural heritage of the region.
          </Typography>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Why Choose Us?
          </SectionTitle>
          <ul>
            <li><Typography variant="body1">Experienced and certified guides with in-depth knowledge of the region.</Typography></li>
            <li><Typography variant="body1">Customized itineraries tailored to your adventure level.</Typography></li>
            <li><Typography variant="body1">Commitment to eco-tourism and responsible travel.</Typography></li>
            <li><Typography variant="body1">Safety-first approach with best-in-class trekking and camping gear.</Typography></li>
          </ul>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Our Signature Experiences
          </SectionTitle>
          <Typography variant="body1" paragraph>
            - **Valley of Flowers Trek**: Witness a breathtaking burst of colors in this UNESCO World Heritage Site.
          </Typography>
          <Typography variant="body1" paragraph>
            - **Char Dham Yatra**: A spiritual journey to the four sacred shrines of Uttarakhand.
          </Typography>
          <Typography variant="body1" paragraph>
            - **Kedarkantha Winter Trek**: Experience the thrill of snow-covered peaks and alpine beauty.
          </Typography>
          <Typography variant="body1" paragraph>
            - **Rishikesh River Rafting**: Ride the mighty rapids of the Ganges for an adrenaline-pumping adventure.
          </Typography>
        </CardContent>
      </StyledCard>
    </AboutContainer>
  );
};

export default AboutPage;