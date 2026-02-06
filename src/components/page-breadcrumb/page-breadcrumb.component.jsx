import { Breadcrumb } from "@/components/ui";
import React from "react";
import { FiHome } from "react-icons/fi";

const PageBreadCrumbs = ({ items, style, className }) => {
  return (
    <>
      <Breadcrumb
        style={{
          marginBottom: ".5rem",
          fontSize: ".85rem",
          textTransform: "capitalize",
          ...style,
        }}
        className={`mt-0 mb-md ${className}`}
      >
        <Breadcrumb.Item
          key="default-key"
          className="flex justify-center items-center"
        >
          <FiHome />
        </Breadcrumb.Item>
        {items.map((breadCrumb, index) => (
          <Breadcrumb.Item key={index.toString()}>{breadCrumb}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};

export default PageBreadCrumbs;
