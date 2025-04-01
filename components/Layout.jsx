"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Login", href: "/login" },
];
const Layout = ({ children }) => {
  const pathname = usePathname();
  const blackList = ["/login", "/signup"];

  const isBlacklist = blackList.includes(pathname);

  if (isBlacklist) return <div>{children}</div>;

  return (
    <div>
      <nav className='sticky bg-white shadow-lg top-0 left-0 w-full px-[10%] py-6 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>HeroTech</h1>

        <div className='flex items-center gap-16'>
          {menus.map((menu, i) => (
            <Link
              href={menu.href}
              key={i}
              className={
                pathname === menu.href
                  ? "border-b-2 font-semibold border-blue-700 "
                  : ""
              }
            >
              {menu.label}
            </Link>
          ))}
          <Link
            href='/signup'
            className='bg-violet-600 px-12 py-3 rounded text-white'
          >
            Signup
          </Link>
        </div>
      </nav>

      <section className='px-[10%] py-16'>{children}</section>
      <footer className='bg-gray-950 h-[450px] flex items-center justify-center to-white text-3xl'>
        my fotter
      </footer>
    </div>
  );
};

export default Layout;
