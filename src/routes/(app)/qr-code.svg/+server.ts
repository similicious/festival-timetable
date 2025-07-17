import type { RequestHandler } from "@sveltejs/kit";
import { generate } from "lean-qr";
import { toSvgSource } from "lean-qr/extras/svg";
import festival from "$lib/data/festival.json";

export const prerender = true;

export const GET: RequestHandler = ({ setHeaders }) => {
  const qrCode = generate(festival.public_url);
  const qrCodeSvg = toSvgSource(qrCode, { padX: 0, padY: 0, on: "#e7e3e4" });

  setHeaders({ "Content-Type": "image/svg+xml" });
  return new Response(qrCodeSvg);
};
