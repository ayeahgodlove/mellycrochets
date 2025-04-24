"use client";

import { useSelect } from "@refinedev/core";
import CrochetForm from "../../../../components/crochet/crochet-form.component";
import PageBreadCrumbs from "../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { useEffect } from "react";

export default function CrochetCreate() {
  const { formProps, saveButtonProps } = useForm({});
  const { queryResult: crochetTypeData } = useSelect({
    resource: "crochet_types",
  });

  const crochetTypes = crochetTypeData.data;

  useEffect(() => {}, [formProps.form]);
  return (
    <>
      <PageBreadCrumbs items={["Crochets", "Lists", "Create"]} />
      <Create saveButtonProps={saveButtonProps} footerButtons={[]}>
        <Form {...formProps} layout="vertical">
          <CrochetForm formProps={formProps} crochetTypes={crochetTypes} />
        </Form>
      </Create>
    </>
  );
}
