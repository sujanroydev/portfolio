const thoughts = [
  "Oyy, I love you...",
  "Oyy, I want to talk to you...",
  "Oyy, I miss you...",
  "Oyy, kaash abhi tumse baat ho jaaye...",
  "Oyy, tumhe message karne ka mann karta hai...",
];

const moments = [
  "Kabhi subah aankh khulte hi tum yaad aati ho.",
  "Kabhi dopahar mein bina kisi wajah ke tumhara khayal aa jaata hai.",
  "Shaam ko bhi, jab sab kuch normal chal raha hota hai.",
  "Khaana khaate waqt, kahin jaate waqt, chalte hue...",
  "Aur kabhi raat ke 2, 3 ya 4 baje, jab achanak neend khul jaati hai.",
];

export default function FeelingsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0d0d] px-5 py-20 text-[#f3e8ed]">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-rose-900/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[45%] h-96 w-96 rounded-full bg-pink-900/10 blur-[140px]" />

      <div className="relative mx-auto max-w-3xl">
        <header className="mb-20 text-center">
          <p className="mb-5 text-xs tracking-[0.4em] text-rose-300/60 uppercase">
            Something I never properly said
          </p>

          <h1 className="text-4xl font-serif leading-tight text-rose-100 sm:text-6xl">
            Jo Kabhi Keh Nahi Paya...
          </h1>

          <p className="mt-6 text-sm text-rose-100/50">
            Kuch baatein hain jo shayad lafzon mein kabhi keh nahi paaya.
          </p>
        </header>

        <section className="space-y-7 text-center">
          <p className="text-lg leading-9 text-rose-100/80 sm:text-xl">
            Pata nahi kab, kaise aur kitna...
            <br />
            lekin tum mere khayalon ka ek aisa hissa ban gayi ho jahan se tumhe
            nikaalna mere bas mein nahi lagta.
          </p>

          <p className="text-base leading-8 text-rose-100/60">
            Kabhi kabhi raat ko achanak 2, 3 ya 4 baje neend khul jaati hai.
            Aankhein khulti hain, aur pata nahi kyun, sabse pehla khayal tumhara
            hi aata hai.
          </p>
        </section>

        <section className="my-20 rounded-3xl border border-rose-200/10 bg-white/[0.035] p-7 shadow-2xl shadow-rose-950/10 sm:p-10">
          <p className="mb-8 text-center text-xs tracking-[0.3em] text-rose-300/60 uppercase">
            Dil mein baar baar
          </p>

          <div className="space-y-6 text-center">
            {thoughts.map((thought) => (
              <p
                key={thought}
                className="font-serif text-xl italic text-rose-100 sm:text-2xl"
              >
                {thought}
              </p>
            ))}
          </div>

          <p className="mt-9 text-center text-sm text-rose-100/40">
            Kabhi kabhi toh bas zor se chillane ka mann karta hai... ki oyy, I
            LOVE YOU!
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-center font-serif text-3xl text-rose-100">
            Har waqt, kahin na kahin...
          </h2>

          <p className="text-center leading-8 text-rose-100/60">
            Hamesha tumhari yaad aati hai. Sirf kisi ek waqt par nahi. Din ke
            alag-alag palon mein, bina kisi warning ke.
          </p>

          <div className="space-y-5 border-l border-rose-300/20 pl-6">
            {moments.map((moment, index) => (
              <p key={moment} className="text-base leading-8 text-rose-100/70">
                <span className="mr-3 text-rose-300/50">0{index + 1}</span>
                {moment}
              </p>
            ))}
          </div>
        </section>

        <section className="my-20 space-y-7 text-center">
          <p className="font-serif text-2xl leading-relaxed text-rose-100 sm:text-3xl">
            Kabhi tumhari photos dekh leta hoon.
            <br />
            Kabhi tumhe message likhne ka mann karta hai.
            <br />
            Kabhi bas tumse baat karne ka...
          </p>

          <p className="leading-8 text-rose-100/60">
            Phir sochta hoon, kya message karun? Kya kahun? Kaise baat shuru
            karun? Aur kabhi kabhi woh message sirf mere mann mein hi reh jaata
            hai.
          </p>
        </section>

        <section className="rounded-3xl border border-rose-200/10 bg-gradient-to-br from-rose-950/30 to-transparent p-8 text-center sm:p-12">
          <p className="mb-6 text-xs tracking-[0.3em] text-rose-300/60 uppercase">
            Ek baat sach hai
          </p>

          <h2 className="font-serif text-3xl leading-relaxed text-rose-100 sm:text-4xl">
            I don't know how to explain it...
            <br />
            but I really, really miss you.
          </h2>

          <p className="mt-8 leading-8 text-rose-100/60">
            Main tumse baat karna chahta hoon. Tumhare saath chhoti-chhoti
            baatein share karna chahta hoon. Tumhari awaaz sunna chahta hoon.
            Bas kabhi kabhi tumhare saath kuch waqt bitana chahta hoon.
          </p>
        </section>

        <section className="my-20 space-y-6 text-center">
          <p className="font-serif text-2xl text-rose-100">Aur haan...</p>

          <p className="leading-8 text-rose-100/65">
            Mujhe nahi pata tum mere baare mein kya sochti ho. Main tumse kisi
            jawab ki umeed ya koi pressure nahi rakhna chahta. Tumhari feelings
            tumhari hain, aur main unki respect karta hoon.
          </p>

          <p className="font-serif text-xl italic text-rose-200">
            Bas jo mere dil mein hai, woh tum tak pahunchana chahta tha.
          </p>
        </section>

        <footer className="pt-10 text-center">
          <div className="mb-5 text-2xl text-rose-300">♡</div>

          <p className="font-serif text-2xl italic text-rose-100">
            Some feelings are difficult to say...
          </p>

          <p className="mt-4 text-sm tracking-widest text-rose-100/40">
            Ajeeb sa khayal... 🥀
          </p>
        </footer>
      </div>
    </main>
  );
}
