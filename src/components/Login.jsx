import { Grid, Paper, Avatar, TextField, Checkbox, FormControlLabel, Button, Link, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function Login({onTabChange}) {

  const paperStyle = {
    padding: 20,
    height: '73vh',
    width: 300,
    margin: 'auto'
  };

  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };

  const btnStyle = {
    margin: '10px 0'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '13px'
  };

  const initialValues = {
    email:'',
    password:'',
    remembereMe:false
  };

  const onSubmit = (values)=>{
    console.log(values);
    setTimeout(()=>{
      fmk.resetForm();
      fmk.setSubmitting(false);
    }, 2000);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(8,"Password minimum length should be 8").required("Required"),
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    fmk.setFieldValue(name, value.trimStart());
  }

  const fmk = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={fmk.handleSubmit}>
        <TextField name='email' value={fmk.values.email} onBlur={fmk.handleBlur} onChange={handleChange} label="Email" variant="standard" placeholder='Enter Email' fullWidth  helperText={fmk.errors.email && fmk.touched.email ?<Typography style={errorStyle}>{fmk.errors.email}</Typography>:""}/>

        <TextField /*type='password'*/ name='password' value={fmk.values.password} onBlur={fmk.handleBlur} onChange={handleChange} label="Password" variant="standard" placeholder='Enter Password' fullWidth  helperText={fmk.errors.password && fmk.touched.password ?<Typography style={errorStyle}>{fmk.errors.password}</Typography>:""}/>

        <FormControlLabel control={
          <Checkbox name='remembereMe' onChange={fmk.handleChange} value={fmk.values.remembereMe} color='primary' />
        } label="Remember Me" />
        <Button type='submit' disabled={fmk.isSubmitting} color='primary' style={btnStyle} fullWidth variant="contained" >{fmk.isSubmitting?"Loading...":"Sign In"}</Button>
        </form>
        <Typography>
          <Link href="#" underline="hover">Forgot password ?</Link>
        </Typography>
        <Typography>Do you have an account ?
          <Link href="#" underline="hover" onClick={()=>onTabChange('event', 1)}> Sign Up</Link>
        </Typography>
        
      </Paper>
    </Grid>
  )
}
