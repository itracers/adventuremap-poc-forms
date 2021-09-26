import { FormControl, TextField, Typography, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

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
    width: '50rem'
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

const citizenshipCountries = [
  { label: 'Poland', value: 'PL' },
  { label: 'Lithuania', value: 'LI' },
  { label: 'Ukraine', value: 'UK' },
  { label: 'Russia', value: 'RU' },
  { label: 'Belarus', value: 'BY' },
]

const destinationCountries = [
  { label: 'Poland', value: 'PL' },
  { label: 'Lithuania', value: 'LI' },
  { label: 'Ukraine', value: 'UK' },
  { label: 'Belarus', value: 'BY' },
  { label: 'Italy', value: 'IT' }
]

const reasons = [
  { label: 'Tourism', value: 1 },
  { label: 'Relocation', value: 2 },
  { label: 'Work', value: 3 },
  { label: 'Business trip', value: 4 }
]

const terms = [
  { label: 'Short (< 1 month)', value: 1 },
  { label: 'Middle (about 2 months)', value: 2 },
  { label: 'Long (from half of year to several years)', value: 3 },
  { label: 'Permanent relocation', value: 4 }
]

export default function InitialForm() {
  const classes = useStyle();

  return <FormControl className={classes.form}>
    <Typography className={classes.title} variant="h2">Choose where to go</Typography>
    <br />
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '87ch' },
      }}

    >
      <div>
        <Autocomplete
          disablePortal
          options={citizenshipCountries}
          renderInput={(params) => <TextField {...params} label="Citizenship country" />}
        />
      </div>
      <div>
        <Autocomplete
          disablePortal
          options={destinationCountries}
          renderInput={(params) => <TextField {...params} label="Destination country" />}
        />
      </div>
    </Box>
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '87ch' },
      }}
    >
      <div>
        <Autocomplete
          disablePortal
          options={reasons}
          renderInput={(params) => <TextField {...params} label="Reason" />}
        />
      </div>
      <div>
        <Autocomplete
          fullWidth
          disablePortal
          options={terms}
          renderInput={(params) => <TextField {...params} label="Term" />}
        />
      </div>
    </Box>
  </FormControl>
}