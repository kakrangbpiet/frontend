import { Container, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled(Container)({
  padding: "24px",
  textAlign: "center",
  maxWidth: "800px",
  margin: "auto",
});

const StyledCard = styled(Card)({
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  padding: "24px",
  marginBottom: "24px",
  textAlign: "left",
});

const AboutPage = () => {
  return (
    <AboutContainer>
      <Typography variant="h3" color="primary" gutterBottom>
        Samsara Adventures - Uttarakhand
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Explore the untamed beauty and spiritual essence of the Himalayas.
      </Typography>
      
      <StyledCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            About Samsara Adventures
          </Typography>
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
          <Typography variant="h5" gutterBottom>
            Why Choose Us?
          </Typography>
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
          <Typography variant="h5" gutterBottom>
            Our Signature Experiences
          </Typography>
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
