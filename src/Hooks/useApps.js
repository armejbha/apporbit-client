import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: "https://apporbit-server-ruddy.vercel.app/",
});

const useApp = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/apps');
      return res.data;
    },
  });
};

export default useApp;
