"use client";

import { useEffect, useState } from "react";

export default function PanelInstalls() {
  const [installs, setInstalls] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/v26/get-installs")
      .then(res => res.json())
      .then(data => setInstalls(data.total_unique_ids))
      .catch(() => setInstalls(null));
  }, []);

  if (installs === null) {
    return <>0</>;
  }

  return <>{installs.toLocaleString()}</>;
}