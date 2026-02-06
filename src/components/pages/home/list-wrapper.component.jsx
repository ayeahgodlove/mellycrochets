import CrochetList from "../../crochet/crochet-list.component";
import { CrochetRepository } from "../../../data/repositories/crochet.repository";

const crochetRepository = new CrochetRepository();

export default async function CrochetListWrapper() {
  try {
    const crochets = await crochetRepository.getAll();
    return <CrochetList crochets={crochets} />;
  } catch (error) {
    console.error("Error fetching crochets:", error);
    // Return empty array on error to prevent page crash
    return <CrochetList crochets={[]} />;
  }
}
