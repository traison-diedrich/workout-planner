import { Box, Divider, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

const ValueText = styled(Typography)({
	fontSize: '1.2rem', // Adjust the font size as desired
	textAlign: 'center', // Adjust the text alignment as desired
});

const NumberBox = ({ title, number, editing }) => {
	const [newNumber, setNewNumber] = useState(number);

	return (
		<Box
			sx={{
				display: 'grid',
				border: '2px solid',
				borderColor: 'primary.main',
				borderRadius: '2px',
				p: 1,
				mx: 2,
			}}>
			{editing ? (
				<TextField
					label=''
					variant='standard'
					value={newNumber}
					onChange={(e) => setNewNumber(e.target.value)}
					sizes='medium'
					InputProps={{
						inputProps: { type: 'number', min: 1, max: 99 },
					}}
				/>
			) : (
				<Typography
					variant='h3'
					align='center'>
					{newNumber}
				</Typography>
			)}
			<Divider />
			<Typography
				variant='caption'
				align='center'
				sx={{ pt: 1 }}>
				{title}
			</Typography>
		</Box>
	);
};

export default NumberBox;
