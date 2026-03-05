export function Footer() {
  return (
    <footer className="bg-forest text-sand/50 px-4 py-5 text-center text-md border-t border-sand/10">
      <div className="mx-auto items-center">
        {new Date().getFullYear()} - {' '}

        <a
          href="https://github.com/markenzas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-caramel/80 hover:text-caramel transition-colors duration-200 underline decoration-caramel/30 underline-offset-2 hover:decoration-caramel/60"
        >
          markenzas
        </a>
      </div>
    </footer>
  );
}
