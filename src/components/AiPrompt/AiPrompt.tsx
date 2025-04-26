import { Key, useState } from 'react';
import { TextField, Button, Box, InputAdornment, Alert, Typography, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { MarkdownBlock } from '../Markdown';
import { AppDispatch } from '../../redux/store';
import { selectActiveHistoryId, selectChatMessages, selectLoading } from '../../redux/slices/AI/AiSlice';
import { fetchChatResponse } from '../../redux/slices/AI/AiApiSlice';

const AiPromptGenerator = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const messages = useSelector(selectChatMessages);
  const activeHistoryId = useSelector(selectActiveHistoryId);

  const handleSendMessage = () => {
    if (!input.trim()) {
      setError('Please enter some input.');
      return;
    }
    setError('');
    dispatch(fetchChatResponse({ newMessageId: uuidv4(), userMessage: input, aiType: "CHATGPT", historyId: activeHistoryId || "" ,promptType:"TEXT"}));
    setInput('');

  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ margin: 'auto', paddingTop:"20px" }}>
     
          <Box>
            {messages.length>0 && messages.map((message: { image?: string, role: string; content: any; }, index: Key | null | undefined) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', margin: '1px 0', textAlign: message.role === 'user' ? 'right' : 'left' }}>
                {message.role === 'user' ? (
                  <Avatar sx={{ marginLeft: 'auto', marginRight: '8px',width:"26px",height:"30px"}}>ME</Avatar>
                ) : (
                  <Avatar sx={{ marginRight: '8px',width:"26px",height:"30px"}}>AI</Avatar>
                )}
                <Box sx={{ wordWrap: 'break-word', padding: '2px', borderRadius: '20px', boxShadow: message.role === 'user' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none' }}>
                  <MarkdownBlock code={message.content} />
                  {message.image &&
                    <>
                      <Typography variant='h5'>
                        Content Image
                      </Typography>
                      <img
                        src={message.image}
                        alt="Content"
                        style={{ maxWidth: '50%', borderRadius: '10px' }}
                      />
                    </>
                  }
                </Box>
              </Box>
            ))}

          </Box>
          {loading && (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              Loading response...
            </Typography>
          )}

      <Box sx={{ mt: 2, display: 'flex' }}>
        <TextField
          variant="outlined"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSendMessage}>
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default AiPromptGenerator;