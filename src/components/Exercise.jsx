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
import EditableNumberBox from './EditableNumberBox';
import NumberBox from './NumberBox';
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

	const onEdit = (number, setNumber) => {
		setNumber(number);
	};

	const validInputs = () => {
		if (sets === 0 || reps === 0 || weight === 0) {
			return false;
		} else {
			return true;
		}
	};

	return (
		<Card sx={{ my: 2 }}>
			<CardHeader
				title={exercise.name}
				action={
					<>
						{editing ? (
							<IconButton
								onClick={() => {
									if (validInputs()) {
										setEditing(!editing);
									}
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
				{editing ? (
					<EditableNumberBox
						title='SETS'
						number={sets}
						borderColor={sets === 0 ? 'error.main' : 'primary.main'}
						editing={editing}
						onEdit={onEdit}
						setNumber={setSets}
						min={0}
						max={100}
						step={1}
					/>
				) : (
					<NumberBox title='SETS' number={sets} />
				)}
				<CloseIcon fontSize='large' sx={{ mb: editing ? 8 : 4 }} />
				{editing ? (
					<EditableNumberBox
						title='REPS'
						number={reps}
						borderColor={reps === 0 ? 'error.main' : 'primary.main'}
						editing={editing}
						onEdit={onEdit}
						setNumber={setReps}
						min={0}
						max={999}
						step={1}
					/>
				) : (
					<NumberBox title='REPS' number={reps} />
				)}
				<AlternateEmail fontSize='large' sx={{ mb: editing ? 8 : 4 }} />
				{editing ? (
					<EditableNumberBox
						title='LBS'
						number={weight}
						borderColor={weight === 0 ? 'error.main' : 'primary.main'}
						editing={editing}
						onEdit={onEdit}
						setNumber={setWeight}
						min={0}
						max={9999}
						step={5}
					/>
				) : (
					<NumberBox title='LBS' number={weight} />
				)}
			</CardContent>
			<CardActions
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
			</Collapse>
		</Card>
	);
};

export default Exercise;
