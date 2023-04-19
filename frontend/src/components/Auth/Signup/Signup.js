import styles from "./stylesSingup.css";
import { useState } from "react";
import  config  from '../../../config';
import {Link, useNavigate} from 'react-router-dom';
import { signup } from "../../../actions/auth";
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import FormLabel from '@material-ui/core/FormLabel';
import './stylesSingup.css';

const initialState = {
      
        username: "",
        email:"",
        password:"",
        city: "",
        contact: "",
        image: ""
    };

const Signup = () => {
    const [data, setData] = useState(initialState);
    const dispatch = useDispatch();

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]:input.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        
        dispatch(signup(data, navigate));
           
        
    };

    return(
        <div className="signup_container" style={{backgroundColor: '#FEF7DC'}}>
            <div className="signup_form_container">
                <div className="left">
                   
                    <Link to="/login">
                        <button type='button' className="white_btn">
                            <h1 >Prijavite se</h1>
                        </button>
                    </Link>
                </div>
                <div className="right">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <h1>Napravite nalog</h1>
                        <input
                            type="text"
                            placeholder="Ime i prezime"
                            name='username'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="input"

                        />
                          
                           <input
                            type="email"
                            placeholder="Email"
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="input"

                        />
                           <input
                            type="password"
                            placeholder="Lozinka"
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="input"

                        />
                         <input
                            type="city"
                            placeholder="Grad"
                            name='city'
                            onChange={handleChange}
                            value={data.city}
                            required
                            className="input"

                        />
                         <input
                            type="contact"
                            placeholder="Kontakt"
                            name='contact'
                            onChange={handleChange}
                            value={data.contact}
                            required
                            className="input"

                        />
                        
                        <label style={{color: 'white'}}>Ubacite fotografiju</label>
                    <div className='container mr-60'>
             <FileBase type="file" multiple={false} onDone={({base64})=>setData({...data,image:base64})}/>
             </div> 
                        {error && <div className="error_msg">{error}</div>}
                        <button type="submit" className="green_btn">
                           <h2> Registrujte se </h2>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
};

export default Signup;



