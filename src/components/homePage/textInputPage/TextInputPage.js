import React from 'react'
import { useNavigate } from 'react-router';
import ConstructionPage from './../../constructionPage/ConstructionPage';

export default function TextInputPage() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

    React.useEffect(() => {
        if (user === '0') {
            navigate('/access_error')
        }
    },)
  return (
    <div>
        <ConstructionPage/>
    </div>
  )
}
