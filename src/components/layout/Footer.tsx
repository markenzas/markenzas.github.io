export function Footer() {
  return (
    <footer className="bg-forest text-sand/50 text-md border-sand/10 border-t px-4 py-5 text-center">
      <div className="mx-auto items-center">
        {new Date().getFullYear()} @{" "}
        <a
          href="https://github.com/markenzas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-caramel/80 hover:text-caramel decoration-caramel/30 hover:decoration-caramel/60 underline underline-offset-2 transition-colors duration-200"
        >
          markenzas
        </a>
      </div>
    </footer>
  );
}
