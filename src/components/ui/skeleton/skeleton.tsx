import { Skeleton as MuiSkeleton, type SkeletonProps } from "@mui/material";

export function Skeleton(props: SkeletonProps) {
  return <MuiSkeleton animation="wave" {...props} />;
}