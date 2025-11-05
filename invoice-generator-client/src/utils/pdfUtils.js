import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePdfFromElement = async (element, fileName = "invoice.pdf", returnBlob = false) => {
  // Capture the element as a canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#fff",
    scrollY: -window.scrollY,
  });

  // Convert canvas to image and get its properties
  const imgData = canvas.toDataURL("image/jpeg");
  const pdf = new jsPDF("p", "pt", "a4");
  const imgProps = pdf.getImageProperties(imgData);

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // Add image to PDF
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  if (returnBlob) {
    // Return the PDF as a Blob
    return pdf.output("blob");
  } else {
    // Save the PDF directly
    pdf.save(fileName);
  }
};
