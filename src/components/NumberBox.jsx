import { Box, Divider, Typography } from '@mui/material';

const NumberBox = ({ title, number }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				border: '2px solid',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
				borderColor: 'primary.main',
				borderRadius: '3px',
				px: 1,
				mx: 1,
			}}>
			<Typography variant='h3' align='center'>
				{number}
			</Typography>
			<Divider style={{ width: '80%' }} />
			<Typography variant='caption' align='center' sx={{ py: 0.5 }}>
				{title}
			</Typography>
		</Box>
	);
};

export default NumberBox;
