export async function GET() {
  try {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const data = await res.json();
    const rates = data.rates;

    const usdToIdr = rates.IDR;

    return Response.json({
      USD: usdToIdr,                 // 1 USD = IDR
      EUR: rates.EUR * usdToIdr,     // 1 EUR = IDR
      SAR: rates.SAR * usdToIdr,     // 1 SAR = IDR (Riyal)
      JPY: rates.JPY * usdToIdr,
      AUD: rates.AUD * usdToIdr,
    });

  } catch (e) {
    return Response.json(
      { error: "failed" },
      { status: 500 }
    );
  }
}