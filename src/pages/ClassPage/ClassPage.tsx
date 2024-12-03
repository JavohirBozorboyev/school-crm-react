import useSWR from "swr";
import ClassCardList from "../../module/ClassPageSection/ClassCardList";
import ClassPageNav from "../../module/ClassPageSection/ClassPageNav";

const ClassPage = () => {
  const { data, error, isLoading } = useSWR("/api/groups");

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  console.log(data);

  return (
    <div>
      <ClassPageNav />
      <ClassCardList data={data} />
    </div>
  );
};

export default ClassPage;
