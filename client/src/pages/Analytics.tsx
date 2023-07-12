import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Analytics: React.FunctionComponent = () => {
  // Sample data for cards
  const cards = [
    { id: 1, title: 'Card 1', content: 'Some content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Some content for Card 2' },
    { id: 3, title: 'Card 3', content: 'Some content for Card 3' },
    { id: 4, title: 'Card 4', content: 'Some content for Card 4' },
    // Add more card data objects as needed
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="body1">{card.content}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Analytics
