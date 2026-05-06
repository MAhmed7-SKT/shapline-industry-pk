// Shapline Industry WhatsApp business line.
export const WHATSAPP_NUMBER = "923026136913";
export const CONTACT_EMAIL = "shapline279@gmail.com";
export const CONTACT_PHONE = "+92 302 6136913";
export const CONTACT_ADDRESS = "Sialkot, Punjab, Pakistan";
export const SOCIAL_INSTAGRAM = "https://www.instagram.com/shaplinesurgical?igsh=MWZ6OXV6dDJkNzR0cQ==";
export const SOCIAL_FACEBOOK = "https://www.facebook.com/share/1ZDo3q1XBw/";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(opts: {
  name: string;
  artNo: string;
  size?: string;
}): string {
  const sizeLine = opts.size ? `, Size: ${opts.size}` : "";
  return `Hello, I am interested in ${opts.name} (Art No: ${opts.artNo})${sizeLine} for export. Please share pricing and availability.`;
}

export const GENERAL_INQUIRY =
  "Hello, I am interested in your scissors products. Please share details.";
