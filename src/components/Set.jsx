import { AlternateEmail } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';
import NumberBox from './NumberBox';

const Set = ({ set, index }) => {
	return (
		<Card
			variant='outlined'
			sx={{ mb: 1 }}>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Typography
					variant='h5'
					sx={{ mb: 8, mr: 3 }}>{`Set ${index + 1}`}</Typography>
				<NumberBox
					title='REPS'
					number={set.reps}
				/>
				<AlternateEmail
					fontSize='large'
					sx={{ mb: 4 }}
				/>
				<NumberBox
					title='LBS'
					number={set.weight}
				/>
			</CardContent>
		</Card>
	);
};

export default Set;
