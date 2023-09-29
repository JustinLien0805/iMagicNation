import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormLoader = () => {
  return (
    <Card className="h-[424px] w-[350px] border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813]">
      <CardHeader>
        <Skeleton className="h-10 w-1/3 bg-[#F6E0C1]"></Skeleton>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-6 w-1/3 bg-[#F6E0C1]"></Skeleton>
        <Skeleton className="h-10 w-full bg-[#F6E0C1]"></Skeleton>
        <Skeleton className="h-6 w-1/3 bg-[#F6E0C1]"></Skeleton>
        <Skeleton className="h-10 w-full bg-[#F6E0C1]"></Skeleton>
        <Skeleton className="h-6 w-1/3 bg-[#F6E0C1]"></Skeleton>
        <Skeleton className="h-10 w-full bg-[#F6E0C1]"></Skeleton>
        <Skeleton className="h-10 w-full bg-[#F6E0C1]"></Skeleton>
      </CardContent>
    </Card>
  );
};

export default FormLoader;
