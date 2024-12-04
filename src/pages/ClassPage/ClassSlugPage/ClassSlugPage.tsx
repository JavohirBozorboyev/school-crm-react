import { useParams } from "react-router-dom";
import useSWR from "swr";
import ClassSlugNav from "../../../module/ClassPageSection/ClassSlugPage/ClassSlugNav";
import ClassSlugTable from "../../../module/ClassPageSection/ClassSlugPage/ClassSlugTable";

const ClassSlugPage = () => {
  const { slug } = useParams();

  const { data, error, isLoading } = useSWR(`/api/groups/${slug}`);
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div>
      <ClassSlugNav data={data?.group} />
      <ClassSlugTable data={data?.students} />
    </div>
  );
};

export default ClassSlugPage;
