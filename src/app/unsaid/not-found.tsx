import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-[#100e13] px-5 py-9 text-center text-[#f5edf1] sm:px-6 sm:py-12"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 43%, rgba(102,63,83,.20), transparent 38%), radial-gradient(ellipse at 50% 100%, rgba(80,50,72,.13), transparent 45%)",
      }}
    >
      {/* Ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[170px] -top-[260px] -z-10 h-[380px] w-[380px] rounded-full border border-[#e8bfd0]/[0.08] shadow-[0_0_100px_rgba(232,191,208,0.04)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[270px] -right-[240px] -z-10 h-[540px] w-[540px] rounded-full border border-[#e8bfd0]/[0.08]"
      />

      <section
        className="w-full max-w-[620px]"
        aria-labelledby="not-found-title"
      >
        <div className="flex items-center justify-center gap-[13px] text-[9px] font-semibold tracking-[0.28em] text-[#a99ba5]">
          <span className="h-px w-7 bg-[#e8bfd0]/40" />
          <span>EK ADHOORA PANNA</span>
          <span className="h-px w-7 bg-[#e8bfd0]/40" />
        </div>

        {/* Moon illustration */}
        <div
          aria-hidden="true"
          className="relative mx-auto my-[26px] grid h-[205px] w-[230px] place-items-center"
        >
          <span className="absolute h-[190px] w-[190px] scale-x-[0.72] rotate-[-28deg] rounded-full border border-[#e8bfd0]/[0.13]" />
          <span className="absolute h-[190px] w-[190px] scale-x-[0.72] rotate-[28deg] rounded-full border border-[#e8bfd0]/[0.13]" />
          <span className="absolute right-8 top-[27px] text-[19px] text-[#e8bfd0] drop-shadow-[0_0_14px_rgba(232,191,208,0.6)]">
            ✦
          </span>
          <span className="absolute bottom-9 left-[25px] text-[22px] text-[#e8bfd0] drop-shadow-[0_0_14px_rgba(232,191,208,0.6)]">
            ✧
          </span>
          <span className="absolute left-[30px] top-[57px] text-[32px] leading-none text-[#e8bfd0] drop-shadow-[0_0_14px_rgba(232,191,208,0.6)]">
            ·
          </span>
          <div className="relative h-[92px] w-[92px] overflow-hidden rounded-full bg-gradient-to-br from-[#f4dce6] via-[#c18da8] to-[#82566f] shadow-[0_0_55px_rgba(218,157,185,0.22),inset_-10px_-8px_18px_rgba(63,35,54,0.22)]">
            <span className="absolute -left-[8px] top-[-9px] h-[90px] w-[90px] rounded-full bg-[#17131b] shadow-[-8px_5px_22px_rgba(22,15,23,0.3)]" />
          </div>
          <div className="absolute bottom-[26px] right-2 flex -rotate-[9deg] items-center gap-2 rounded-[7px] border border-white/[0.16] bg-[#1f1821]/80 px-[11px] py-[9px] shadow-[0_12px_35px_rgba(0,0,0,0.25)] backdrop-blur-[10px]">
            <span className="font-serif text-[14px] tracking-[0.08em] text-[#e8bfd0]">
              04
            </span>
            <span className="h-4 w-px bg-[#e8bfd0]/35" />
            <span className="font-serif text-[14px] tracking-[0.08em] text-[#e8bfd0]">
              04
            </span>
          </div>
        </div>

        <p className="mb-[10px] text-[10px] font-bold tracking-[0.32em] text-[#c995ae]">
          ERROR 404
        </p>
        <h1
          id="not-found-title"
          className="m-0 font-serif text-[clamp(52px,10vw,78px)] font-normal leading-[1.05] tracking-[-0.055em]"
        >
          Kuch panne{" "}
          <em className="font-normal not-italic text-[#e8bfd0]">
            kho jaate hain.
          </em>
        </h1>
        <p className="mx-auto mb-7 mt-5 text-[13px] leading-[1.9] text-[#a49aa5] sm:text-sm">
          Shayad yeh panna kabhi tha hi nahi… ya kahin yaadon ke beech kho gaya.
          <br className="hidden sm:block" /> Chalo, wapas chalte hain.
        </p>

        <Link
          href="/unsaid"
          className="group inline-flex min-h-12 items-center gap-[25px] rounded-[3px] border border-[#e8bfd0]/40 bg-[#e8bfd0]/[0.07] px-[19px] text-xs tracking-[0.04em] text-[#f6eaf0] no-underline transition duration-300 hover:-translate-y-0.5 hover:border-[#e8bfd0]/80 hover:bg-[#e8bfd0]/[0.14] motion-reduce:transition-none"
        >
          <span>Wapas chalo</span>
          <span
            className="text-[17px] text-[#e8bfd0] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          >
            ↗
          </span>
        </Link>

        <p className="mt-12 text-[8px] font-semibold tracking-[0.24em] text-[#756b76] sm:mt-[62px]">
          KUCH BAATEIN ADHOORI REH KAR BHI YAAD REHTI HAIN{" "}
          <span className="ml-[5px] text-[#c995ae]">✳</span>
        </p>
      </section>
    </main>
  );
}
