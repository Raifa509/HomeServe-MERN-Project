import React, { useEffect, useState } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboardList, faHourglassHalf, faUsers, faBolt, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { getDashboardStatsAPI, getBookingsPerServiceAPI } from '../../Services/allAPI';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const PIE_COLORS = ["#FACC15", "#22C55E", "#6366F1"];
const BAR_COLORS = "#6366F1";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    emergencyBookings: 0,
    totalCustomers: 0,
    totalProviders: 0
  });

  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [bookingsPerService, setBookingsPerService] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchBookingsPerService();
  }, []);

const fetchStats = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const reqHeader = { 'Authorization': `Bearer ${token}` };
    const result = await getDashboardStatsAPI(reqHeader);
    if (result.status === 200) {
      setStats(result.data);

      // Use backend monthly bookings
      const monthly = result.data.monthlyBookings.map(item => ({
        month: item.month,
        bookings: item.totalBookings
      }));
      setMonthlyBookings(monthly);
    }
  } catch (err) {
    console.log(err);
  }
};


  const fetchBookingsPerService = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { 'Authorization': `Bearer ${token}` };
      const result = await getBookingsPerServiceAPI(reqHeader);
      if (result.status === 200) {
        setBookingsPerService(result.data); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pieData = [
    { name: "Pending", value: stats.pendingBookings },
    { name: "Completed", value: stats.completedBookings },
    { name: "Emergency", value: stats.emergencyBookings }
  ];

  return (
    <>
      <div className="md:grid grid-cols-7 min-h-screen bg-gray-50">
        <div className='md:col-span-1 md:block hidden'><AdminSideBar /></div>

        <div className='col-span-6 flex flex-col'>
          <AdminHeader />

          {/* Statistic Cards */}
          <div className="grid gap-5 p-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              { title: 'Total Bookings', value: stats.totalBookings, icon: faClipboardList, bg: 'bg-yellow-400' },
              { title: 'Pending Bookings', value: stats.pendingBookings, icon: faHourglassHalf, bg: 'bg-blue-400' },
              { title: 'Completed Bookings', value: stats.completedBookings, icon: faCheckCircle, bg: 'bg-lime-400' },
              { title: 'Emergency Bookings', value: stats.emergencyBookings, icon: faBolt, bg: 'bg-indigo-400' },
              { title: 'Total Customers', value: stats.totalCustomers, icon: faUsers, bg: 'bg-emerald-400' },
              { title: 'Total Providers', value: stats.totalProviders, icon: faUserTie, bg: 'bg-purple-500' },
            ].map((card, idx) => (
              <div key={idx} className={`shadow-lg rounded-xl ${card.bg} hover:shadow-2xl text-white font-semibold p-5 text-xl transition-all`}>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='text-lg'>{card.title}</h2>
                    <h3 className='text-3xl mt-2'>{card.value}</h3>
                  </div>
                  <FontAwesomeIcon icon={card.icon} className='text-4xl' />
                </div>
              </div>
            ))}
          </div>

          {/* Charts Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5">

            {/* Pie Chart */}
            <div className="shadow-lg rounded-2xl bg-white p-5">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Booking Status Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    cornerRadius={8}
                    paddingAngle={4}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F3F4F6',
                      color: '#111827',
                      borderRadius: '10px',
                      padding: '10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '14px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Bookings */}
            <div className="shadow-lg rounded-2xl bg-white p-5">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Monthly Bookings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyBookings} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#F3F4F6', color: '#111827', borderRadius: '8px', padding: '10px' }} />
                  <Legend />
                  <Bar dataKey="bookings" fill={BAR_COLORS} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bookings per Service */}
            <div className="shadow-lg rounded-2xl bg-white p-5 lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Bookings per Service</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingsPerService} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="serviceName" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F3F4F6',
                      color: '#111827',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="totalBookings" fill={BAR_COLORS} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminDashboard;
