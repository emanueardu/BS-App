import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  text: string;
};

export const VoltiChat = () => {
  const apiKey = process.env.NEXT_PUBLIC_VOLTI_API_KEY;
  const endpoint =
    process.env.NEXT_PUBLIC_VOLTI_API_URL ??
    "https://api.volti.example/chat";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Soy Volti, ¿en qué puedo ayudarte con tu obra o instalación?",
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
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json().catch(() => ({}));
      const reply =
        (data && (data.reply || data.answer)) ??
        "Recibí tu mensaje. Configura la API de Volti para responder aquí.";

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
          text: "No pudimos contactar al bot. Verifica la API key y el endpoint.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <p className="text-sm font-semibold">Volti (asistente)</p>
            </div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
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
                    ? "ml-auto bg-orange-50 text-slate-900"
                    : message.role === "assistant"
                      ? "bg-white text-slate-900"
                      : "bg-slate-100 text-slate-700 border border-dashed border-slate-300"
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200 px-4 py-3">
            {!apiKey && (
              <p className="mb-2 rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-700">
                Agrega <strong>NEXT_PUBLIC_VOLTI_API_KEY</strong> para conectar
                con el bot real.
              </p>
            )}
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="Escribe tu consulta"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:bg-orange-500"
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5" />
        {open ? "Cerrar Volti" : "Habla con Volti"}
      </button>
    </div>
  );
};
