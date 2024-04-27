import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
    <Button variant="default">default</Button>
    <Button variant="primary">default</Button>
    <Button variant="secondary">default</Button>
    <Button variant="secondaryOutline">default</Button>
    <Button variant="danger">default</Button>
    <Button variant="dangerOutline">default</Button>
    <Button variant="super">default</Button>
    <Button variant="superOutline">default</Button>
    <Button variant="ghost">default</Button>
    <Button variant="sidebar">default</Button>
    <Button variant="sidebarOutline">default</Button>

   </div>
  );
}
