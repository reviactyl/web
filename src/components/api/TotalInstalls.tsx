"use client";

import { useEffect, useState } from "react";

export default function TotalInstalls() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/v26/get-installs")
      .then((res) => res.json())
      .then((data) => setTotal(data.total_unique_ids))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) {
    return <>3,800</>;
  }

  return <>{total.toLocaleString()}</>;
}
