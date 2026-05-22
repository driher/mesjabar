export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();

    const r = data.rates;
    const usdToIdr = r.IDR;

    return Response.json({
      USD: usdToIdr,
      EUR: usdToIdr / r.EUR,
      SAR: usdToIdr / r.SAR,
      JPY: usdToIdr / r.JPY,
      AUD: usdToIdr / r.AUD,
      GBP: usdToIdr / r.GBP,
      SGD: usdToIdr / r.SGD,
      MYR: usdToIdr / r.MYR,
      THB: usdToIdr / r.THB,
      KRW: usdToIdr / r.KRW,
      CNY: usdToIdr / r.CNY,
      INR: usdToIdr / r.INR,
      CHF: usdToIdr / r.CHF,
      CAD: usdToIdr / r.CAD,
    });

  } catch (e) {
    return Response.json({ error: "failed" }, { status: 500 });
  }
}