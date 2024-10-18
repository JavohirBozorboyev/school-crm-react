interface PriceFormatterProps {
  value: number;
  locale?: string;
  currency?: string;
}

const PriceFormatter: React.FC<PriceFormatterProps> = ({
  value,
  locale = "uz-UZ",
  currency = "UZS",
}) => {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);

  return <>{formattedPrice}</>;
};

export default PriceFormatter;
