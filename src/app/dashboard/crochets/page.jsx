"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "../../../lib/format";
import PageBreadCrumbs from "../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@/components/refine";
import { Input, Select, Space, Table } from "@/components/ui";
import { useMany, useSelect } from "@refinedev/core";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CrochetList() {
  const { tableProps, filters, setFilters } = useTable({
    syncWithLocation: true,
  });

  const nameFilter = useMemo(() => filters?.find((f) => f.field === "name"), [filters]);
  const crochetTypeFilter = useMemo(() => filters?.find((f) => f.field === "crochetTypeId"), [filters]);
  const [searchInput, setSearchInput] = useState(nameFilter?.value ?? "");
  useEffect(() => {
    setSearchInput(nameFilter?.value ?? "");
  }, [nameFilter?.value]);

  const { query: allTypesQuery } = useSelect({
    resource: "crochet_types",
    optionLabel: "name",
    optionValue: "id",
  });
  const allCrochetTypes = allTypesQuery?.data?.data ?? allTypesQuery?.data ?? [];
  const crochetTypeOptions = useMemo(
    () => allCrochetTypes.map((c) => ({ label: c.name, value: String(c.id) })),
    [allCrochetTypes]
  );

  const applyFilters = (nameValue, typeValue) => {
    const next = [];
    if (nameValue != null && String(nameValue).trim() !== "") {
      next.push({ field: "name", operator: "contains", value: String(nameValue).trim() });
    }
    if (typeValue != null && String(typeValue).trim() !== "") {
      next.push({ field: "crochetTypeId", operator: "eq", value: String(typeValue).trim() });
    }
    setFilters(next, "replace");
  };

  const clearFilters = () => {
    setSearchInput("");
    setFilters([], "replace");
  };

  const crochetTypeIds = tableProps?.dataSource
    ? [...new Set(
        tableProps.dataSource
          .map((item) => item?.crochetTypeId ?? item?.crochetType?.id)
          .filter(Boolean)
      )]
    : [];

  const { result: crochetTypeResult, query: crochetTypeQuery } = useMany({
    resource: "crochet_types",
    ids: crochetTypeIds,
    queryOptions: {
      enabled: crochetTypeIds.length > 0,
    },
  });

  const crochetTypeList = crochetTypeResult?.data ?? [];
  const crochetTypeIsLoading = crochetTypeQuery?.isFetching ?? false;

  const hasActiveFilters = (filters?.length ?? 0) > 0;

  return (
    <>
      <PageBreadCrumbs items={["Crochets", "Lists"]} />
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <section
          aria-label="Search and filters"
          className="w-full rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm sm:w-auto sm:min-w-0 sm:p-4 md:p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4 text-gray-500" aria-hidden />
            <span>Search & filter</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-3">
            <div className="flex flex-1 flex-col gap-1.5 sm:min-w-[200px] sm:max-w-[280px]">
              <label htmlFor="crochet-search" className="text-xs font-medium text-gray-500">
                Name
              </label>
              <Input
                id="crochet-search"
                placeholder="Search by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters(searchInput, crochetTypeFilter?.value)}
                className="h-10 w-full rounded-lg border-gray-200 text-sm transition-colors placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500/20"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 sm:min-w-[180px] sm:max-w-[240px]">
              <label htmlFor="crochet-type-filter" className="text-xs font-medium text-gray-500">
                Type
              </label>
              <Select
                placeholder="All types"
                options={crochetTypeOptions}
                value={crochetTypeFilter?.value != null ? String(crochetTypeFilter.value) : undefined}
                onChange={(v) => applyFilters(searchInput, v)}
                className="h-10 w-full min-h-[40px] rounded-lg border-gray-200 text-sm"
              />
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center gap-2 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={() => applyFilters(searchInput, crochetTypeFilter?.value)}
                className={cn(
                  "inline-flex min-h-[40px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors",
                  "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
                  "active:scale-[0.98]"
                )}
              >
                <Search className="h-4 w-4" aria-hidden />
                <span>Search</span>
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className={cn(
                    "inline-flex min-h-[40px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600",
                    "hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
                    "active:scale-[0.98]"
                  )}
                >
                  <X className="h-4 w-4" aria-hidden />
                  <span className="sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>
        </section>
        <div className="flex w-full justify-end sm:w-auto">
          <CreateButton />
        </div>
      </div>
      <List>
        <div className="overflow-x-auto rounded-xl border border-gray-200/80 bg-white shadow-sm">
          <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={"ID"}
            render={(value, record, index) => format.number(index + 1)}
            align="right"
          />
          <Table.Column title="Name" dataIndex="name" />
          <Table.Column
            dataIndex={"crochetTypeId"}
            title={"CrochetType"}
            render={(value, record) => {
              if (crochetTypeIsLoading) return <>Loading...</>;
              const name =
                record?.crochetType?.name ??
                crochetTypeList.find((c) => String(c.id) === String(value))?.name;
              return name ?? value ?? "-";
            }}
          />
          <Table.Column
            title="Price In CFA"
            dataIndex="priceInCfa"
            render={(value) => format.number(value)}
            align="right"
          />
          <Table.Column
            title="Price In USD"
            dataIndex="priceInUsd"
            render={(value) => format.number(value)}
            align="right"
          />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
        </div>
      </List>
    </>
  );
}
