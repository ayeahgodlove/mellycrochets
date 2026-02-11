"use client";

import { useSelect } from "@refinedev/core";
import CrochetForm from "../../../../components/crochet/crochet-form.component";
import PageBreadCrumbs from "../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Create, useForm } from "@/components/refine";
import { Form } from "@/components/ui";
import { useEffect } from "react";

export default function CrochetCreate() {
  const { formProps, saveButtonProps } = useForm({});
  const { query: crochetTypeQuery } = useSelect({
    resource: "crochet_types",
    optionLabel: "name",
    optionValue: "id",
  });

  const crochetTypes = crochetTypeQuery?.data?.data ?? crochetTypeQuery?.data ?? [];

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
