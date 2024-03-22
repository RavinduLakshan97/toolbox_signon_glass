import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DrawIcon from '@mui/icons-material/Draw';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
  transform: ownerState.active ? 'scale(1.5)' : 'scale(1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  ...(ownerState.active && {
    boxShadow: '0 6px 15px rgba(0,0,0,0.3)', 
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AdminPanelSettingsIcon />,
    2: <AdminPanelSettingsIcon />,
    3: <AdminPanelSettingsIcon />,
    4: <InsertCommentIcon />,
    5: <DrawIcon />,
    6: <AssignmentTurnedInIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
    {/* Adjust the icon's position when active */}
    <div style={{ transform: active ? 'translateY(-10%)' : 'translateY(0)' }}>
      {icons[String(props.icon)]}
    </div>
  </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};



export default function CustomizedSteppers( props) {


    const handleChange = (stepIndex) => {
      console.log('Step clicked:', stepIndex);
      console.log(`Current active step before change: ${activeStep}`);
      // Call the onStepClick function passed from the parent component with the new step index
      props.onStepClick(stepIndex);
    };

  const { value: activeStep, onStepClick } = props;  
  const isMobile = useMediaQuery('(max-width:600px)');
  



  const getStepsToShow = (activeStep, steps) => {
    if (activeStep === 0) {
      // At the start, the first step is current, and there's no previous step.
      return [activeStep, activeStep + 1, activeStep + 2];
    } else if (activeStep === steps.length - 1) {
      // At the end, the last step is current, and there's no next step.
      return [activeStep - 2, activeStep - 1, activeStep];
    } else {
      // In the middle, show the previous, current, and next steps.
      return [activeStep - 1, activeStep, activeStep + 1];
    }
  };



  const steps = ['Safe and Skill 1', 'Safe and Skill 2', 'Safe and Skill 3', 'Comment', 'Sign On Glass', 'Complete']; 

  const stepsToShow = isMobile ? getStepsToShow(activeStep, steps) : steps.map((_, idx) => idx);

  
  if (isMobile) {
    stepsToShow.forEach((stepIndex, index) => {
      console.log(`Step ${stepIndex}: Active: ${stepIndex === activeStep}, Completed: ${stepIndex < activeStep}`);
    });
    return (
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} sx={{ flexDirection: 'row', justifyContent: 'center' }}>
        {stepsToShow.map((stepIndex, index) => (
          <Step key={stepIndex} onClick={() => handleChange(stepIndex)}>
            <StepLabel StepIconComponent={() => 
              <ColorlibStepIcon
                active={
                  (activeStep === 0 && index === 0) || // First icon is active on the first page
                  (activeStep === steps.length - 1 && index === stepsToShow.length - 1) || // Last icon is active on the last page
                  (activeStep > 0 && activeStep < steps.length - 1 && index === 1) // Middle icon is active on all other pages
                }
                completed={stepIndex < activeStep} // All steps before the current step are marked as completed
                icon={stepIndex + 1}
              />
            }>
              {/* Here we render the label text */}
              <Typography variant="caption" display="block" gutterBottom>
                  {steps[stepIndex]}
                </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  } else {
    // Desktop rendering logic (as it was)
    return (
      <Stack sx={{ width: '100%' }} spacing={4} direction="row" alignItems="center" justifyContent="center">
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} sx={{ flexDirection: 'row' }}>
          {steps.map((label, index) => (
            <Step key={label} onClick={() => onStepClick(index)}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    );
  }
}

CustomizedSteppers.propTypes = {
  value: PropTypes.number.isRequired,
  onStepClick: PropTypes.func.isRequired,
};