import { Grid, Paper, Avatar, TextField, Checkbox, FormControlLabel, Button, Typography, Radio, RadioGroup, FormLabel, FormControl, FormHelperText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {

  const initialValues = {
    name:'',
    email:'',
    gender:'',
    phoneNum:'',
    password:'',
    confirmPassword:'',
    termsAndConditions:false
  };

  const onSubmit = (values)=>{
    console.log(values);
    setTimeout(()=>{
      fmk.resetForm();
      fmk.setSubmitting(false);
    }, 2000);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(5, "It's too short").max(20, "It's too long").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    gender:Yup.string().oneOf(['male', 'female', 'other'], "Required").required("Required"),

    phoneNum: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("Required"),

    password: Yup.string().min(8,"Password minimum length should be 8").required("Required"),

    confirmPassword:Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),

    termsAndConditions: Yup.string().oneOf(['true'], "Accept terms and Conditions")

  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === 'phoneNum') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      fmk.setFieldValue(name, numericValue.trimStart());
    } else {
      fmk.setFieldValue(name, value.trimStart());
    }
  }

  const fmk = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: 'auto'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '13px'
  };

  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };

  const headerStyle = {
    margin: 0
  };

  const btnStyle = {
    margin: '10px 0'
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><AddCircleOutlineIcon /></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant='caption'>Please fill this form to create an account !</Typography>
        </Grid>
        <form onSubmit={fmk.handleSubmit}>
          <TextField label="Name" onChange={handleChange} onBlur={fmk.handleBlur} value={fmk.values.name} name='name' variant="standard" placeholder='Enter Name' fullWidth helperText={fmk.touched.name && fmk.errors.name?<Typography style={errorStyle}>{fmk.errors.name}</Typography>:""}  />

          <TextField label="Email" onChange={handleChange} onBlur={fmk.handleBlur} value={fmk.values.email} name='email' variant="standard" placeholder='Enter Email' fullWidth helperText={fmk.touched.email && fmk.errors.email?<Typography style={errorStyle}>{fmk.errors.email}</Typography>:""} />

          <FormControl style={{ marginTop: 5 }}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="Gender"
              name="gender"
              onChange={handleChange} value={fmk.values.gender}
              style={{ display: 'initial' }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <FormHelperText>
          {fmk.touched.gender && fmk.errors.gender?<div style={{color:'red'}}>{fmk.errors.gender}</div>:""}
          </FormHelperText>

          <TextField label="Phone Number" onChange={handleChange} onBlur={fmk.handleBlur} value={fmk.values.phoneNum} name='phoneNum' variant="standard" placeholder='Enter Phone Number' fullWidth  helperText={fmk.touched.phoneNum && fmk.errors.phoneNum?<Typography style={errorStyle}>{fmk.errors.phoneNum}</Typography>:""}/>

          <TextField type='password' label="Password" onChange={handleChange} onBlur={fmk.handleBlur}  value={fmk.values.password} name='password' variant="standard" placeholder='Enter Password' fullWidth  helperText={fmk.touched.password && fmk.errors.password?<Typography style={errorStyle}>{fmk.errors.password}</Typography>:""}/>

          <TextField type='password' label="Confirm Password" onChange={handleChange} onBlur={fmk.handleBlur}  value={fmk.values.confirmPassword} name='confirmPassword' variant="standard" placeholder='Confirm Password' fullWidth  helperText={fmk.touched.confirmPassword && fmk.errors.confirmPassword?<Typography style={errorStyle}>{fmk.errors.confirmPassword}</Typography>:""}/>

          <FormControlLabel control={
            <Checkbox name='termsAndConditions' onChange={fmk.handleChange} value={fmk.values.termsAndConditions} color='primary' />
          } label="I accept the terms and conditions." />
          <FormHelperText>
          {fmk.touched.termsAndConditions && fmk.errors.termsAndConditions?<div style={{color:'red'}}>{fmk.errors.termsAndConditions}</div>:""}
          </FormHelperText>

          <Button type='submit' disabled={fmk.isSubmitting} color='primary' style={btnStyle} fullWidth variant="contained">{fmk.isSubmitting?"Loading...":"Sign up"}</Button>
        </form>
      </Paper>
    </Grid>
  )
}
