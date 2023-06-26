import AddIcon from '@mui/icons-material/Add';
import { Card, Container, Divider, Fab } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import Exercise from './components/Exercise';

function App() {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#7CA5B8',
			},
			secondary: {
				main: '#EC7357',
			},
			background: {
				default: '#1C2122',
				paper: '#1C2122',
			},
			text: {
				primary: '#FFEEDD',
			},
			error: {
				main: '#D81E5B',
			},
			success: {
				main: '#7A8450',
			},
			warning: {
				main: '#F6F740',
			},
		},
		typography: {
			fontFamily: 'Montserrat',
		},
	});

	const [exercises, setExercises] = useState([
		{
			id: 1,
			name: 'Incline Dumbbell Press',
			sets: 3,
			reps: 10,
			weight: 50,
		},
		{
			id: 2,
			name: 'Pec Deck Fly',
			sets: 2,
			reps: 12,
			weight: 80,
		},
		{
			id: 3,
			name: 'Dips',
			sets: 3,
			reps: 10,
			weight: 50,
		},
	]);

	const addExercise = () => {
		const newExercise = {
			id: exercises.length + 1,
			name: 'New Exercise',
			sets: 3,
			reps: 10,
			weight: 75,
		};

		setExercises([...exercises, newExercise]);
	};

	const deleteExercise = (id) => {
		setExercises(exercises.filter((exercise) => exercise.id !== id));
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				sx={{
					backgroundColor: 'background.default',
					minWidth: '100%',
					minHeight: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}>
				<Typography variant='h2' color='textPrimary' sx={{ mt: 3 }}>
					Workout Planner
				</Typography>
				<Container
					sx={{
						width: 7 / 8,
						my: 3,
						border: 2,
						borderRadius: 2,
						borderColor: 'primary.main',
						backgroundColor: 'background.default',
						minWidth: 403,
						maxWidth: 604,
					}}>
					<Typography
						variant='h3'
						color='textPrimary'
						align='center'
						sx={{ mt: 1 }}>
						Push Day
					</Typography>
					<Divider sx={{ bgcolor: 'primary.main', mx: 14, mt: 1 }} />
					{exercises.map((exercise, index) => (
						<Exercise
							key={index}
							exercise={exercise}
							onDelete={deleteExercise}
						/>
					))}
					<Card
						sx={{
							my: 2,
							justifyContent: 'center',
							alignItems: 'center',
							display: 'flex',
						}}>
						<Fab
							color='primary'
							aria-label='add'
							sx={{ m: 4 }}
							onClick={() => addExercise()}>
							<AddIcon />
						</Fab>
					</Card>
				</Container>
			</Container>
		</ThemeProvider>
	);
}

export default App;
