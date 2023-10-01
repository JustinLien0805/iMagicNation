import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useClerk } from "@clerk/nextjs";

import { Skeleton } from "./ui/skeleton";

export function UserNav() {
  const { user } = useUser();
  const { signOut } = useClerk();
  if (!user)
    return <Skeleton className="h-16 w-16 rounded-full bg-neutral-500" />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-16 w-16 rounded-full">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profileImageUrl} alt="@shadcn" />
            <AvatarFallback>{user.fullName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] text-[#F6E0C1]"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs leading-none text-[#f6e0c1c3]">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#EAA916]" />
        <DropdownMenuItem
          onClick={() => void signOut()}
          className="cursor-pointer focus:bg-[#F6E0C1]"
        >
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
