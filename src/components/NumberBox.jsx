import { Box, Divider, TextField, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * TODO: More functionality being handled than I would like by the number box.
 * Separate into read only number box and an editableNumber box and then combine
 * error handling into editable section.
 */

const NumberBox = ({ title, number, setNumber, editing, onEdit, min, max }) => {
	const [error, setError] = useState(false);

	const handleEdit = (e) => {
		const { value } = e.target;
		const parsedValue = Number(value);

		if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {
			setError(false);
			onEdit(parsedValue, setNumber);
		} else {
			setError(true);
			onEdit(1, setNumber);
		}
	};

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
				minWidth: '107px',
				maxWidth: '164px',
			}}>
			{editing ? (
				<TextField
					value={number}
					variant='standard'
					onChange={handleEdit}
					error={error}
					helperText={error ? `Must be ${min}-${max}` : ''}
					sx={{
						p: -8,
						'& input': {
							fontSize: '3.0rem',
							textAlign: 'center',
						},
						'& .MuiFormHelperText-root': {
							textAlign: 'center',
						},
					}}
				/>
			) : (
				<Typography variant='h3' align='center'>
					{number}
				</Typography>
			)}
			{/* FIXME: Divider is not rendering */}
			{!editing && <Divider />}
			<Typography variant='caption' align='center' sx={{ pt: 1 }}>
				{title}
			</Typography>
		</Box>
	);
};

export default NumberBox;
