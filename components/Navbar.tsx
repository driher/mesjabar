"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Menu,
  X,
  Search,
  ChevronDown,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import GoogleTranslate from "@/components/GoogleTranslate";

const menus = [
  { label: "Beranda", href: "/" },

  {
    label: "Profil MES",
    href: "#",
    submenu: [
      {
        label: "Sejarah",
        href: "/profil-mes/sejarah",
      },
      {
        label: "Visi Misi",
        href: "/profil-mes/visimisi",
      },
      {
        label: "Legalitas",
        href: "/profil-mes/legalitas",
      },
    ],
  },

{
    label: "Pengurus",
    href: "#",
    submenu: [
      {
        label: "Dewan Pembina",
        href: "/profil-mes/pembina",
      },
  {
        label: "Dewan Pakar",
        href: "/profil-mes/dewan-pakar",
      },
{
        label: "Pengurus Harian",
        href: "/profil-mes/harian",
      },
{
        label: "Departemen",
        href: "/profil-mes/departemen",
      },
{
        label: "Manager Eksekutif",
        href: "/profil-mes/eksekutif",
      },
    ],
  },


  {
    label: "Program",
    href: "/program",
  },

  {
    label: "Agenda",
    href: "/agenda",
  },

  {
    label: "Berita",
    href: "/news",
  },
];

export default function Header() {
  const [open, setOpen] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } =
        await supabase.auth.getUser();

      setUser(data.user);
    };

    getUser();

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(
            session?.user || null
          );
        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout =
    async () => {
      await supabase.auth.signOut();

      setUser(null);

      router.push("/");
    };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-100
        bg-white/95
        backdrop-blur-xl
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center"
          >
            <div
              className="
                relative
                w-[180px]
                h-[70px]
                md:w-[220px]
                md:h-[90px]
              "
            >
              <Image
                src="/logo-mes-jabar.png"
                alt="MES Jabar"
                fill
                priority
                sizes="220px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP MENU */}

          <nav className="hidden lg:flex items-center gap-8">

            {menus.map((menu) => (
              <div
                key={menu.label}
                className="relative group"
              >
                {!menu.submenu ? (
                  <Link
                    href={menu.href}
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                      hover:text-green-700
                    "
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="
                        flex
                        items-center
                        gap-1
                        text-sm
                        font-medium
                        text-gray-700
                        hover:text-green-700
                      "
                    >
                      {menu.label}

                      <ChevronDown
                        className="
                          h-4
                          w-4
                          transition-transform
                          group-hover:rotate-180
                        "
                      />
                    </button>

                    {/* dropdown gap fix */}

                    <div
                      className="
                        absolute
                        left-0
                        top-full
                        pt-2
                        invisible
                        opacity-0
                        group-hover:visible
                        group-hover:opacity-100
                        transition
                      "
                    >
                      <div
                        className="
                          w-60
                          overflow-hidden
                          rounded-2xl
                          border
                          bg-white
                          shadow-xl
                        "
                      >
                        {menu.submenu.map(
                          (sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="
                                block
                                px-5
                                py-3
                                text-sm
                                text-gray-700
                                hover:bg-green-50
                                hover:text-green-700
                              "
                            >
                              {sub.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            <GoogleTranslate />
          </nav>

          {/* RIGHT */}

          <div className="flex items-center gap-2">

            <Link
              href="/search"
              className="
                hidden
                md:flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
              "
            >
              <Search className="h-5 w-5" />
            </Link>

            {!user ? (
              <Link
                href="/login"
                className="
                  hidden
                  md:inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-700
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  hover:bg-green-800
                "
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="
                  hidden
                  md:inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  hover:bg-red-700
                "
              >
                Logout
              </button>
            )}

            <Link
              href="/pakar"
              className="
                hidden
                md:inline-flex
                rounded-xl
                bg-green-700
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-green-800
              "
            >
              Direktori Pakar
            </Link>

            <button
              onClick={() =>
                setOpen(!open)
              }
              className="
                lg:hidden
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
              "
            >
              {open ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}

      <div
        className={`
          lg:hidden
          overflow-hidden
          transition-all
          duration-300
          ${
            open
              ? "max-h-[1000px]"
              : "max-h-0"
          }
        `}
      >
        <div className="border-t bg-white">

          <div className="px-4 py-2">

            {menus.map((menu) => (
              <MobileAccordionMenu
                key={menu.label}
                menu={menu}
                onClose={() =>
                  setOpen(false)
                }
              />
            ))}

          </div>

          <div className="px-4 pb-3">

            <Link
              href="/pakar"
              onClick={() =>
                setOpen(false)
              }
              className="
                block
                rounded-xl
                bg-green-700
                py-3
                text-center
                font-semibold
                text-white
              "
            >
              Direktori Pakar
            </Link>

          </div>

          <div className="px-4 pb-5">

            {!user ? (
              <Link
                href="/login"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  block
                  rounded-xl
                  border
                  border-green-700
                  py-3
                  text-center
                  font-semibold
                  text-green-700
                "
              >
                Login Member
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="
                  w-full
                  rounded-xl
                  bg-red-600
                  py-3
                  font-semibold
                  text-white
                "
              >
                Logout
              </button>
            )}

          </div>

        </div>
      </div>

    </header>
  );
}

function MobileAccordionMenu({
  menu,
  onClose,
}: {
  menu: any;
  onClose: () => void;
}) {
  const [open, setOpen] =
    useState(false);

  if (!menu.submenu) {
    return (
      <Link
        href={menu.href}
        onClick={onClose}
        className="
          flex
          items-center
          justify-between
          border-b
          py-4
          font-medium
          text-gray-700
        "
      >
        {menu.label}
      </Link>
    );
  }

  return (
    <div className="border-b">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex
          w-full
          items-center
          justify-between
          py-4
          font-medium
          text-gray-700
        "
      >
        {menu.label}

        <ChevronDown
          className={`
            h-4
            w-4
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${
            open
              ? "max-h-96 pb-3"
              : "max-h-0"
          }
        `}
      >
        {menu.submenu.map(
          (sub: any) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              className="
                block
                rounded-lg
                px-3
                py-3
                text-sm
                text-gray-600
                hover:bg-green-50
                hover:text-green-700
              "
            >
              {sub.label}
            </Link>
          )
        )}
      </div>

    </div>
  );
}