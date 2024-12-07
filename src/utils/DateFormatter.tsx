const DateFormatter = ({ isoDate }: { isoDate: string }) => {
  const formattedDate = new Date(isoDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return <span>{formattedDate}</span>;
};

export default DateFormatter;
