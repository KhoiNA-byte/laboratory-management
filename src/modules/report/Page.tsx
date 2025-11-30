// components/ReportDashboard/ReportDashboard.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUsersRequest } from "../../store/slices/userSlice";
import { getRolesRequest } from "../../store/slices/roleSlice";
import { fetchInstrumentsRequest } from "../../store/slices/instrumentsSlice";
import { fetchReagentsRequest } from "../../store/slices/reagentSlice";
import { ReportStats } from "../../store/types";
import StatsGrid from "./StatsGrid";
import RecentTables from "./RecentTables";
import SystemStatus from "./SystemStatus";
import { fetchTestOrdersRequest } from "../../store/slices/testOrderSliceReport";

const ReportDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState<ReportStats>({
    totalUsers: 0,
    totalRoles: 0,
    totalTestOrders: 0,
    totalInstruments: 0,
    totalReagents: 0,
    completedTests: 0,
    pendingTests: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  // Lấy dữ liệu từ Redux store
  const { users } = useSelector((state: RootState) => state.users);
  const { roles } = useSelector((state: RootState) => state.roles);
  const { testOrders } = useSelector((state: RootState) => state.testOrders);
  const { instruments } = useSelector((state: RootState) => state.instruments);
  const { list: reagents } = useSelector((state: RootState) => state.reagents);

  useEffect(() => {
    dispatch(getUsersRequest());
    dispatch(getRolesRequest());
    dispatch(fetchTestOrdersRequest());
    dispatch(fetchInstrumentsRequest()); // ✅ THÊM instruments
    dispatch(fetchReagentsRequest()); // ✅ THÊM reagents
  }, [dispatch]);

  useEffect(() => {
    const calculateStats = () => {
      const completedTests = testOrders.filter(
        (order) => order.status === "Completed"
      ).length;

      const pendingTests = testOrders.filter(
        (order) => order.status === "Pending"
      ).length;

      const activeUsers = users.filter(
        (user) => user.status === "active" || user.status === "Active"
      ).length;

      setStats({
        totalUsers: users.length,
        totalRoles: roles.length,
        totalTestOrders: testOrders.length,
        totalInstruments: instruments.length,
        totalReagents: reagents.length,
        completedTests,
        pendingTests,
        activeUsers,
        inactiveUsers: users.length - activeUsers,
      });
    };

    calculateStats();
  }, [users, roles, testOrders, instruments, reagents]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          System Report Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Tổng quan hệ thống và thống kê</p>
      </div>

      <StatsGrid stats={stats} />
      <RecentTables
        users={users.slice(0, 5)}
        testOrders={testOrders.slice(0, 5)}
      />
      <SystemStatus />
    </div>
  );
};

export default ReportDashboard;
