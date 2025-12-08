"use client";

import { Button } from "@payloadcms/ui";
import { useParams, useRouter } from "next/navigation";

export const EditOnEditor = ({ path }) => {
  const router = useRouter();
  const { segments } = useParams();

  const last = segments![segments!.length - 1];

  const openEditor = () => {
    router.push(`/edit/${last}`);
  };

  return (
    <div className="p-2">
      <Button onClick={openEditor} size="small" className="w-full">
        Edit This Section
      </Button>
    </div>
  );
};
