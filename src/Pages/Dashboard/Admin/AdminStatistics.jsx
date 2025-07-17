import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Shared/Loading/Loading';
import StatCard from '../../../Components/Shared/StatCard';
import useAuth from '../../../Hooks/useAuth';



const COLORS = [
  '#60A5FA', // Blue-400
  '#34D399', // Emerald-400
  '#FBBF24', // Amber-400
  '#A78BFA', // Violet-400
  '#F87171', // Red-400
  '#38BDF8', // Sky-400
  '#F472B6', // Pink-400
  '#FDBA74'  // Orange-300
];


const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const {theme}=useAuth()

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading height={true}/>;

  const pieData = [
    { name: "Users", value: stats.users || 0 },
    { name: "Total Products", value: stats.totalApps || 0 },
    { name: "Pending", value: stats.pendingApps || 0 },
    { name: "Approved", value: stats.approvedApps || 0 },
    { name: "Rejected", value: stats.rejectedApps || 0 },
    { name: "Reviews", value: stats.reviews || 0 },
    { name: "Reports", value: stats.reports || 0 },
    { name: "Active Coupons", value: stats.activeCoupons || 0 },
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">📊 Admin Dashboard Statistics</h2>

      <div className="grid grid-cols-1 gap-8 items-center">
        
        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
          <StatCard label="Users" value={stats.users} />
          <StatCard label="Total Products" value={stats.totalApps}/>
          <StatCard label="Pending" value={stats.pendingApps} />
          <StatCard label="Approved" value={stats.approvedApps}  />
          <StatCard label="Rejected" value={stats.rejectedApps}  />
          <StatCard label="Reviews" value={stats.reviews} />
          <StatCard label="Reports" value={stats.reports}  />
          <StatCard label="Active Coupons" value={stats.activeCoupons} />
        </div>

       
<div className={`w-full max-w-3xl mx-auto px-2 sm:px-6 py-4 rounded-xl shadow-md ${theme ==="dark" ? 'bg-[#0a0e19]' : 'bg-[#faf5f6]'}`}>
  <h2 className="text-center text-lg sm:text-xl font-semibold mb-4">📊 Data Overview</h2>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={window.innerWidth < 640 ? 80 : 110} // 👈 Adaptive radius
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout={window.innerWidth < 640 ? "horizontal" : "vertical"} // 👈 Responsive legend layout
        verticalAlign={window.innerWidth < 640 ? "bottom" : "middle"}
        align={window.innerWidth < 640 ? "center" : "right"}
      />
    </PieChart>
  </ResponsiveContainer>
</div>
        </div>
    </div>
  );
};

// Reusable Stat Card Component


export default AdminStatistics;
