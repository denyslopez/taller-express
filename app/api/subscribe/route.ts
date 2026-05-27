import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, tag } = await request.json();

    // 1. Server-side validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Por favor, ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    // 2. Check if Brevo is configured
    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey) {
      // Brevo is not configured yet. Print a trace log in development, and return a mocked successful response.
      console.log(
        `[MOCK SUBSCRIPTION] Email: ${email}, Name: ${name || "N/A"}, Tag: ${tag}. Brevo not configured yet. Bypassing and returning success.`
      );
      
      // Simulate small server latency for realistic loading experience
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      return NextResponse.json({ success: true, mocked: true });
    }

    // 3. Perform real Brevo registration
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FNAME: name || "",
        },
        listIds: [Number(listId || 1)],
        updateEnabled: true,
        tags: [tag],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo registration failed:", errorData);
      return NextResponse.json(
        { error: "Error al registrar el contacto. Intenta de nuevo más tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription Route Error:", error);
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
