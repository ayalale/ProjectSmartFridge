import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThreePIcon from '@mui/icons-material/ThreeP';


import smartFridgeImage from './ello-AEU9UZstCfs-unsplash.jpg';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardMedia
          component="img"
          height="450"
          image={smartFridgeImage}
          alt="Smart Fridge Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            Welcome to Smart Fridge
          </Typography>
          <Typography variant="body2" color="text.secondary">
            שליטה מרחוק וניהול נתונים של מקרר חכם לחיים קלים ואקולוגיים
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button component={Link} to="/register" size="small" variant="contained">Go to Register</Button>
          <Button component={Link} to="/login" size="small" color="primary" style={{ marginLeft: '10px' }} variant="contained">Login</Button>
       </CardActions>
       <CardActions style={{ justifyContent: 'center', marginTop: '10px' }}>
          <Button component={Link} to="/Chat" size="small" color="primary" variant="outlined" sx={{ borderRadius: '50px' }}>
            <ThreePIcon style={{ marginRight: '5px' }} />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default Home;