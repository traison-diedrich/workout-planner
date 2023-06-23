import { Box, Divider, TextField, Typography } from '@mui/material';

const NumberBox = ({ title, number, editing }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				border: '2px solid',
				borderColor: 'primary.main',
				borderRadius: '3px',
				p: 1,
				mx: 2,
			}}>
			{editing ? (
				<TextField
					value={number}
					variant='standard'
					onChange={(e) => {
						number = e.target.value;
					}}
					sx={{
						'p': -8,
						'& input': {
							fontSize: '3.0rem',
							textAlign: 'center',
						},
					}}
				/>
			) : (
				<Typography
					variant='h3'
					align='center'>
					{number}
				</Typography>
			)}
			{/* TODO: figure out why divider is not rendering */}
			{!editing && <Divider />}
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
