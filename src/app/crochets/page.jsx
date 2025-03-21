"use client";

import CrochetList from "../../components/crochet/crochet-list.component";
import FilterCrochets from "../../components/filter-crochet.component";

export default function IndexPage() {
  return (
    <>
      <div className="py-20">
        {/* filter content */}
        <FilterCrochets />
        <div className="w-full px-10 pb-10" data-aos="fade-up">
          {/* listings */}
          <CrochetList />
        </div>
      </div>
    </>
  );
}
