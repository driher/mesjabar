import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    // Cek API Key saat request
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY belum dikonfigurasi" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Email ke subscriber
    await resend.emails.send({
      from: "MES Jawa Barat <no-reply@ekonomisyariahjabar.id>",
      to: email,
      subject: "Konfirmasi Langganan Newsletter MES Jabar",
      html: `
        <p>Terima kasih telah bergabung!</p>
        <p>Anda akan menerima update ekonomi syariah terbaru dari kami.</p>
      `,
    });

    // Email ke admin
    await resend.emails.send({
      from: "Sistem Website <system@ekonomisyariahjabar.id>",
      to: "admin@ekonomisyariahjabar.id",
      subject: "Pendaftar Newsletter Baru",
      html: `
        <p>Ada subscriber baru:</p>
        <p><strong>${email}</strong></p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal memproses permintaan" },
      { status: 500 }
    );
  }
}