"use client";

import { useEffect, useState } from "react";

export default function PanelStars() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/v26/get-stars")
      .then((res) => res.json())
      .then((data) => setTotal(data.repositories.panel))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) {
    return <>170</>;
  }

  return <>{total.toLocaleString()}</>;
}
