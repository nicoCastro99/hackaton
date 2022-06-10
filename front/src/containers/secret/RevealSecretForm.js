import './Secret.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller} from "react-hook-form";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import UserService from "../../services/user-service";
import PropositionService from "../../services/proposition-service";
import useToastContext from "../../hooks/useToastContext";


const RevealSecretForm = () => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
  const userService = new UserService();
  const propositionService = new PropositionService();
  const [player, setPlayer] = React.useState('');
  const [players, setPlayers] = React.useState([]);
  const addToast = useToastContext();

  const onSubmit = data => {
    data.applicantPlayerId = "222";
    propositionService.post(data).then((proposition) => {
      addToast("Votre suggestion a bien été envoyé enregistré", "success");
      userService.getOne("222").then((user) => {
        setPlayer(user);
      });
    }).catch((err) => {
      addToast("", "error");
    })
  };
  

  React.useEffect(() => {
    userService.getOne("222").then((user) => {
      setPlayer(user);
    });
    userService.getPlayers("222").then((users) => {
      setPlayers(users);
    })
  }, []);

  return (
    <div className='formSecret'>
      <div>
        <img  src="/assets/images/secret_adventure.png" alt="" />
      </div>
      <h1>Dévoile un secret</h1>
      <div className='coin-recap'>
        <div className='price-coin'>
          <span className='price-text'>Prix : </span>
          <span className='coin-text'>15</span>
          <img className='coin' src="/assets/images/coin.png" alt="" />
        </div>
        <div className='own-coin'>
          <span className='price-text'>Ma bourse : </span>
          <span className='coin-text'>{player.coins}</span>
          <img className='coin' src="/assets/images/coin.png" alt="" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <Controller
            name="targetPlayerId"
            control={control}
            id="targetPlayerId"
            render={({ field }) => (
              <TextField
                id="outlined-select-currency"
                select
                label="Joueur"
                {...field}
              >
                {players.map((option) => (
                  <MenuItem key={option.playerId} value={option.playerId}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <div className='field'>
          <Controller
            name="suggestion"
            control={control}
            id="suggestion"
            
            render={({ field }) => (
              <TextField id="suggestion" label="Secret" placeholder="Il est le fils caché d'Adrien.." variant="outlined" {...field} />
            )}
          />
        </div>
        
        <div >
          <Button className='button button-pink' variant="contained" type="submit">Proposer</Button>
        </div>
      </form>
      
    </div>
    
    
  )
}

export default RevealSecretForm;