import styles from "./stylesLogin.css";
import { useState } from "react";
import  config  from '../../../config';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { signin } from "../../../actions/auth";
import './stylesLogin.css'

const initialState = {
    email:"",
    password:""
};


const Login = () => {
    const [data, setData] = useState(initialState);


    const [error, setError] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]:input.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
      
        dispatch(signin(data, navigate));

    }

    return(
        
        <div className="login_container" style={{backgroundColor: '#FEF7DC'}}>
            <div className="login_form_container">
             <div className="left">
                 <h1>Prijavite se na Vas nalog</h1>
                <form className="form_container" onSubmit={handleSubmit}>
                        
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
                      
                        <button type="submit" className="green_btn">
                            Prijavite se
                        </button>
                    </form>
                </div>
                <div className="right">
                <h1>Nemate nalog?</h1>
                    <Link to="/signup">
                        <button type='button' className="white_btn">
                            Registrujte se
                        </button>
                    </Link>       
                </div>
            </div>
        </div>
     
    );
};

export default Login;

