import "@/styles/greencab.css";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const stats = [
  { label: "Total Bookings", value: "2,847", change: "+12.5%" },
  { label: "Active Drivers", value: "156", change: "+5.2%" },
  { label: "Revenue (₹)", value: "4,58,320", change: "+18.3%" },
  { label: "Customer Rating", value: "4.8", change: "+0.2" },
];

const GCAdminDashboard = () => {
  return (
    <div className="greencab-theme">
      <div className="gc-admin-layout">
        <aside className="gc-admin-sidebar">
          <Link to="/" className="logo">
            <i className="bx bxs-car"></i> GreenCab
          </Link>
          <ul className="gc-admin-nav">
            <li><a href="#" className="active"><i className="bx bxs-dashboard"></i> Dashboard</a></li>
            <li><a href="#"><i className="bx bxs-car"></i> Vehicles</a></li>
            <li><a href="#"><i className="bx bxs-user"></i> Drivers</a></li>
            <li><a href="#"><i className="bx bxs-calendar"></i> Bookings</a></li>
            <li><a href="#"><i className="bx bxs-map"></i> Tours</a></li>
            <li><a href="#"><i className="bx bxs-bar-chart-alt-2"></i> Reports</a></li>
            <li><a href="#"><i className="bx bxs-cog"></i> Settings</a></li>
          </ul>
        </aside>

        <main className="gc-admin-main">
          <header className="gc-admin-header">
            <h1>Dashboard</h1>
            <div className="gc-admin-header-actions">
              <Link to="/" className="gc-btn small-btn">View Website</Link>
            </div>
          </header>

          <div className="gc-admin-content">
            <div className="gc-stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="gc-stat-card">
                  <h4>{stat.label}</h4>
                  <div className="value">{stat.value}</div>
                  <div className="change">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GCAdminDashboard;
