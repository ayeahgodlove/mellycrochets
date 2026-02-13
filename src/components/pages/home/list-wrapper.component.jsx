import { headers } from "next/headers";
import CrochetList from "../../crochet/crochet-list.component";
import { CrochetRepository } from "../../../data/repositories/crochet.repository";

const crochetRepository = new CrochetRepository();

async function getBaseUrl() {
  try {
    const h = await headers();
    const host = h.get("host") || h.get("x-forwarded-host");
    const proto = h.get("x-forwarded-proto") || "http";
    if (host) return `${proto}://${host}`;
  } catch (_) {}
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

function buildFilterQuery(filterParams) {
  if (!filterParams || typeof filterParams !== "object") return null;
  const { name, crochetTypeId } = filterParams;
  const params = new URLSearchParams();
  if (name != null && String(name).trim() !== "") params.set("name", name.trim());
  if (crochetTypeId != null && String(crochetTypeId).trim() !== "") {
    params.set("crochetTypeId", crochetTypeId.trim());
  }
  return params.toString() || null;
}

export default async function CrochetListWrapper({ filterParams }) {
  try {
    const query = buildFilterQuery(filterParams);

    if (query) {
      const base = await getBaseUrl();
      const res = await fetch(`${base}/api/crochets/filter?${query}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Filter endpoint error:", res.status, err.message);
        return <CrochetList crochets={[]} />;
      }
      const crochets = await res.json();
      return <CrochetList crochets={Array.isArray(crochets) ? crochets : []} />;
    }

    const crochets = await crochetRepository.getAll();
    return <CrochetList crochets={crochets} />;
  } catch (error) {
    console.error("Error fetching crochets:", error);
    return <CrochetList crochets={[]} />;
  }
}
