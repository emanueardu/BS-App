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
      text: "Soy Volti, ¿en que puedo ayudarte con tu obra o instalacion?",
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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: String(reply) },
      ]);
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
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-brand-border bg-brand-surface shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-brand-navy px-4 py-3 text-brand-text-on-dark">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <p className="text-sm font-semibold">Volti (asistente)</p>
            </div>
            <span className="rounded-full bg-brand-surface/20 px-2 py-0.5 text-xs">
              beta
            </span>
          </div>

          <div className="flex max-h-80 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={clsx(
                  "rounded-xl px-3 py-2 text-sm shadow-sm",
                  message.role === "user"
                    ? "ml-auto bg-brand-bg-alt text-brand-text"
                    : message.role === "assistant"
                      ? "bg-brand-surface text-brand-text"
                      : "border border-dashed border-brand-border bg-brand-bg-alt text-brand-text-muted"
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-brand-border px-4 py-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                className="w-full resize-none rounded-lg border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
                placeholder="Escribe tu consulta"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-copper text-brand-text-on-dark transition hover:bg-brand-copper disabled:cursor-not-allowed disabled:bg-brand-border"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-surface shadow-xl ring-2 ring-brand-sand transition hover:-translate-y-0.5 hover:shadow-2xl"
        aria-label={open ? "Cerrar chat Volti" : "Abrir chat Volti"}
      >
        <Image
          src="/volti.gif"
          alt="Volti chat"
          width={80}
          height={80}
          className="h-18 w-18 rounded-full object-cover"
          priority
        />
      </button>
    </div>
  );
};
