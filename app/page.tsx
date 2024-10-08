import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useMemo } from 'react';

import dynamic from 'next/dynamic';

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <nav className="w-100">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="h-[90%]">
        <main className="h-[100%]">
          <div className="bg-white-700 mx-auto my-5 w-[100%] h-[100%]">
            <Map />
          </div>
        </main>
        <footer className="h-0"></footer>
      </div>
    </>
  );
}
