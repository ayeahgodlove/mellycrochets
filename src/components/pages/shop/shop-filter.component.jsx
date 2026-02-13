"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

const PARAM_NAMES = {
  name: "name",
  crochetTypeId: "crochetTypeId",
};

export default function ShopFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [crochetTypes, setCrochetTypes] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [name, setName] = useState("");
  const [crochetTypeId, setCrochetTypeId] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const typesRes = await fetch("/api/crochet_types");
        if (typesRes.ok) {
          const data = await typesRes.json();
          setCrochetTypes(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Failed to load filter options", e);
      } finally {
        setLoadingOptions(false);
      }
    };
    load();
  }, []);

  const syncFromUrl = useCallback(() => {
    setName(searchParams.get(PARAM_NAMES.name) ?? "");
    setCrochetTypeId(searchParams.get(PARAM_NAMES.crochetTypeId) ?? "");
  }, [searchParams]);

  useEffect(() => {
    syncFromUrl();
  }, [syncFromUrl]);

  const buildParams = () => {
    const params = new URLSearchParams();
    if (name.trim()) params.set(PARAM_NAMES.name, name.trim());
    if (crochetTypeId) params.set(PARAM_NAMES.crochetTypeId, crochetTypeId);
    return params;
  };

  const applyFilters = () => {
    const params = buildParams();
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
    setExpanded(false);
  };

  const clearFilters = () => {
    setName("");
    setCrochetTypeId("");
    router.push("/shop");
    setExpanded(false);
  };

  const hasActiveFilters = name.trim() || crochetTypeId;

  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white shadow-sm overflow-hidden">
      {/* Always-visible search + filter toggle (mobile) */}
      <div className="flex flex-col sm:flex-row gap-3 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" aria-hidden />
          <input
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#82181a]/20 focus:border-[#82181a] transition-colors"
            aria-label="Search by product name"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-[#fafaf9] text-[#374151] font-medium hover:bg-[#f5f5f5] hover:border-[#d4d4d4] transition-colors sm:flex-1"
            aria-expanded={expanded}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#82181a]" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={applyFilters}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#82181a] text-white font-medium hover:bg-[#701618] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {expanded && (
        <div className="shop-filter-panel border-t border-[#e5e5e5] bg-[#fafaf9] p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[140px]">
              <label className="block text-xs font-medium text-[#6b7280] mb-1.5">
                Type
              </label>
              <select
                value={crochetTypeId}
                onChange={(e) => setCrochetTypeId(e.target.value)}
                disabled={loadingOptions}
                className="w-full px-3 py-2.5 rounded-xl border border-[#e5e5e5] bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#82181a]/20 focus:border-[#82181a] transition-colors"
                aria-label="Crochet type"
              >
                <option value="">All types</option>
                {crochetTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[#6b7280] hover:bg-white hover:text-[#82181a] border border-[#e5e5e5] transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
