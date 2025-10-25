import { Card, Skeleton } from "@heroui/react";

const SkeletonComponent = () => {
  return (
    <div className="w-full flex justify-center mt-20">
      <Card className="lg:w-1/3 md:w-1/2 w-full space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-8 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-8 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-1/5 rounded-lg">
            <div className="h-8 w-1/5 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-8 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    </div>
  );
};

export default SkeletonComponent;
