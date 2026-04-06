const buildWhatsAppUrl = (phoneNumber, message = "") => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}${encoded ? `?text=${encoded}` : ""}`;
};
 
export default buildWhatsAppUrl;
