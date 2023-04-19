import { Grid } from '@material-ui/core';
import React , {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../../../actions/category';
import WantToDonate from '../WantToDonate';

const Odeca = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        
     
         dispatch(getCategory("Odeca"));
    }, []);
     
    return(
        <Grid>
            <WantToDonate/>
        </Grid>
    );
}
export default Odeca;