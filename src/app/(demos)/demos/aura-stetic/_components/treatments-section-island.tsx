"use client";

import { useState } from "react";
import { TreatmentsGrid } from "./treatments-grid";
import { ServiceModal } from "./service-modal";
import { Treatment } from "./types";

interface TreatmentsSectionIslandProps {
  treatments: Treatment[];
}

export function TreatmentsSectionIsland({ treatments }: TreatmentsSectionIslandProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const openServiceModal = (treatment: Treatment) => setSelectedTreatment(treatment);
  const closeServiceModal = () => setSelectedTreatment(null);

  return (
    <>
      <TreatmentsGrid treatments={treatments} onServiceClick={openServiceModal} />
      <ServiceModal treatment={selectedTreatment} onClose={closeServiceModal} />
    </>
  );
}
