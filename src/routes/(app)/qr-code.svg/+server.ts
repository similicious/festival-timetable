import { getFestival } from "$lib/utils/get-festival";
import type { RequestHandler } from "@sveltejs/kit";
import { generate } from "lean-qr";
import { toSvgSource } from "lean-qr/extras/svg";

export const prerender = true;

export const GET: RequestHandler = async ({ setHeaders }) => {
  const festival = await getFestival();
  const qrCode = generate(festival.publicUrl);
  const qrCodeSvg = toSvgSource(qrCode, { padX: 0, padY: 0, on: "#e7e3e4" });

  setHeaders({ "Content-Type": "image/svg+xml" });
  return new Response(qrCodeSvg);
};
