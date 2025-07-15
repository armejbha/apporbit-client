import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

const ProductDescription = () => {
    const {id}=useParams();
    const axiosSecure=useAxiosSecure();
    console.log(id);

    const { data: app = {}, isLoading } = useQuery({
    queryKey: ["app", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appsDetails/${id}`);
      return res.data;
    },
  });
  if(isLoading) return <Loading height={true}/>
  console.log(app);
    return (
        <div className="space-y-4">
  <h3 className="text-xl font-bold mb-2">Overview:</h3>

  {Array.isArray(app.description) ? (
    app.description.map((item, index) => (
      <div key={index}>
        <h4 className="font-semibold">{item.label}</h4>
        <p>{item.content}</p>
      </div>
    ))
  ) : (
    <p>{app.description}</p>
  )}
</div>

    );
};

export default ProductDescription;