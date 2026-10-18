"use client";

import { useEffect, useState } from "react";

export default function TotalDownloads() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/v26/get-downloads")
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) {
    return <>17,000</>;
  }

  return <>{total.toLocaleString()}</>;
}
