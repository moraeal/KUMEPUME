import { Navigate, useLocation } from "react-router-dom";
import audit from "../data/kumepume/migration-audit.json";
import SectionPreview from "../pages/SectionPreview";

function normalized(pathname: string) {
  const withoutSlash = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  try {
    return decodeURI(withoutSlash);
  } catch {
    return withoutSlash;
  }
}

const legacyDestinations = new Map(
  audit.entries
    .filter((entry) => entry.destination && entry.sourcePath !== "/")
    .flatMap((entry) => [
      [normalized(entry.sourcePath), entry.destination],
      [entry.sourcePath, entry.destination],
    ] as Array<[string, string]>),
);

export default function LegacyRouteFallback() {
  const location = useLocation();
  const destination = legacyDestinations.get(normalized(location.pathname)) ?? legacyDestinations.get(location.pathname);
  if (destination) return <Navigate to={destination} replace />;
  return <SectionPreview section="not-found" />;
}
