import { AlternateEmail } from '@mui/icons-material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import NumberBox from './NumberBox';
import NumberStepper from './NumberStepper';
import Set from './Set';

const tempSets = [
	{
		id: 1,
		reps: 10,
		weight: 100,
	},
	{
		id: 2,
		reps: 8,
		weight: 150,
	},
];

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const Exercise = ({ exercise, onDelete }) => {
	const [expanded, setExpanded] = useState(false);
	const [editing, setEditing] = useState(false);
	const [sets, setSets] = useState(exercise.sets);
	const [reps, setReps] = useState(exercise.reps);
	const [weight, setWeight] = useState(exercise.weight);

	const increment = (number, setNumber, step) => {
		setNumber((prevState) => prevState + step);
	};

	const decrement = (number, setNumber, step) => {
		setNumber((prevState) => prevState - step);
	};

	return (
		<Card
			sx={{
				my: 2,
			}}>
			<CardHeader
				title={exercise.name}
				action={
					<>
						<IconButton onClick={() => setEditing(!editing)}>
							{editing ? (
								<CheckCircleOutlinedIcon color='success' />
							) : (
								<EditOutlinedIcon color='secondary' />
							)}
						</IconButton>
						<IconButton
							onClick={() => {
								onDelete(exercise.id);
								setEditing(false);
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
				{/* TODO: integrate textfield with number stepper to edit same state */}
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<NumberBox
						title='SETS'
						number={sets}
						editing={editing}
					/>
					{editing && (
						<NumberStepper
							increment={() => increment(sets, setSets, 1)}
							decrement={() => decrement(sets, setSets, 1)}
						/>
					)}
				</Box>
				<CloseIcon
					fontSize='large'
					sx={{ mb: editing ? 8 : 4 }}
				/>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<NumberBox
						title='REPS'
						number={reps}
						editing={editing}
					/>
					{editing && (
						<NumberStepper
							increment={() => increment(reps, setReps, 1)}
							decrement={() => decrement(reps, setReps, 1)}
						/>
					)}
				</Box>
				<AlternateEmail
					fontSize='large'
					sx={{ mb: editing ? 8 : 4 }}
				/>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<NumberBox
						title='LBS'
						number={weight}
						editing={editing}
					/>
					{editing && (
						<NumberStepper
							increment={() => increment(weight, setWeight, 5)}
							decrement={() => decrement(weight, setWeight, 5)}
						/>
					)}
				</Box>
			</CardContent>
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ExpandMore
					expand={expanded}
					onClick={() => setExpanded(!expanded)}>
					<ExpandCircleDownOutlinedIcon
						color='secondary'
						variant='outlined'
						fontSize='large'
					/>
				</ExpandMore>
			</CardActions>
			<Collapse
				in={expanded}
				timeout='auto'
				unmountOnExit>
				<CardContent>
					{tempSets.map((set, index) => (
						<Set
							key={index}
							index={index}
							set={set}
						/>
					))}
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default Exercise;
