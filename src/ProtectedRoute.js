import { useNavigate } from "react-router";

export default function ProtectedRoute ({ user, children }){
    const navigate = useNavigate();
    console.log(user)
    if (user === '0') {
        navigate('*')
    }

    return children;
};