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
                      : "border border-dashed border-slate-300 bg-slate-100 text-slate-700"
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200 px-4 py-3">
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
        className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-orange-200 transition hover:-translate-y-0.5 hover:shadow-2xl"
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
