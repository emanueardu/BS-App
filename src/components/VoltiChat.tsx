import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Message = {
  role: "user" | "assistant" | "system";
  text: string;
};

export const VoltiChat = () => {
  const { user } = useAuth();
  const apiKey = process.env.NEXT_PUBLIC_VOLTI_API_KEY;
  const endpoint = process.env.NEXT_PUBLIC_VOLTI_API_URL ?? "/api/volti";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Soy Volti, en que puedo ayudarte con tu obra o instalacion?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({
          message: userMessage.text,
          userId: user?.id,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const reply = response.ok
        ? (data && (data.reply || data.answer)) ??
          "En este momento no tengo una respuesta precisa. Si quieres, puedo derivarte con soporte."
        : "Ahora mismo no puedo responder. Intenta nuevamente en unos minutos.";

      setMessages((prev) => [...prev, { role: "assistant", text: String(reply) }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: "No pudimos contactar a Volti en este momento. Intenta nuevamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open ? (
        <div className="mb-3 w-80 overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-e4">
          <div className="flex items-center justify-between bg-brand-navy px-4 py-3 text-brand-text-on-dark">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <p className="text-sm font-semibold">Volti</p>
            </div>
            <span className="status-pill bg-brand-copper/16 text-[#9deaf2]">beta</span>
          </div>

          <div className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-brand-bg px-4 py-4">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={clsx(
                  "rounded-2xl px-3 py-2 text-sm shadow-e1",
                  message.role === "user"
                    ? "ml-auto bg-brand-copper/14 text-brand-text"
                    : message.role === "assistant"
                      ? "bg-white text-brand-text"
                      : "border border-dashed border-brand-border bg-brand-bg-alt text-brand-text-muted"
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-brand-border bg-white px-4 py-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                className="form-textarea min-h-0 resize-none"
                placeholder="Escribe tu consulta"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="btn btn-primary h-11 w-11 rounded-full p-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-2 border-brand-copper/40 bg-white shadow-glow-electric transition hover:-translate-y-0.5"
        aria-label={open ? "Cerrar chat Volti" : "Abrir chat Volti"}
      >
        <Image
          src="/volti.gif"
          alt="Volti chat"
          width={72}
          height={72}
          className="h-full w-full object-cover"
          priority
        />
      </button>
    </div>
  );
};
