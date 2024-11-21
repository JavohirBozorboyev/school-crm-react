import AdminsPageNav from "../../../module/SettingsPageSection/AdminsPageSection/AdminsPageNav";
import AdminsPageTable from "../../../module/SettingsPageSection/AdminsPageSection/AdminsPageTable";
import useSWR from "swr";
const AdminsPage = () => {
  const { data, error, isLoading } = useSWR("/api/admins");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <AdminsPageNav />
      <AdminsPageTable data={data} />
    </div>
  );
};

export default AdminsPage;
