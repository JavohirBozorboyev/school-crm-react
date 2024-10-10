import React from "react";
import { AccountsPageTable } from "../../module/SettingsPageSection/AccountsPageSection/AccountsPageTable";
import AccountsPageNav from "../../module/SettingsPageSection/AccountsPageSection/AccountsPageNav";

const AccountsPage = () => {
  return (
    <div>
      <AccountsPageNav />
      <AccountsPageTable />
    </div>
  );
};

export default AccountsPage;
