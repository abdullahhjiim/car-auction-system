const { default: AdminNavbar } = require("@/components/common/AdminNavbar");

export const metadata = {
  title: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
  description: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
};

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminLayout;
