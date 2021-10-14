import { FormControl, TextField, Typography, Autocomplete, Button, Checkbox, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import  Select  from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { PDFCheckBox, PDFDocument, PDFTextField } from 'pdf-lib';

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
  },
  uploadPhotoContainer: {
    margin: '0.5rem !important'
  },
  uploadPhotoButton: {
    margin: '0.5rem !important',
    padding: '2rem !important',
    border: 'solid !important'
  }
})

const citizenshipCountries = [
  { label: 'Poland', value: 'PL' },
  { label: 'Lithuania', value: 'LI' },
  { label: 'Ukraine', value: 'UK' },
  { label: 'Russia', value: 'RU' },
  { label: 'Belarus', value: 'BY' },
]

const travelDocuments = [
  { label: 'Passport', value: 'passport' },
  { label: 'International passport', value: 'international_passport' }
]

const insuranceServices = [
  { label: 'Alfa Corporation RU', value: 1 },
  { label: 'Belstrah BY', value: 2 },
  { label: 'AXA Travel PL', value: 3 },
]

const PROOF_OF_ADMISSION = 'Proof of admission at a German education institution';
const PROOF_OF_GERMAN_LANG_PROFIENCY = 'Proof of German language proficiency';
const PROOF_OF_ENGLISH_PROFIENCY = 'Proof of English language proficiency';
const CERTIFICATE_OF_EARLIER_EDUCATION = 'Authenticated certificates of earlier education';
const proofsOfPurpose = [
  { label: 'University admission letter “Zulassungsbescheinigung”', type: PROOF_OF_ADMISSION, value: 1 },
  { label: 'Letter of admission in a foundation course. Issued by a Studienkolleg', type: PROOF_OF_ADMISSION, value: 2 },
  { label: 'Letter of admission in the propaedeutic course', value: 3, type: PROOF_OF_ADMISSION },
  { label: 'Letter of admission in a preparatory German language course', type: PROOF_OF_ADMISSION, value: 4 },
  { label: 'German Language University Entrance Examination for International Applicants (DSH)', value: 5, type: PROOF_OF_GERMAN_LANG_PROFIENCY },
  { label: 'Test of German as a Foreign Language (TestDaF)', value: 6, type: PROOF_OF_GERMAN_LANG_PROFIENCY },
  { label: 'Goethe Institute German Language Diploma (GDS)', value: 7, type: PROOF_OF_GERMAN_LANG_PROFIENCY },
  { label: 'German Language Diploma of the Standing Conference of the Ministers of Education and Cultural Affairs, Level II (DSD)', value: 8, type: PROOF_OF_GERMAN_LANG_PROFIENCY },
  { label: 'Test of English as a Foreign Language (TOEFL). Accepted results are PbT (paper-based test) 550 Points, CbT (computer-based test) 213 Points and IbT (internet-based test) 79-80 Points', value: 9, type: PROOF_OF_ENGLISH_PROFIENCY },
  { label: 'The International English Language Testing System (IELTS). Accepted scores by German universities are 5 – 6.5', value: 10, type: PROOF_OF_ENGLISH_PROFIENCY },
  { label: 'German university entrance qualification “Abitur”. If you’ve studied in a German education provider abroad. (If not, send the following documents)', value: 12, type: CERTIFICATE_OF_EARLIER_EDUCATION },
  { label: 'Recognized foreign academic qualification. It must show you have a qualification equally recognized as the German Abitur', value: 13, type: CERTIFICATE_OF_EARLIER_EDUCATION },
  { label: 'Academic records or transcript', value: 13, type: CERTIFICATE_OF_EARLIER_EDUCATION }
]

const invitationTypes = [
  { label: 'University', value: 1 },
  { label: 'Other', value: 2 }
]

const financialCondition = [
  { label: 'Own funds', value: 1 },
  { label: 'Source of revenue', value: 2 },
  { label: 'Sponsorchip', value: 3 },
]

export default function InitialForm() {
  const classes = useStyle();

  const [pdfFields, setPdfFields] = useState([]);

  let fieldsValue; // Значения инпутов
  let pdfForm;  

  function handleInputChanges(event) {
    const target = event.target;
    fieldsValue = {
      ...fieldsValue,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    };
    console.log(fieldsValue)
  }

  function getPDF() {
    fieldsValue.map(field => {
      console.log(field);
    });
  }


  useEffect(() => {
    fetch('/VAF.pdf', {})
      .then(res => res.arrayBuffer())
      .then(existingPdfBytes => PDFDocument.load(existingPdfBytes))
      .then(document => pdfForm = document.getForm())
      .then( () => {
        const fields = pdfForm.getFields();
        setPdfFields(fields.map(field => ({
          type: field instanceof PDFTextField ? 'text' : field instanceof PDFCheckBox ? 'checkbox' : 'radio', 
          name : field.getName(),
          values: field?.acroField?.dict ? [...field.acroField.dict.dict.values()].map(item => item.value) : null
        })))
      })
  }, []);
  setTimeout( () => {
    console.log(pdfFields);
  },1000)

  

  return <FormControl className={classes.form}>
    <Typography className={classes.title} variant="h2">Choose where to go</Typography>
    <br />
    <input type="button" onInput={getPDF}></input>
    {
      pdfFields ? pdfFields.map( (field, i) => {
        return field.type === 'checkbox' ? (<FormControlLabel control={<Checkbox id='outlined-basic' name={field.name} onChange={handleInputChanges}  key={`field-${i}`} variant="outlined" />} label={field.name || 'No label'} />) : 
        field.type === 'radio' ? (<Select name={field.name} onChange={handleInputChanges} label={field.name || 'No label'} >
          {field.values && field.values.map(value => <MenuItem value={value}> {value} </MenuItem>)}
        </Select>) : 
        (<TextField id="outlined-basic" name={field.name} onChange={handleInputChanges} label={field.name} key={`field-${i}`} variant="outlined" />)
      }) : (<div> Waiting... </div>)
    }

  </FormControl>
}