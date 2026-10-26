import { CheckCircle2 } from "lucide-react";
import Logo from "./Logo";

const highlights = [
  "Create groups and add members",
  "Split expenses equally or exactly",
  "Track balances and settlements clearly",
];

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="relative hidden overflow-hidden bg-sidebar px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-14">
        <Logo inverted />
        <div className="max-w-md">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
            Split shared expenses with clarity.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            A calm, professional workspace for groups, balances, and settlements.
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 size={18} className="mt-0.5 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-gray-500">Expense Splitter</p>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-[26rem]">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="section-card p-6 md:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
          {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
