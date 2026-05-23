// /api/update-market.ts
export default async function handler(req, res) {
  const data = await fetchIDXData();

  await saveToDB({
    session: isMorning() ? "morning" : "afternoon",
    topGainersSyariah: data
  });

  res.json({ ok: true });
}