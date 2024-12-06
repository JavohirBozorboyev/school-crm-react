import TeachersPageNav from "../../module/TeachersPageSection/TeachersPageNav";
import TeachersCardList from "../../module/TeachersPageSection/TeachersCardList";
import useSWR from "swr";
import { useState } from "react";

const TeachersPage = () => {
  const [search, setSearch] = useState({
    search: "",
    status: "active",
  });
  const { data, error, isLoading } = useSWR(
    `/api/teachers?status=${search.status}`
  );


  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <TeachersPageNav setSearch={setSearch} search={search} />
      <TeachersCardList data={data} search={search.search} />
    </div>
  );
};

export default TeachersPage;
