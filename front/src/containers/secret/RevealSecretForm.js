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
  const [lastProposition, setLastProposition] = React.useState({});
  const addToast = useToastContext();
  const onSubmit = data => {
    
    data.applicantPlayerId = window.WA.player.id;
    propositionService.post(data).then((proposition) => {
      addToast("Votre accusation a bien été envoyé enregistré", "success");
      if (window.WA) {
        window.WA.state.closeWebsite = true;
      }
      userService.getOne(window.WA.player.id).then((user) => {
        setPlayer(user);
      });
      propositionService.getLast().then((proposition) => {
        setLastProposition(proposition)
      })
    }).catch((err) => {
      if(err.request.status === 403) {
        let obj = err.response.data;
        const message = obj[Object.keys(obj)[0]];
        addToast(message, "error");
      }else {
        addToast("", "error");
      }
    })
  };
  

  React.useEffect(() => {
    userService.getOne(window.WA.player.id).then((user) => {
      setPlayer(user);
    });
    userService.getPlayers(window.WA.player.id).then((users) => {
      setPlayers(users);
    })
    propositionService.getLast().then((proposition) => {
      setLastProposition(proposition)
    })
  }, []);

  return (
    <div className='formSecret'>
      {!lastProposition ? (
        <>
          <div>
            <img  src="/assets/images/secret_adventure.png" alt="" />
          </div>
          <h1>Dévoile un secret</h1>
          <div className='coin-recap'>
            <div className='price-coin'>
              <span className='price-text'>Prix : </span>
              <span className='coin-text'>40</span>
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
        </>
      ) : (
        <>
          <div>
            <img  src="/assets/images/secret_adventure.png" alt="" />
          </div>
          <h1>Accusation de {lastProposition?.applicant?.name} en cours</h1>
        </>
      )}
      
      
    </div>
    
    
  )
}

export default RevealSecretForm;