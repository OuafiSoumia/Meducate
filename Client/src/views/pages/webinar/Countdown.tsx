import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    
      useEffect(() => {
        const targetDate = '2023-06-01';
        const targetTime = '12:00:00';
        const targetDateTime = new Date(`${targetDate}T${targetTime}`).getTime();
        
        const updateTimer = () => {
          const currentTime = new Date().getTime();
          const timeDiff = targetDateTime - currentTime;
    
          if (timeDiff <= 0) {
            setTimeRemaining({
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
          } else {
            let remainingTime = timeDiff;
    
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            remainingTime -= days * (1000 * 60 * 60 * 24);
    
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            remainingTime -= hours * (1000 * 60 * 60);
    
            const minutes = Math.floor(remainingTime / (1000 * 60));
            remainingTime -= minutes * (1000 * 60);
    
            const seconds = Math.floor(remainingTime / 1000);
    
            setTimeRemaining({
              days,
              hours,
              minutes,
              seconds,
            });
          }
        };
    
        // Update the timer every second
        const timerId = setInterval(updateTimer, 1000);
    
        // Cleanup the interval when the component is unmounted
        return () => clearInterval(timerId);
      }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                width="80%"
                sx={{
                    border: '3px solid white',
                    borderRadius: '4px',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Grid item xs={2}>
                    <Typography variant="h5" align="center" color='white'>
                    {timeRemaining.days}
                    </Typography>
                    <Typography variant="h6" align="center" color='white'>
                    {timeRemaining.days === 1 ? ' day' : ' days'}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h5" align="center" color='white'>
                    :
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" align="center" color='white'>
                    {timeRemaining.hours}
                    </Typography>
                    <Typography variant="h6" align="center" color='white'>
                    {timeRemaining.hours === 1 ? ' hour' : ' hours'}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h5" align="center" color='white'>
                    :
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" align="center" color='white'>
                    {timeRemaining.minutes}
                    </Typography>
                    <Typography variant="h6" align="center" color='white'>
                    {timeRemaining.minutes === 1 ? ' minute' : ' minutes'}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h5" align="center" color='white'>
                    :
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" align="center" color='white'>
                    {timeRemaining.seconds}
                    </Typography>
                    <Typography variant="h6" align="center" color='white'>
                    {timeRemaining.seconds === 1 ? ' second' : ' seconds'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>

    
  );
};


export default Timer;