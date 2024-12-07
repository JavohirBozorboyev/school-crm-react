import useSWR from "swr";
import SubjectPageList from "../../../module/SettingsPageSection/SubjectPageSection/SubjectPageList";
import SubjectPageNav from "../../../module/SettingsPageSection/SubjectPageSection/SubjectPageNav";

const SubjectPage = () => {
  const { data, error, isLoading } = useSWR(`/api/subjects`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <SubjectPageNav />
      <SubjectPageList data={data} />
    </div>
  );
};

export default SubjectPage;
