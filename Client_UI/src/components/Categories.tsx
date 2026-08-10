import { useEffect, useRef, useState } from "react";
import { FaCaretLeft } from "react-icons/fa6";
import { IoCaretForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { useFetch } from "../customhooks/useFetch";
import type { ICategory } from "../types";

const Categories = () => {
  // const { data: categories, loading: categoriesLoading } = useFetch("http://localhost:9000/public/category");
  const { data:categories, loading:categoriesLoading } = useFetch<ICategory[]>("http://localhost:9000/category");
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState("");

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();

    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const scroll = (direction: number) => {
    scrollRef.current?.scrollBy({
      left: direction * 250,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto  px-4 relative bg-gray-100 mt-2">
        {categoriesLoading && <p>Loading...</p>}

        {!categoriesLoading && (
          <>
            {/* Left Button */}
            <button
              onClick={() => scroll(-1)}
              disabled={!showLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20
              h-9 w-9 rounded-full bg-white shadow border
              flex justify-center items-center
              disabled:opacity-30 "
            >
              <FaCaretLeft />
            </button>

            {/* Categories */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide px-10 py-2"
            >
              {categories?.map((item: any) => (
                <CategoriesMap
                  key={item._id}
                  name={item.name}
                  slug={item.slug}
                  active={active === item._id}
                  onClick={() => setActive(item._id)}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => scroll(1)}
              disabled={!showRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20
              h-9 w-9 rounded-full bg-white shadow border
              flex justify-center items-center
              disabled:opacity-30"
            >
              <IoCaretForwardOutline />
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Categories;

const CategoriesMap = ({ name, slug, active, onClick }:{name:string,slug:string,active:boolean,onClick:()=>void} ) => {
  return (
    <Link to={`/products/${slug}`}>
      <button
        onClick={onClick}
        className={`px-5 py-2 rounded-full border  whitespace-nowrap transition-all duration-300 cursor-pointer
        ${
          active
            ? "bg-green-600 text-white border-green-600"
            : "bg-[#f0f0f0] text-gray-700 hover:bg-green-50 hover:-translate-y-1"
        }`}
      >
        {name}
      </button>
    </Link>
  );
};
