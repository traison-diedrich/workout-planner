import { AlternateEmail } from '@mui/icons-material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import {
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
import Set from './Set';

const sets = [
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
	// marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const Exercise = ({ exercise, onDelete }) => {
	const [expanded, setExpanded] = useState(false);
	const [editing, setEditing] = useState(false);

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
				<NumberBox
					title='SETS'
					number={exercise.sets}
					editing={editing}
				/>
				<CloseIcon
					fontSize='large'
					sx={{ mb: 4 }}
				/>
				<NumberBox
					title='REPS'
					number={exercise.reps}
					editing={editing}
				/>
				<AlternateEmail
					fontSize='large'
					sx={{ mb: 4 }}
				/>
				<NumberBox
					title='LBS'
					number={exercise.weight}
					editing={editing}
				/>
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
					{sets.map((set, index) => (
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
