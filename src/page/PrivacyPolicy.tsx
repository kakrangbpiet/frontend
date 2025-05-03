import { Container, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const PrivacyContainer = styled(Container)({
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

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <MainTitle variant="h3" gutterBottom>
        Samsara Adventures - Privacy Policy
      </MainTitle>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Last Updated: {new Date().toLocaleDateString()}
      </Typography>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Introduction
          </SectionTitle>
          <Typography variant="body1" paragraph>
            The domain name www.samsaraadventures.com (hereinafter referred to as "Website") is owned by Samsara Adventures, a travel company specializing in Himalayan experiences in Uttarakhand, India.
          </Typography>
          <Typography variant="body1" paragraph>
            This privacy policy sets out how Samsara Adventures uses and protects any information that you provide when using this website. We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information, you can be assured it will only be used in accordance with this privacy statement.
          </Typography>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Information We Collect
          </SectionTitle>
          <Typography variant="body1" paragraph>
            We may collect the following information:
          </Typography>
          <ul>
            <li><Typography variant="body1">Name and contact information including email address and phone number</Typography></li>
            <li><Typography variant="body1">Demographic information such as postcode, preferences and interests</Typography></li>
            <li><Typography variant="body1">Travel-related information including passport details, medical information, and emergency contacts</Typography></li>
            <li><Typography variant="body1">Payment information for booking processing</Typography></li>
            <li><Typography variant="body1">Other information relevant to customer surveys and offers</Typography></li>
          </ul>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            How We Use Your Information
          </SectionTitle>
          <Typography variant="body1" paragraph>
            We require this information to understand your needs and provide you with better service, particularly for:
          </Typography>
          <ul>
            <li><Typography variant="body1">Internal record keeping and trip administration</Typography></li>
            <li><Typography variant="body1">Improving our products and services</Typography></li>
            <li><Typography variant="body1">Periodic promotional emails about new treks, special offers, or other information</Typography></li>
            <li><Typography variant="body1">Customizing the website according to your interests</Typography></li>
            <li><Typography variant="body1">Ensuring your safety during our adventure trips</Typography></li>
          </ul>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Security
          </SectionTitle>
          <Typography variant="body1" paragraph>
            We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have implemented suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
          </Typography>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Cookies
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Our website uses cookies to enhance your experience. Cookies help us analyze web traffic and identify which pages are being used. This helps us improve our website to better meet customer needs.
          </Typography>
          <Typography variant="body1" paragraph>
            You can choose to accept or decline cookies through your browser settings. Declining cookies may prevent you from taking full advantage of the website.
          </Typography>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Links to Other Websites
          </SectionTitle>
          <Typography variant="body1" paragraph>
            Our website may contain links to other websites of interest. However, once you leave our site, we have no control over that other website. We cannot be responsible for the protection and privacy of any information you provide on external sites.
          </Typography>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Controlling Your Personal Information
          </SectionTitle>
          <Typography variant="body1" paragraph>
            You may choose to restrict the collection or use of your personal information:
          </Typography>
          <ul>
            <li><Typography variant="body1">Opt-out of marketing communications by unchecking relevant boxes on our forms</Typography></li>
            <li><Typography variant="body1">Change your marketing preferences by emailing us at booking@samsaraadventures.com</Typography></li>
          </ul>
          <Typography variant="body1" paragraph>
            We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.
          </Typography>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <SectionTitle variant="h5" gutterBottom>
            Contact Us
          </SectionTitle>
          <Typography variant="body1" paragraph>
            If you have any questions about this privacy policy or your personal information:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Samsara Adventures</strong><br />
            📞 Call Us: +91-7899754028<br />
            📩 Email: booking@samsaraadventures.com<br />
            🌐 Website: www.samsaraadventures.com
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this policy periodically. Please check this page for the latest version.
          </Typography>
        </CardContent>
      </StyledCard>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;