"use client";

import { useEffect, useState } from "react";

export default function PanelVersion() {
  const [version, setVersion] = useState("Loading...");

  useEffect(() => {
    fetch("/api/v2/get-latest")
      .then(res => res.json())
      .then(data => setVersion(data.version))
      .catch(() => setVersion("v0"));
  }, []);

  return <span>{version}</span>;
}
