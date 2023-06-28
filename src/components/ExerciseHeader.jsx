import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
	Autocomplete,
	CardHeader,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ExerciseHeader = ({
	editing,
	setEditing,
	options,
	name,
	setName,
	onDelete,
	onSubmit,
}) => {
	const getTextWidth = (text, fontSize) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		const theme = useTheme();
		const font = theme.typography.fontFamily;

		context.font = `${fontSize} ${font}`;
		const { width } = context.measureText(text);

		return Math.ceil(width);
	};

	/**
	 * TODO: Separate Autocomplete from here to be exercise selector
	 * plan to refactor later for much more expansive ui to select an exercise
	 */

	return (
		<CardHeader
			title={
				editing ? (
					<Autocomplete
						options={options}
						value={options.find((option) => option.label === name)}
						renderInput={(params) => (
							<TextField
								{...params}
								variant='standard'
								size='small'
								multiline
								maxRows={3}
								sx={{
									'& .MuiInputBase-root': {
										width: `${Math.min(
											getTextWidth(name, '1.5rem') + 60,
											155
										)}px`,
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
					<Typography variant='h6' sx={{ mx: 1 }}>
						{name}
					</Typography>
				)
			}
			action={
				<>
					{editing ? (
						<IconButton
							onClick={async () => {
								const res = await onSubmit();
								if (res) {
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
					<IconButton onClick={onDelete}>
						<DeleteOutlinedIcon color='secondary' />
					</IconButton>
				</>
			}
		/>
	);
};

export default ExerciseHeader;
