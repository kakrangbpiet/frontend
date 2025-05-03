import { Container, Typography, Card, CardContent, Grid, Link, Box } from "@mui/material";
import { styled } from "@mui/system";

const ContactContainer = styled(Container)({
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

const ContactPage = () => {
  // Replace with your actual coordinates
  const mapLocation = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3888.00393151636!2d77.5946!3d12.9716!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1746256971423!5m2!1sen!2sin";

  return (
    <ContactContainer>
      <MainTitle variant="h3" gutterBottom>
        Contact Samsara Adventures
      </MainTitle>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Get in touch with us for your Himalayan adventure queries
      </Typography>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Our Office
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="body1" paragraph>
                <strong>Address:</strong><br />
                Samsara Adventures<br />
                123 Himalayan Heights<br />
                Near Ganga River<br />
                Rishikesh, Uttarakhand 249201<br />
                India
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Operating Hours:</strong><br />
                Monday to Saturday: 9:00 AM - 6:00 PM<br />
                Sunday: 10:00 AM - 4:00 PM
              </Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Box sx={{ height: '250px', width: '100%' }}>
                <iframe 
                  title="Samsara Adventures Location"
                  src={mapLocation}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  loading="lazy"
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Contact Details
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" gutterBottom>
                General Inquiries
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>📞 Phone:</strong> +91-7899754028<br />
                <strong>📧 Email:</strong> booking@samsaraadventures.com<br />
                <strong>🌐 Website:</strong> www.samsaraadventures.com
              </Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" gutterBottom>
                Emergency Contact
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>🚑 Trek Emergency:</strong> +91-7899754028<br />
                <strong>⏰ Available:</strong> 24/7 during treks
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Connect With Us
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Follow our adventures and get the latest updates:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Link href="https://www.instagram.com/samsara_adventures01/" target="_blank" rel="noopener">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="40" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61575410837166" target="_blank" rel="noopener">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="40" />
            </Link>
            <Link href="https://wa.me/917899754028" target="_blank" rel="noopener">
              <img src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt="WhatsApp" width="40" />
            </Link>
            <Link href="https://twitter.com/samsaraadv" target="_blank" rel="noopener">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="40" />
            </Link>
          </Box>
        </CardContent>
      </StyledCard>
      
      {/* <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Send Us a Message
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Have questions about our treks or need help with your booking? Fill out our contact form and we'll get back to you within 24 hours.
          </Typography>
        </CardContent>
      </StyledCard> */}
    </ContactContainer>
  );
};

export default ContactPage;