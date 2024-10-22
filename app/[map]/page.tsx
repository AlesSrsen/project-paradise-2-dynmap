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

import { PlayerList } from '@/components/nav/PlayerList';
import { MapContextProvider } from '@/components/map/providers/MapRefContextProvider';

export default function Home({ params }: { params: { map: string } }) {
  if (params.map !== 'ibiza' && params.map !== 'hawaii') {
    notFound();
  }

  const tduMap = TDU2_MAPS[params.map];

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <MapContextProvider>
        <nav className="w-[100vw] pointer-events-none z-50 flex justify-end absolute top-0 bg-transparent h-20">
          <div className="flex flex-col w-52 pe-3 pt-3 items-end">
            <NavigationMenu className="pointer-events-auto pb-3">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    active={params.map === 'ibiza'}
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href="/ibiza">Ibiza</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    active={params.map === 'hawaii'}
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href="/hawaii">Hawaii</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <PlayerList
              tduMap={tduMap}
              className="pointer-events-auto w-[100%]"
            />
          </div>
        </nav>
        <main className="h-[100%] bg-white-700 mx-auto w-[100%] z-20">
          <Map tduMap={tduMap} />
        </main>
      </MapContextProvider>
    </>
  );
}
