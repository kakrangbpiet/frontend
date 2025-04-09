import { useState } from "react";
import { Box, Paper, Alert, Typography, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import TextTab from "./ReplyTab";
import { selectChatMessages } from "../../redux/slices/AI/AiSlice";

const AiPromptGenerator = () => {
  const [tabValue, setTabValue] = useState("");

  const messages = useSelector(selectChatMessages);

  return (
    <Box sx={{ margin: "auto", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ overflowY: "auto", padding: "20px", borderRadius: "8px", height: "70vh" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Chat with AI
        </Typography>

        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label={"TEXT"} value={"TEXT"} />
        </Tabs>

        {tabValue ==="TEXT" && <TextTab messages={messages} />}

      </Paper>


    </Box>
  );
};

export default AiPromptGenerator;