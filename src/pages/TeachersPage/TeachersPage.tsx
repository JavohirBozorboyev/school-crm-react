import TeachersPageNav from "../../module/TeachersPageSection/TeachersPageNav";
import TeachersCardList from "../../module/TeachersPageSection/TeachersCardList";
import useSWR from "swr";
import { useState } from "react";

const TeachersPage = () => {
  const { data, error, isLoading } = useSWR("/api/teachers");
  const [search, setSearch] = useState("");
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <TeachersPageNav setSearch={setSearch} search={search} />
      <TeachersCardList data={data} search={search} />
    </div>
  );
};

export default TeachersPage;
