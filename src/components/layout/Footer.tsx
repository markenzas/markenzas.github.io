export function Footer() {
  return (
    <footer className="bg-forest text-sand/50 px-4 py-5 text-center text-sm border-t border-sand/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 font-body">
          <span className="text-caramel/60">♟</span>
          Board Game Helpers
        </p>
        <p className="font-body">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/markenzas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-caramel/80 hover:text-caramel transition-colors duration-200 underline decoration-caramel/30 underline-offset-2 hover:decoration-caramel/60"
          >
            markenzas
          </a>
        </p>
      </div>
    </footer>
  );
}
