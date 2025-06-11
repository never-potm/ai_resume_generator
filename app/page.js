import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {ModeToggle} from "@/components/nav/mode-toggle";

export default function Home() {
  return (
      <div className="flex justify-center items-center h-screen">
          <ModeToggle />
          <Link href="/resume/create">
              <Button>start creating AI resume</Button>
          </Link>
      </div>
  );
}
