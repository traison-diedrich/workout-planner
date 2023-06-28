import { AlternateEmail } from '@mui/icons-material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import {
	Autocomplete,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import EditableNumberBox from './EditableNumberBox';
import NumberBox from './NumberBox';
import Set from './Set';

// const tempSets = [
// 	{
// 		id: 1,
// 		reps: 10,
// 		weight: 100,
// 	},
// 	{
// 		id: 2,
// 		reps: 8,
// 		weight: 150,
// 	},
// ];

const exerciseOptions = [
	{ label: 'Bench Press' },
	{ label: 'Squat' },
	{ label: 'Deadlift' },
	{ label: 'Barbell Row' },
	{ label: 'Overhead Press' },
	{ label: 'Pull-ups' },
	{ label: 'Dips' },
	{ label: 'Lunges' },
	{ label: 'Chest Fly' },
	{ label: 'Shoulder Press' },
	{ label: 'Tricep Pushdown' },
	{ label: 'Bicep Curls' },
	{ label: 'Leg Press' },
	{ label: 'Romanian Deadlift' },
	{ label: 'Lat Pulldown' },
	{ label: 'Arnold Press' },
	{ label: 'Incline Bench Press' },
	{ label: 'Hamstring Curl' },
	{ label: 'Calf Raise' },
	{ label: 'Front Squat' },
	{ label: 'Push-ups' },
	{ label: 'Seated Cable Row' },
	{ label: 'Skull Crushers' },
	{ label: 'Barbell Curl' },
	{ label: 'Leg Extension' },
	{ label: 'Hammer Curl' },
	{ label: 'Step-ups' },
	{ label: 'Cable Fly' },
	{ label: 'Lateral Raise' },
	{ label: 'Plank' },
];

// const ExpandMore = styled((props) => {
// 	const { expand, ...other } = props;
// 	return <IconButton {...other} />;
// })(({ theme, expand }) => ({
// 	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
// 	transition: theme.transitions.create('transform', {
// 		duration: theme.transitions.duration.shortest,
// 	}),
// }));

const Exercise = ({ exercise, onUpdate, onDelete }) => {
	const [expanded, setExpanded] = useState(false);
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(exercise.name);
	const [sets, setSets] = useState(exercise.sets);
	const [reps, setReps] = useState(exercise.reps);
	const [weight, setWeight] = useState(exercise.weight);

	const onEdit = (number, setNumber) => {
		setNumber(number);
	};

	const onSubmit = async (e) => {
		const updatedExercise = {
			id: exercise.id,
			name: name,
			sets: sets,
			reps: reps,
			weight: weight,
		};

		if (
			updatedExercise.name === exercise.name &&
			updatedExercise.sets === exercise.sets &&
			updatedExercise.reps === exercise.reps &&
			updatedExercise.weight === exercise.weight
		) {
			return;
		}

		await onUpdate(updatedExercise);
	};

	return (
		<Card sx={{ my: 2 }}>
			<CardHeader
				title={
					editing ? (
						<Autocomplete
							options={exerciseOptions}
							defaultValue={name}
							renderInput={(params) => (
								<TextField
									{...params}
									variant='standard'
									sx={{
										'& input': {
											fontSize: '1.5rem',
											padding: '0px',
											margin: '0px',
										},
										'& .MuiInputBase-root': {
											width: `200px`,
											height: '48px',
										},
									}}
								/>
							)}
							sx={{ mr: 4, ml: 1 }}
							onChange={(event, value) => {
								if (value) {
									setName(value.label);
								}
							}}
						/>
					) : (
						<Typography variant='h5' sx={{ ml: 1 }}>
							{exercise.name}
						</Typography>
					)
				}
				action={
					<>
						{editing ? (
							<IconButton
								onClick={async (e) => {
									await onSubmit();
									setEditing(!editing);
								}}>
								<CheckCircleOutlinedIcon color='success' />
							</IconButton>
						) : (
							<IconButton onClick={() => setEditing(!editing)}>
								<EditOutlinedIcon color='secondary' />
							</IconButton>
						)}
						<IconButton
							onClick={() => {
								onDelete(exercise.id);
							}}>
							<DeleteOutlinedIcon color='secondary' />
						</IconButton>
					</>
				}
			/>
			<CardContent
				sx={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
				}}>
				{editing ? (
					<>
						<EditableNumberBox
							title='SETS'
							number={sets}
							borderColor={sets === 0 ? 'error.main' : 'primary.main'}
							onEdit={onEdit}
							setNumber={setSets}
							min={0}
							max={100}
							step={1}
						/>
						<CloseIcon fontSize='large' sx={{ mb: 8 }} />
						<EditableNumberBox
							title='REPS'
							number={reps}
							borderColor={reps === 0 ? 'error.main' : 'primary.main'}
							onEdit={onEdit}
							setNumber={setReps}
							min={0}
							max={100}
							step={1}
						/>
						<AlternateEmail fontSize='large' sx={{ mb: 8 }} />
						<EditableNumberBox
							title='LBS'
							number={weight}
							borderColor={weight === 0 ? 'error.main' : 'primary.main'}
							onEdit={onEdit}
							setNumber={setWeight}
							min={0}
							max={999}
							step={5}
						/>
					</>
				) : (
					<>
						<NumberBox title='SETS' number={exercise.sets} />
						<CloseIcon fontSize='large' sx={{ mb: 4 }} />
						<NumberBox title='REPS' number={exercise.reps} />
						<AlternateEmail fontSize='large' sx={{ mb: 4 }} />
						<NumberBox title='WEIGHT' number={exercise.weight} />
					</>
				)}
			</CardContent>
			{/* <CardActions
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
					<ExpandCircleDownOutlinedIcon
						color='secondary'
						variant='outlined'
						fontSize='large'
					/>
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					{tempSets.map((set, index) => (
						<Set key={index} index={index} set={set} />
					))}
				</CardContent>
			</Collapse> */}
		</Card>
	);
};

export default Exercise;
