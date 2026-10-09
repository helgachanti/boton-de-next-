 
"use server";

export type Result = {
  success: boolean;
  message: string;
};

export async function celebrate(): Promise<Result> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const post = await response.json();

    if (!post || !post.title) {
      throw new Error("La API no devolvió datos válidos.");
    }

    return {
      success: true,
      message: "¡Felicidades, estás mostrando un dato!",
    };
  } catch (error) {
    console.error("Error al consultar la API:", error);

    return {
      success: false,
      message: "Algo salió mal, sigue intentando",
    };
  }
}