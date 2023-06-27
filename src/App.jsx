import AddIcon from '@mui/icons-material/Add';
import { Card, Container, Divider, Fab } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
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

	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		const getExercises = async () => {
			const exercisesFromServer = await fetchExercises();
			setExercises(exercisesFromServer);
		};

		getExercises();
	}, []);

	const fetchExercises = async () => {
		const res = await fetch('http://localhost:5000/exercises');
		const data = await res.json();

		return data;
	};

	const fetchExercise = async (id) => {
		const res = await fetch('http://localhost:5000/exercises/${id}');
		const data = await res.json();

		return data;
	};

	const createExercise = async () => {
		const newExercise = {
			name: 'New Exercise',
			sets: 3,
			reps: 10,
			weight: 75,
		};

		const res = await fetch('http://localhost:5000/exercises', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newExercise),
		});

		const data = await res.json();

		setExercises([...exercises, data]);
	};

	const updateExercise = async (updatedExercise) => {
		const res = await fetch(
			`http://localhost:5000/exercises/${updatedExercise.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedExercise),
			}
		);

		res.status === 200
			? setExercises(
					exercises.map((exercise) =>
						exercise.id === updatedExercise.id ? updatedExercise : exercise
					)
			  )
			: alert('Error updating the task');
	};

	const deleteExercise = async (id) => {
		const res = await fetch(`http://localhost:5000/exercises/${id}`, {
			method: 'DELETE',
		});

		res.status === 200
			? setExercises(exercises.filter((exercise) => exercise.id !== id))
			: alert('Error Deleting This Task');
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
							onUpdate={updateExercise}
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
							onClick={() => createExercise()}>
							<AddIcon />
						</Fab>
					</Card>
				</Container>
			</Container>
		</ThemeProvider>
	);
}

export default App;
