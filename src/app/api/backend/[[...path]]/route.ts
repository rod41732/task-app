import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

async function passthrough(req: NextRequest) {
  if (!req.url) {
    return;
  }
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/backend\//, "/"); // remove /api/backend part
  const query = url.search; // will be e.g. '', '?a=1'

  const backendUrl = `${BACKEND_URL}${path}${query}`;
  console.log("Will fetch", backendUrl);

  const extraParam =
    typeof req.body?.getReader === "function" ? { duplex: "half" } : {};

  const headers = Object.fromEntries([...req.headers.entries()]);
  const res = await fetch(backendUrl, {
    method: req.method,
    headers: {
      ...headers,
      Host: new URL(BACKEND_URL as string).host, // avoid passing original host
    },
    body: req.method == "GET" ? undefined : req.body,
    ...extraParam,
  });

  if (!res.ok) {
    const text = await res.text();
    let err = text;
    try {
      err = JSON.parse(err);
    } catch {}
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export {
  passthrough as DELETE,
  passthrough as GET,
  passthrough as OPTIONS,
  passthrough as PATCH,
  passthrough as POST,
  passthrough as PUT,
};
