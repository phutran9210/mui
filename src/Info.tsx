import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Info = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state, pathname} = location;
    const str = pathname === '/info' ? 'In Info' : 'Not in Info'

    useEffect(() => {
        if (!state) {
            console.log('No data found, navigating to home page');
            navigate('/');
        }
    }, [state, navigate]);

    return (
        <div>
            <h1>Info</h1>
            <p>{str}</p>
        </div>
    );
};
export default Info;
