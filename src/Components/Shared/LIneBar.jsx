import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LIneBar = () => {
    const axiosSecure=useAxiosSecure();

    const { data: posts = [] } = useQuery({
    queryKey: ["posts-by-day"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/posts-by-day");
      return res.data;
    },
  });
  console.log(posts);
    return (
        <div className=" p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">📅 Apps Posted Per Day</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={posts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#60A5FA" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
      
    );
};

export default LIneBar;