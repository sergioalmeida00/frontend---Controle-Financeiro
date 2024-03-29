import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { cn } from "../../app/utils/cn";

function DrodownMenu({ children }: { children: React.ReactNode }) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

function DropdownTrigger({ children }: { children: React.ReactNode }) {
  return <RadixDropdownMenu.Trigger className="outline-none" asChild>{children}</RadixDropdownMenu.Trigger>;
}

interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
}
function DropdownContent({ children, className }: DropdownContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_rgba(0,0,0,0.10)] z-[99]",
          "data-[side=bottom]:animate-slideUpAndFade",
          "data-[side=top]:animate-slideDownAndFade",
          className
        )}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?():void
}

function DropdownItem({ children, className,onSelect }: DropdownItemProps) {
  return (
    <RadixDropdownMenu.Item
    onSelect={onSelect}
      className={cn(
        "min-h-[40px] outline-none flex items-center py-2 px-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors",
        className
      )}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DrodownMenu,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};
