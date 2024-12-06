import { useState } from "react";
import ClassCardList from "../../module/ClassPageSection/ClassCardList";
import ClassPageNav from "../../module/ClassPageSection/ClassPageNav";

const ClassPage = () => {
  const [search, setSearch] = useState({
    search: "",
    active: "active",
  });

  return (
    <div>
      <ClassPageNav search={search} setSearch={setSearch} />
      <ClassCardList search={search.search} active={search.active} />
    </div>
  );
};

export default ClassPage;
