import jsPDF from "jspdf";

const ChekPdf = () => {
  const doc = new jsPDF();

  // Funksiya - bitta chek dizaynini yaratadi
  const drawReceipt = (startY: number) => {
    // Bosh sarlavha va sanani yozish
    doc.setFontSize(18);
    doc.text("To'lov varaqasi", 90, startY + 15); // sarlavha biroz yuqoriroqda
    doc.setFontSize(12);
    doc.text("Sana:  ____ 10 2024 y.", 20, startY + 25); // Sana pastroqqa ko'chdi

    // Topshiruvchi va sinf qatorlari
    doc.setFontSize(12);
    doc.text("Topshiruvchi:", 20, startY + 35);
    doc.line(55, startY + 35, 190, startY + 35); // Chiziq

    // № va sinf
    doc.text("№", 20, startY + 45);
    doc.text(`7-sinf`, 35, startY + 45);
    doc.line(55, startY + 45, 190, startY + 45); // sinf uchun chiziq

    // Summani kiritish
    doc.text("Summa:", 20, startY + 65); // Summa qatorini yuqoriga olib keldik
    doc.line(45, startY + 65, 190, startY + 65); // Summani kiritish uchun chiziq

    // Qaysi davr uchun
    doc.text("Qaysi davr uchun:", 20, startY + 85);
    doc.setFontSize(15);
    doc.text("Oktyabr", 65, startY + 83); // "Oktyabr" matnini biroz yuqoriga joyladik
    doc.line(55, startY + 85, 190, startY + 85); // Qaysi davr uchun bo'lim

    // Qabul qiluvchi va imzo uchun joy
    doc.setFontSize(12);
    doc.text("Qabul qiluvchi:", 20, startY + 105);
    doc.line(55, startY + 105, 190, startY + 105); // Qabul qiluvchi uchun chiziq

    doc.line(150, startY + 125, 190, startY + 125); // Imzo chizig'i
  };

  // Bitta chekni joylashtirish
  drawReceipt(0);

  // PDF-ni saqlash
  doc.save("custom_receipt.pdf");
};

export default ChekPdf;
