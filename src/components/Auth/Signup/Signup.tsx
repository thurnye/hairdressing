import React, { FC, useState } from 'react';
import Google from '../Google/Google';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Button, Typography, Card , FormControl,
  InputAdornment,
  Grid,
  CardHeader,
  CardContent,
  Divider,
  FormControlLabel,
  Checkbox} from '@mui/material';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import styles from './Signup.module.scss';


import services from '../../../util/services';

const ScmuiIconText = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1d2d50",
      fontSize: "16px",
      top: 0
    },
    "& label": {
      top: 0,
      color: "#14274e"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#132743"
      },
      "&:hover fieldset": {
        borderColor: "#132743"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7579e7"
      }
    },
    "& .MuiInputBase-input": {
      height: "3px",
      fontSize: "15px"
      // backgroundColor:'#eeeeee'
    }
  }
})(TextField);

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    maxWidth: 400,
    padding: 20,
    paddingBottom: 100,
    background:
      "url(https://firebasestorage.googleapis.com/v0/b/messier87-development.appspot.com/o/wave.svg?alt=media&token=dead2046-9e45-4d55-a0ea-effb9435d89b)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    // height: 763
    margin: 'auto'
  },

  headText: {
    fontSize: 40,
    letterSpacing: -1.4,
    wordSpacing: 2.2,
    fontWeight: 700,
    fontStyle: "normal",
    fontVariant: "small-caps",
    color: "#132743"
  },
  neckText: {
    fontSize: 15,
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: 1.5,
    color: "#132743"
  },
  submitButton: {
    height: 40,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1.5,
    textTransform: "none"
  },
  LinkUnderlineRemove: {
    textTransform: "none",
    textDecoration: "none"
  }
}));


interface SignupProps {
  login?: boolean
}

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup: FC<SignupProps> = (props: SignupProps) => {
  const {login} = props
  const classes = useStyles();
  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    criteriaMode: "all"
  });

  const [checked, setChecked] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('')

  const onSubmit = async (data:IFormInputs) => {
    try {
      if(!login){
        if(!checked)return;
        const resp = await services.findUser('email', data.email)
      if(resp.status === 204){
        const result = await services.createUser(data)
        let token = result.data
        localStorage.setItem('token', token);  
        window.location.replace('/') 
      }
      if(resp.data){ 
        setMessage('Email already exist, please sign in to continue.')
      }
      }else{
        const resp = await services.loginUser(data)
        let token = resp.data
        localStorage.setItem('token', token);  
        window.location.replace('/') 
      }
    } catch (error: any) {
      const msg = error.response.data?.message
      setMessage(msg)
    }
  };

  return(
  <div className={styles.Signup}>
      <Card className={classes.cardRoot}>
        <CardHeader
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          title={
            <Typography variant="h5" display="block" className={classes.headText}>
              {login ? `Account Login` : 'Create An Account' }
            </Typography>
          }
          subheader={
            <>
              {" "}
              <Typography variant="h5" className={classes.neckText}>
              {login ? <>
                Don't have an account? {" "} 
                <Link to={"/signup"} className={classes.LinkUnderlineRemove}>
                  signup
                </Link>
              </>  : <>
              Already have an account?
                <Link to={"/login"} className={classes.LinkUnderlineRemove}>
                {" "} login{" "}
                </Link>
              </>}
              </Typography>
            </>
          }
        />
        <Divider
          style={{
            marginBottom: "25px"
          }}
        />

        <CardContent>
        <Typography variant="caption" display="block" gutterBottom className={styles.errorMessage} sx={{mb: 3}}>{message}</Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {
                !login && <>
                  {/* firstName */}
                  <Grid item xs={6}>
                    <FormControl error fullWidth>
                      <ScmuiIconText
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                            >
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                        label="First Name"
                        variant="outlined"
                        {...register("firstName", {
                          required: "*first name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i ,
                            message: "*first name required"
                          }
                        })}
                        type="text"/>
                      
                    {errors.firstName && <span role="alert" className={styles.errorMessage}>{errors.firstName.message}</span>}
                    </FormControl>
                  </Grid>

                  {/* LastName */}
                  <Grid item xs={6}>
                    <FormControl error fullWidth>
                      <ScmuiIconText
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                        label="Last Name"
                        variant="outlined"
                        {...register("lastName", {
                          required: "*last name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i ,
                            message: "*last name required"
                          }
                        })}
                        type="text"/>
                      
                    {errors.lastName && <span role="alert" className={styles.errorMessage}>{errors.lastName.message}</span>}
                    </FormControl>
                  </Grid>
                </>
              }
              

              {/* Email */}
              <Grid item xs={12}>
                <FormControl  fullWidth>
                  <ScmuiIconText
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                    label="Email"
                    variant="outlined"
                    {...register("email", {
                      required: "*email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email"
                      }
                    })}
                  />
                  <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                    <Typography variant="caption" display="block" gutterBottom  key={type} className={styles.errorMessage}>
                      {message}
                    </Typography>
                    ))
                  : null;
              }}
            />
                </FormControl>
              </Grid>

                  
              {/* Password */}
              <Grid item xs={12}>
                <FormControl error fullWidth>
                  <ScmuiIconText
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      )
                    }}
                    type="password"
                    label="Password"
                    variant="outlined"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      required: "*password is required",
                      ...( !login && { minLength: {
                        value: 8,
                        message: "minimum length is 8"
                      }})
                    })}
                  />
                  {errors.password && <span role="alert" className={styles.errorMessage}>{errors.password.message}</span>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>

              {/* Sign Up With .... */}
              <CardContent>
                <Divider
                  style={{
                    marginBottom: "25px"
                  }}
                />{" "}
                
                <Google/>
              </CardContent>

              </Grid>

              {
                !login && <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(e:any) => setChecked(e.target.checked)}
                      name="checkedB"
                      style={{ color: "#a1eafb" }}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="h5" className={classes.neckText}>
                      I agree to the{" "}
                      <Link className={classes.LinkUnderlineRemove} to={''}>
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link className={classes.LinkUnderlineRemove} to={''}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              </Grid>
              }
            </Grid>
            <Button
            
              variant="contained"
              color="primary"
              fullWidth
              sx={{width: '100% !important'}}
              className={`${classes.submitButton} buttonStyles`}
              style={{ marginTop: 10 }}
              type="submit" 
            >
              <Typography variant="h5" className={classes.submitButtonText}>
                {login ? 'Login ' : 'Create Now' }
              </Typography>
            </Button>
          </form>
        </CardContent>
      </Card>
  </div>
);
}
export default Signup;
