import './Secret.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useForm, Controller} from "react-hook-form";
import Button from '@mui/material/Button';
import UserService from "../../services/user-service";
import useToastContext from "../../hooks/useToastContext";

const RegisterSecretForm = () => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
  const [formLoading, setFormLoading] = React.useState(false);
  const addToast = useToastContext();
  console.log(window.WA);

  const onSubmit = async data => {
    setFormLoading(true);
    const userService = new UserService();
    data.playerId = window.WA && window.WA.player.id;
    data.name = window.WA && window.WA.player.id;
    await userService.post(data).then(() => {
      setFormLoading(false);
      addToast("Votre secret a bien été enregistré", "success");
      if (window.WA) {
        window.WA.state.closeWebsite = true;
      }
    }).catch((err) => {
      addToast("", "error");
    });
    setFormLoading(false);
  };

  return (
    <div className='formSecret'>
      {!formLoading ? (
        <>
        <div>
          <img  src="/assets/images/secret_adventure.png" alt="" />
        </div>
        <h1>Saisi ton secret</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='field'>
            <Controller
              name="secret"
              control={control}
              id="secret"
              defaultValue={undefined}
              render={({ field }) => (
                <TextField id="outlined-basic" label="Secret" placeholder="Je suis le fils caché d'Adrien.." variant="outlined" {...field} />
              )}
            />
          </div>
          
          <div >
            <Button className='button button-pink' variant="contained" type="submit">Enregistrer</Button>
          </div>
        </form>
        </>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
     
      
    </div>
    
    
  )
}

export default RegisterSecretForm;