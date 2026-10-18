"use client";

import { useEffect, useState } from "react";

export default function TotalStars() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/v26/get-stars")
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) {
    return <>170</>;
  }

  return <>{total.toLocaleString()}</>;
}
