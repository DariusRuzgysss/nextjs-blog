"use client";

import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/providers/ProgressProvider";
import { Activity } from "react";

const ProgressBar = () => {
  const { value, showProgress } = useProgress();

  return (
    <Activity mode={showProgress ? "visible" : "hidden"}>
      <Progress value={value} className="h-1 rounded-none [&>div]:bg-active" />
    </Activity>
  );
};

export default ProgressBar;
