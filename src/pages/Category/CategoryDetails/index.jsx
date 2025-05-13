import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import { Breadcrumbs, ProductCard } from "../../../components";
import { useProductsByCategory } from "../../../hooks";
import { parseQueryParams } from "../../../utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./CategoryDetails.scss";

const PRODUCTS_PER_PAGE = 9;

const formatCategoryName = (name) => {
  if (!name) return "Products";
  return name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const CategoryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = parseQueryParams(location.search);

  const currentCategory = queryParams?.category;
  const priceGte = queryParams?.price_gte;
  const priceLte = queryParams?.price_lte;
  const colorsParam = queryParams?.colors;
  const currentPageFromUrl = parseInt(queryParams?.page || "1", 10);

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  const filtersForHook = {
    category: currentCategory,
    price_gte: priceGte !== undefined ? parseFloat(priceGte) : undefined,
    price_lte: priceLte !== undefined ? parseFloat(priceLte) : undefined,
    colors: colorsParam ? colorsParam.split(",") : undefined,
  };

  const {
    data: allFilteredProducts,
    isLoading,
    isError,
    error,
  } = useProductsByCategory(filtersForHook);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, priceGte, priceLte, colorsParam]);

  useEffect(() => {
    setCurrentPage(currentPageFromUrl);
  }, [currentPageFromUrl]);

  // --- Paginatsiya Hisob-Kitoblari ---
  // Bu o'zgaruvchilarni return blokidan oldin va kerakli joyda e'lon qilamiz
  const totalProducts = allFilteredProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // Joriy sahifadagi mahsulotlar
  // Bu hisob-kitoblarni return dan oldin, lekin allFilteredProducts mavjudligini bilganimizdan keyin qilamiz
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts); // totalProducts dan oshib ketmasligi uchun

  const currentProducts = allFilteredProducts
    ? allFilteredProducts.slice(startIndex, endIndex) // endIndex endi to'g'ri hisoblanadi
    : [];

  const handlePageChange = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      const currentParams = new URLSearchParams(location.search);
      currentParams.set("page", newPage.toString());
      navigate(`${location.pathname}?${currentParams.toString()}`, {
        replace: true,
      });
    }
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    {
      label: formatCategoryName(currentCategory || "All Categories"),
      path: currentCategory
        ? `/category?category=${currentCategory}`
        : "/category",
    },
  ];

  const generatePageNumbers = () => {
    // ... (generatePageNumbers funksiyasi avvalgidek qoladi) ...
    if (totalPages <= 1) return [];
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;
    range.push(1);
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      if (!range.includes(i)) {
        range.push(i);
      }
    }
    if (totalPages > 1 && !range.includes(totalPages)) {
      range.push(totalPages);
    }
    range.sort((a, b) => a - b);
    range.forEach((i) => {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });
    return rangeWithDots;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="container category-details-page">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="category-details-content">
        <div className="category-details-content__sidebar">
          <FilterSidebar />
        </div>
        <div className="category-details-content__products">
          <div className="products-header">
            <h2>{formatCategoryName(currentCategory)}</h2>
            <div className="products-header__info">
              {/* Bu yerda startIndex va endIndex dan foydalanamiz */}
              {!isLoading && !isError && allFilteredProducts && (
                <span>
                  Showing {totalProducts > 0 ? startIndex + 1 : 0}-
                  {/* endIndex to'g'ridan-to'g'ri ishlatiladi, Math.min avvalroq qilingan */}
                  {endIndex} of {totalProducts} Products
                </span>
              )}
            </div>
          </div>

          {isLoading && <p className="loading-text">Loading products...</p>}
          {isError && (
            <p className="error-text">
              Error loading products:{" "}
              {error?.message || "An unknown error occurred."}
            </p>
          )}
          {!isLoading &&
            !isError &&
            (!allFilteredProducts || allFilteredProducts.length === 0) && (
              <p className="no-products-text">
                No products found matching your criteria. Try adjusting the
                filters.
              </p>
            )}

          <div className="products-grid">
            {!isLoading &&
              !isError &&
              currentProducts &&
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-button prev-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft /> Previous
              </button>
              <div className="page-numbers">
                {pageNumbers.map((page, index) =>
                  page === "..." ? (
                    <span key={`dots-${index}`} className="dots">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`page-number ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                className="pagination-button next-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
