import { NavLink } from "react-router-dom";
import ExamResultSlugPageList from "../../../../module/ExamPageSection/ExamResultSlugPageSection/ExamRezultSlugPageList";
import { Breadcrumbs, Paper, Text } from "@mantine/core";

const ExamResultSlugPage = () => {
  const items = [
    { title: "Imtixon Natijalari", href: "/exam/exam-results" },
    { title: "Slug", href: "" },
  ].map((item, index) => (
    <NavLink to={item.href} key={index}>
      <Text c={"blue"}>{item.title}</Text>
    </NavLink>
  ));
  return (
    <div>
      <Paper mb="md">
        <Breadcrumbs>{items}</Breadcrumbs>
      </Paper>
      <ExamResultSlugPageList />
    </div>
  );
};

export default ExamResultSlugPage;
