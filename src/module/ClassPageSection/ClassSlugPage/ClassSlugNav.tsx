import { Breadcrumbs, Anchor } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

const ClassSlugNav = () => {
  const navigate = useNavigate();

  const { slug } = useParams();

  const links = [
    { title: "Dashboard", href: "/" },
    { title: "Class", href: "/class" },
    { title: slug, href: "#" },
  ].map((item, index) => (
    <Anchor key={index} onClick={() => navigate(item?.href)}>
      {item.title}
    </Anchor>
  ));

  return (
    <div>
      <Breadcrumbs>{links}</Breadcrumbs>
    </div>
  );
};

export default ClassSlugNav;
