 
"use client";

import { useState, useTransition } from "react";
import { celebrate } from "./actions";

export default function CelebrateButton() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  function handleClick() {
    setResult(null);

    startTransition(async () => {
      const response = await celebrate();
      setResult(response);
    });
  }

  return (
    <main className="celebration">
      <div className="decoration" aria-hidden="true">
        🎈 🎈 🎈
      </div>

      <h1>¡Vamos a probar la API!</h1>
      <p>Presiona el botón y descubre qué sucede.</p>

      <button
        className="red-button"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? "Consultando..." : "¡APRETAME!"}
      </button>

      {isPending && (
        <p role="status">Conectando con la API...</p>
      )}

      {result && (
        <section
          className={`result ${
            result.success ? "success" : "failure"
          }`}
          aria-live="polite"
          role="status"
        >
          {result.success ? (
            <>
              <div className="balloons" aria-hidden="true">
                🎈 🎊 🎈
              </div>
              <div className="confsetti" aria-hidden="true">
                {Array.from({ length: 30 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      left: `${(i * 37) % 100}%`,
                      animationDelay: `${(i % 10) * 0.12}s`,
                    }}
                  >
                    {i % 2 === 0 ? "🎉" : "✨"}
                  </span>
                ))}
              </div>
              <h2>{result.message}</h2>
              <p>¡La petición a la API fue exitosa!</p>
            </>
          ) : (
            <>
              <div className="sad-face" aria-hidden="true">
                😞
              </div>
              <h2>{result.message}</h2>
              <p>Comprueba tu conexión e inténtalo otra vez.</p>
            </>
          )}
        </section>
      )}
    </main>
  );
}