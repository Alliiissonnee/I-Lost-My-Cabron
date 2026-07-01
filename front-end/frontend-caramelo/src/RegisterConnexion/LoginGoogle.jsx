import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./Login.css";

function LoginGoogle() {
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/google', {
                token: credentialResponse.credential,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/account');
        } catch (err) {
            console.error('Erreur de connexion Google:', err);
        }
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Erreur')} />;
}

export default LoginGoogle;