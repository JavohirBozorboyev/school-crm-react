import { AccountsPageTable } from "../../module/SettingsPageSection/AccountsPageSection/AccountsPageTable";
import AccountsPageNav from "../../module/SettingsPageSection/AccountsPageSection/AccountsPageNav";

const AccountsPage = () => {
  return (
    <main>
      <AccountsPageNav />
      <AccountsPageTable />
    </main>
  );
};

export default AccountsPage;
