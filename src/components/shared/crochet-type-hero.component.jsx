import { Breadcrumb } from "@/components/ui";

const CrochetTypeHero = ({ title, description, breadcrumbs }) => {
  return (
    <div className="relative w-full bg-gray-100 py-20 px-6 flex flex-col items-center text-center">
      <div className="relative z-10 text-center p-6 md:p-12 lg:p-16 animate-fade-in-up">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">{description}</p>
        <Breadcrumb
          items={[
            {
              title: "Home",
              href: "/",
            },
            ...(breadcrumbs || []).map((item) => ({
              title: item.title,
              href: item.href,
            })),
          ]}
          style={{ display: "flex", justifyContent: "center" }}
        />
      </div>
    </div>
  );
};

export default CrochetTypeHero;
