"use client";

import { useSelect } from "@refinedev/core";
import CrochetForm from "../../../../../components/crochet/crochet-form.component";
import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import { Edit, useForm } from "@/components/refine";
import { Form } from "@/components/ui";

export default function CrochetEdit() {
  const { formProps, saveButtonProps } = useForm({});
  const { queryResult: crochetTypeData } = useSelect({
    resource: "crochet_types",
  });

  const crochetTypes = crochetTypeData.data;
  return (
    <>
      <PageBreadCrumbs items={["Crochets", "Lists", "Edit"]} />
      <Edit saveButtonProps={saveButtonProps} footerButtons={[]}>
        <Form {...formProps} layout="vertical">
          <CrochetForm formProps={formProps} crochetTypes={crochetTypes} />
        </Form>
      </Edit>
    </>
  ); 
}
