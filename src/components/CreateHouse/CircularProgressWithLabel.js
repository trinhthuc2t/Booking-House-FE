import React from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";

const CircularProgressWithLabel = (props) => {
    return (
        <Box sx={{
            position: 'absolute',
            display: 'inline-flex',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color='white'>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;