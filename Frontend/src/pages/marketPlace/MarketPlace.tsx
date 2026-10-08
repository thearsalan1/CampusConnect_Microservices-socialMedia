import React, { useState } from "react";
import {
  ItemCategory,
  type ListingFilters,
} from "../../features/listing/types/listing.types";
import MarketItem from "./MarketItem";
import { Link } from "react-router-dom";

const MarketPlace = () => {
  const [filters, setFilters] = useState<ListingFilters>({
    page: 1,
    limit: 10,
  });
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen p-5 grid grid-cols-[30%_50%_18%] gap-3">
      {/* Left column → Filters */}
      <div className="h-[90%] rounded-xl border border-accent bg-card p-4">
        <h1 className="text-logo text-primary text-2xl mb-3">Filter Items</h1>
        <div className="w-full h-[1px] bg-text-muted mb-5" />

        <form onSubmit={handleOnSubmit}>
          {/* 🔍 Search */}
          <label className="text-sm text-body text-text-muted">
            Search item
          </label>
          <input
            type="text"
            className="w-full bg-background mt-2 rounded-xl p-2 text-text-muted 
                   focus:border-accent-hover border border-accent outline-none 
                   placeholder:text-text-muted text-sm mb-3"
            placeholder="Enter Item name..."
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            value={filters.search || ""}
          />

          {/* 💰 Min Price */}
          <label className="text-sm text-body text-text-muted">
            Minimum Price{" "}
            <span className="font-semibold">: ₹{filters.minPrice}</span>
          </label>
          <input
            type="range"
            className="w-full mt-2 mb-3 accent-accent"
            max={1000}
            min={10}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value) })
            }
            value={filters.minPrice || 10}
          />

          {/* 💰 Max Price */}
          <label className="text-sm text-body text-text-muted">
            Maximum Price{" "}
            <span className="font-semibold">: ₹{filters.maxPrice}</span>
          </label>
          <input
            type="range"
            className="w-full mt-2 mb-3 accent-accent"
            max={1000}
            min={10}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
            value={filters.maxPrice || 1000}
          />

          {/* 📂 Category Dropdown */}
          <label className="text-sm text-body text-text-muted">Category</label>
          <select
            className="w-full mt-2 mb-3 border rounded-xl p-2 text-sm border border-accent hover:border-accent-hover text-body bg-background text-text-muted outline-none"
            value={filters.category || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value as ItemCategory,
              })
            }
          >
            <option value="">-- Choose Category --</option>
            {Object.entries(ItemCategory).map(([key, value]) => (
              <option key={key} value={value} className="bg-card ">
                {key}
              </option>
            ))}
          </select>

          {/* ↕ Sort Dropdown */}
          <label className="text-sm text-body text-text-muted">Sort</label>
          <select
            className="w-full mt-2 mb-3 border rounded-xl p-2 text-sm border-accent hover:border-accent-hover text-body bg-background text-text-muted outline-none"
            value={filters.sortBy || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value as ListingFilters["sortBy"],
              })
            }
          >
            <option className="bg-card " value="">
              -- Choose Sort --
            </option>
            <option className="bg-card " value="newest">
              Newest
            </option>
            <option className="bg-card " value="oldest">
              Oldest
            </option>
            <option className="bg-card " value="priceLowToHigh">
              Price: Low → High
            </option>
            <option className="bg-card " value="priceHighToLow">
              Price: High → Low
            </option>
          </select>
          <button
            type="submit"
            className="w-full p-2 bg-primary hover:bg-primary-hover cursor-pointer text-xl text-text-primary rounded-2xl text-body mt-3"
            onClick={(e: React.FormEvent) => e.preventDefault()}
          >
            Search
          </button>
        </form>
      </div>

      {/* Middle column → Items */}
      <div className="h-[90%] rounded-xl border border-accent overflow-auto no-scrollbar">
        <MarketItem {...filters} />
      </div>

      {/* Right column → Extra content (placeholder) */}
      <div className="h-fit rounded-xl border border-accent bg-card p-4">
        <h2 className="text-heading text-text-primary text-xl mb-5">
          Extra Panel
        </h2>
        <div className="w-full  h-full flex flex-col gap-3">
          <Link
            to={"/market-place/my-items"}
            className="bg-primary w-full px-4 py-2 text-text-primary text-center text-body rounded hover:bg-primary-hover border-accent border"
          >
            My Items
          </Link>
          <Link
            to={"/market-place/add"}
            className="bg-primary w-full px-4 py-2 text-text-primary text-center text-body rounded hover:bg-primary-hover border-accent border"
          >
            Add Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
