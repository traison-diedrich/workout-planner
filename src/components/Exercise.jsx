import CloseIcon from '@mui/icons-material/Close';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { Card, CardActions, CardContent, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import EditableNumberBox from './EditableNumberBox';
import ExerciseHeader from './ExerciseHeader';
import NumberBox from './NumberBox';

// const ExpandMore = styled((props) => {
// 	const { expand, ...other } = props;
// 	return <IconButton {...other} />;
// })(({ theme, expand }) => ({
// 	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
// 	transition: theme.transitions.create('transform', {
// 		duration: theme.transitions.duration.shortest,
// 	}),
// }));

/**
 * TODO: way too many components and way too much logic being handled here.
 * Separate Exercise into Exercise, ExerciseSelector (Autocomplete), and
 * ExerciseForm... maybe even button edit grouping
 */

const Exercise = ({ exercise, onUpdate, onDelete, options }) => {
	const [expanded, setExpanded] = useState(false);
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(exercise.name);
	const [sets, setSets] = useState(exercise.sets);
	const [reps, setReps] = useState(exercise.reps);

	const onEdit = (number, setNumber) => {
		setNumber(number);
	};

	const onSubmit = async () => {
		const updatedExercise = {
			id: exercise.id,
			name: name,
			sets: sets,
			reps: reps,
		};

		if (sets === 0 || reps === 0) {
			return false;
		}

		if (
			updatedExercise.name === exercise.name &&
			updatedExercise.sets === exercise.sets &&
			updatedExercise.reps === exercise.reps
		) {
			return true;
		}

		await onUpdate(updatedExercise);
		return true;
	};

	return (
		<Card sx={{ minWidth: 270, maxWidth: 400, minHeight: 200 }}>
			<ExerciseHeader
				editing={editing}
				setEditing={setEditing}
				options={options}
				name={name}
				setName={setName}
				onDelete={() => onDelete(exercise.id)}
				onSubmit={onSubmit}
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
					</>
				) : (
					<>
						<NumberBox title='SETS' number={exercise.sets} />
						<CloseIcon fontSize='large' sx={{ mb: 4 }} />
						<NumberBox title='REPS' number={exercise.reps} />
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
