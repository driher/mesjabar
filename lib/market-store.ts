// lib/market-store.ts
export let marketCache: any = [];
export let lastUpdate: string | null = null;
export let session: "MORNING" | "AFTERNOON" | "OFF" = "OFF";