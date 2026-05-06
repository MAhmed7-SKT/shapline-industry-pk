import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppButton({
  message,
  label = "Inquire on WhatsApp",
  size = "md",
  className = "",
}: {
  message: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "px-3 py-2 text-[10px]",
    md: "px-4 py-3 text-xs",
    lg: "px-6 py-4 text-sm",
  } as const;
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-whatsapp text-white font-bold uppercase tracking-widest rounded-sm hover:bg-whatsapp/90 transition-all duration-300 hover:shadow-glow animate-pulse-ring ${sizes[size]} ${className}`}
    >
      <MessageCircle className="size-4" />
      {label}
    </a>
  );
}
