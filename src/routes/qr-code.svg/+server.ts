import type { RequestHandler } from "@sveltejs/kit";
import { generate } from "lean-qr";
import { toSvgSource } from "lean-qr/extras/svg";
import { PUBLIC_URL } from "$env/static/public";

export const prerender = true;

export const GET: RequestHandler = ({ setHeaders }) => {
  const qrCode = generate(PUBLIC_URL);
  const qrCodeSvg = toSvgSource(qrCode, { padX: 0, padY: 0, on: "#e7e3e4" });

  setHeaders({ "Content-Type": "image/svg+xml" });
  return new Response(qrCodeSvg);
};
