import './App.css';
import { Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InitialForm from './InitialForm';
import GermanVisaForm from './GermanVisaForm';
import FormsStepper from './FormsStepper';

const useStyle = makeStyles({
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#009dc4',
    backgroundPosition: 'center',
    backgroundRepeat: 'space',
    background: `url('${process.env.PUBLIC_URL}/background_colored.png')`
  },
  card: {
    width: '50rem',
    padding: '0.5rem'
  },
  input: {
    margin: '0.5rem',
    width: '100%'
  },
  title: {
    margin: '0rem 0.25rem !important'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const steps = [{
  title: 'Fill initial data',
  component: <InitialForm />
}, {
  title: 'Fill visa form',
  component: <GermanVisaForm />
}, {
  title: 'Something else',
  component: 'Something else?'
}];

function App() {
  const classes = useStyle();
  return (
    <div className={classes.appContainer}>
      <Card className={classes.card}>
        <FormsStepper steps={steps} />
      </Card>
    </div>
  );
}

export default App;
