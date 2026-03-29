import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F5F0] text-center px-6">
      <h1 className="font-serif text-5xl text-onyx mb-4">404</h1>
      <p className="font-sans text-charcoal/70 text-sm tracking-widest uppercase mb-8">
        Sayfa bulunamadı
      </p>
      <Link
        href="/"
        className="inline-block border border-onyx text-onyx text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-onyx hover:text-white transition-colors duration-300"
      >
        Ana Sayfa
      </Link>
    </main>
  );
}
