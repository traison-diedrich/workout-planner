import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';

const Stepper = ({ increment, decrement }) => {
	return (
		<ButtonGroup
			orientation='horizontal'
			variant='contained'
			size='small'
			sx={{ mt: 1 }}>
			<Button onClick={decrement} style={{ padding: '2px 2px' }}>
				<RemoveIcon sx={{ color: 'text.primary' }} />
			</Button>
			<Button onClick={increment} style={{ padding: '2px 2px' }}>
				<AddIcon sx={{ color: 'text.primary' }} />
			</Button>
		</ButtonGroup>
	);
};

export default Stepper;
