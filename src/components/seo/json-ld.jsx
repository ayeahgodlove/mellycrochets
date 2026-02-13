/**
 * Renders JSON-LD structured data for SEO (Organization, WebSite, Product, BreadcrumbList, etc.)
 */
export function JsonLd({ data }) {
  if (!data) return null;
  const json = typeof data === "string" ? data : JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
