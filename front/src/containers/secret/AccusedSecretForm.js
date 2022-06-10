import './Secret.scss';
import * as React from 'react';
import { useForm} from "react-hook-form";
import Button from '@mui/material/Button';
import PropositionService from "../../services/proposition-service";
import useToastContext from "../../hooks/useToastContext";

const AccusedSecretForm = () => {
  const [player, setPlayer] = React.useState('');
  const propositionService = new PropositionService();
  const [proposition, setProposition] = React.useState({});
  const addToast = useToastContext();

  React.useEffect(() => {
    propositionService.getLast().then((proposition) => {
      setProposition(proposition);
      console.log(proposition)
    });
  }, []);

  const onSubmit = (status) => {
    propositionService.applyDecision(proposition.id, {isCorrect: status}).then((proposition) => {
      const finalStatus = status ? "acceptée" : "refusée";
      addToast(`La proposition a été ${finalStatus}`, "success");
      setProposition(null);
    })
  }

  return (
    
    <div className='formSecret'>
      {proposition?.applicant && proposition?.target ? (
        <>
        <div>
          <img  src="/assets/images/secret_adventure.png" alt="" />
        </div>
        <h1>Proposition d'accusation</h1>
        <div className='form-accusation'>
          <div className='accusation-details'>
            <div className='details'>
              <div className='status status-accuser'>
                <span>Accusation</span>
              </div>
              <div className='accusation accusation-accuser'>
                <span>{proposition.applicant.name}</span>
                <span>{proposition.suggestion}</span>
              </div>
            </div>
            <div className='details'>
              <div className='status status-accused'>
                <span>Réponse</span>
              </div>
              <div className='accusation accusation-accused'>
                <span>{proposition.target.name}</span>
                <span>{proposition.target.secret}</span>
              </div>
            </div>
          </div>
          <div className='buttons'>
            <Button onClick={() => onSubmit(false)} className='button-red' variant="contained" >FAUX</Button>
            <Button onClick={() => onSubmit(true)} className='button-green' variant="contained" >VRAI</Button>
          </div>
        </div>
        </>
      ) : (
        <>
          <div>
            <img  src="/assets/images/secret_adventure.png" alt="" />
          </div>
          <h1>Aucune accusation</h1>
        </>
      )}
    </div>
  )
}

export default AccusedSecretForm;