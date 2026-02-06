"use client";
import React from "react";
import Link from "next/link";
import { useLink } from "@refinedev/core";

export const Title = ({ collapsed }) => {
  const RefineLink = useLink();
  const content = collapsed ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/logo.png"
        alt="Refine"
        style={{
          margin: "0 auto",
          padding: "12px 0",
          maxHeight: "65.5px",
        }}
      />
    </div>
  ) : (
    <img
      src="/logo.png"
      alt="Refine"
      style={{
        width: "180px",
        padding: "12px 24px",
      }}
    />
  );

  return RefineLink ? <RefineLink to="/">{content}</RefineLink> : <Link href="/">{content}</Link>;
};
