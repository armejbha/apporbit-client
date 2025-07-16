import React from 'react';
import useAuth from '../../Hooks/useAuth';

const StatCard = ({ label, value, }) => {
    const{theme}=useAuth()
    return (
        <div className={`${theme==="dark" ? 'bg-[#0a0e19]' :'bg-[#faf5f6]'}  p-4 rounded-xl shadow-md`}>
    <p className={`text-2xl font-bold  `}>{value}</p>
    <p className="">{label}</p>
  </div>
    );
};

export default StatCard;

