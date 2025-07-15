import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Shared/Loading/Loading';

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
        <div>
            this is description 
        </div>
    );
};

export default ProductDescription;