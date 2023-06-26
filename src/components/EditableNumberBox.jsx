import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import NumberStepper from './NumberStepper';

/**
 * For most use cases, min should be set to 0. min = 1 will
 * prevent user from backspacing their input completely
 */
const EditableNumberBox = ({
	title,
	number,
	borderColor,
	setNumber,
	onEdit,
	min,
	max,
	step,
}) => {
	const [error, setError] = useState(false);

	const getNumDigits = (num) => {
		return Math.max(Math.floor(Math.log10(Math.abs(num))) + 1, 1);
	};

	const [numDigits, setNumDigits] = useState(getNumDigits(number));

	const handleEdit = (e) => {
		const { value } = e.target;
		const parsedValue = Number(value);

		validateNumber(parsedValue);
	};

	const validateNumber = (num) => {
		if (!isNaN(num) && num >= min && num <= max) {
			setError(false);
			setNumDigits(getNumDigits(num));
			onEdit(num, setNumber);
		} else {
			setError(true);
		}
	};

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					border: '2px solid',
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
					borderColor: borderColor,
					borderRadius: '3px',
					px: 1,
					mx: 1,
				}}>
				<TextField
					value={number}
					variant='standard'
					onChange={handleEdit}
					error={error}
					// min+1 here to accommodate backspacing
					helperText={error ? `${min + 1}-${max}` : ''}
					sx={{
						'& input': {
							fontSize: '3.0rem',
							textAlign: 'center',
							padding: '0px',
							margin: '0px',
						},
						'& .MuiFormHelperText-root': {
							textAlign: 'center',
						},
						'& .MuiInputBase-root': {
							width: `${32 * numDigits}px`,
							height: '64px',
						},
					}}
				/>
				<Typography variant='caption' align='center' sx={{ py: 0.5 }}>
					{title}
				</Typography>
			</Box>
			<NumberStepper
				increment={() => validateNumber(number + step)}
				decrement={() => validateNumber(number - step)}
			/>
		</Box>
	);
};

export default EditableNumberBox;
