import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, Users, TrendingUp, Globe } from 'lucide-react';

const deptData = [
  { name: 'Gen Med', patients: 120 },
  { name: 'Cardio', patients: 45 },
  { name: 'ENT', patients: 35 },
  { name: 'Ortho', patients: 65 },
  { name: 'Paeds', patients: 50 },
  { name: 'Derma', patients: 30 },
  { name: 'Dental', patients: 25 },
  { name: 'Gastro', patients: 40 },
];

const peakHours = [
  { time: '8 AM', count: 20 },
  { time: '9 AM', count: 80 },
  { time: '10 AM', count: 120 },
  { time: '11 AM', count: 95 },
  { time: '12 PM', count: 40 },
  { time: '1 PM', count: 30 },
  { time: '2 PM', count: 55 },
  { time: '3 PM', count: 45 },
];

const langData = [
  { name: 'Kannada', value: 420 },
  { name: 'English', value: 280 },
  { name: 'Hindi', value: 150 },
  { name: 'Telugu', value: 90 },
  { name: 'Tamil', value: 60 },
];

const COLORS = ['#0891b2', '#059669', '#7c3aed', '#d97706', '#dc2626'];

const totalPatients = deptData.reduce((s, d) => s + d.patients, 0);
const peakHour = peakHours.reduce((a, b) => a.count > b.count ? a : b);

const AdminDashboard = () => {
  return (
    <div className="dashboard-container animate-fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Analytics</h1>
          <p className="dashboard-subtitle">Real-time hospital registration insights</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon primary">
            <Users size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ color: 'var(--hospital-primary)' }}>{totalPatients}</div>
            <div className="stat-label">Total Patients</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ color: 'var(--success)' }}>{peakHour.time}</div>
            <div className="stat-label">Peak Hour</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ede9fe' }}>
            <Activity size={24} style={{ color: '#7c3aed' }} />
          </div>
          <div>
            <div className="stat-value" style={{ color: '#7c3aed' }}>{deptData.length}</div>
            <div className="stat-label">Active Departments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <Globe size={24} />
          </div>
          <div>
            <div className="stat-value" style={{ color: 'var(--warning)' }}>{langData.length}</div>
            <div className="stat-label">Languages Used</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Patients per Dept */}
        <div className="hospital-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Patients per Department
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(8, 145, 178, 0.05)' }}
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)', fontFamily: 'var(--font-body)' }}
                />
                <defs>
                  <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#0e7490" />
                  </linearGradient>
                </defs>
                <Bar dataKey="patients" fill="url(#primaryGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hours */}
        <div className="hospital-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Registration Volume by Hour
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHours} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(5, 150, 105, 0.05)' }}
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)', fontFamily: 'var(--font-body)' }}
                />
                <defs>
                  <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
                <Bar dataKey="count" fill="url(#successGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Language Pie Chart */}
      <div className="hospital-card" style={{ padding: '1.5rem', maxWidth: '480px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Language Distribution
        </h3>
        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={langData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {langData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)', fontFamily: 'var(--font-body)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
