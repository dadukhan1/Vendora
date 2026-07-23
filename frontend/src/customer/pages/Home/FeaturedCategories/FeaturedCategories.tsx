/** @format */

import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../Redux Toolkit/store";

const FeaturedCategories = () => {
  const { categories } = useAppSelector((state) => state.category);
  const navigate = useNavigate();

  const featured = categories.filter((cat) => cat.showOnHomepage && cat.isActive);

  if (featured.length === 0) return null;

  return (
    <div className="px-4 lg:px-6">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
        {featured.map((cat, i) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/products/${cat.categoryId}`)}
            className="group cursor-pointer"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl lg:rounded-3xl bg-[#f0ece6] mb-3 shadow-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                style={{ transform: "scale(1)", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/30 transition-all duration-500" />

              {/* Browse pill - appears on hover */}
              <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                <span className="badge-pill badge-ink text-[10px] shadow-lg">
                  Browse →
                </span>
              </div>
            </div>

            {/* Category name */}
            <p className="text-center text-[12px] lg:text-[13px] font-[700] font-[Outfit] text-[#1a1a1a] group-hover:text-[#c9993a] transition-colors duration-300 tracking-[-0.01em]">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
