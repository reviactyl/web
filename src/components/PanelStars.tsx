"use client";

import { useEffect, useState } from "react";

export default function PanelStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/v2/get-stars")
      .then(res => res.json())
      .then(data => setStars(data.stars))
      .catch(() => setStars(null));
  }, []);

  if (stars === null) {
    return <>0</>;
  }

  return <>{stars.toLocaleString()}</>;
}