import React, { FC } from 'react';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import styles from './Connect.module.scss';

interface ConnectProps {}
interface IFormInputs {
  email: string;
}
const Connect: FC<ConnectProps> = () => {
  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    criteriaMode: "all"
  });

  const onSubmit = (data:any) => {
   console.log('data', data)
  };
  return(
  <div className={styles.Connect}>
    <Typography variant="h5" gutterBottom sx={{textAlign: 'start', mt: 1}}>
        Connect
      </Typography>
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box className="form">
      <Typography variant="button" display="block" sx={{textAlign: 'start'}}>
        Email Address
      </Typography>
        <Box>
          <TextField 
            sx={{width: {xs:300, sm: 300, md: 380}}}
            id="outlined-basic" 
            // variant="outlined" 
            placeholder="Enter Email Address"
            {...register("email", {
              required: "Required",
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

        </Box>
      </Box>
      <Box sx={{mt: 1, display: 'flex'}}>
        <Button type="submit" variant="contained" className={`buttonStyles`}>Join</Button>
      </Box>
    </form>
  </div>
);
}
export default Connect;
