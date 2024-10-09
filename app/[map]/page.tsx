import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useMemo } from 'react';

import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TDU2_MAPS } from '@/lib/constants';

export default function Home({ params }: { params: { map: string } }) {
  if (params.map !== 'ibiza' && params.map !== 'hawaii') {
    notFound();
  }

  const tduMap = TDU2_MAPS[params.map];

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
      <nav className="w-100 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/ibiza">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Ibiza
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/hawaii">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Hawaii
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex-auto">
        <main className="h-[100%]">
          <div className="bg-white-700 mx-auto w-[100%] h-[100%]">
            <Map tduMap={tduMap} />
          </div>
        </main>
        <footer className="h-0"></footer>
      </div>
    </>
  );
}
