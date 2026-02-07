export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-dark bg-cream-dark/30">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-slate-muted text-sm">
          A program of the Leadership Academy, in partnership with{" "}
          <a
            href="https://www.walshcollege.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:text-amber-dark underline underline-offset-2"
          >
            Walsh College
          </a>
        </p>
      </div>
    </footer>
  );
}
