import React from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsCards from '../components/dashboard/StatsCards';
import QuickActions from '../components/dashboard/QuickActions';
import RecentArtworks from '../components/dashboard/RecentArtworks';
import InspirationQuote from '../components/dashboard/InspirationQuote';
import { WarliDivider } from '../components/ui/DecorativeElements';

export default function Dashboard() {
  return (
    <div className="px-6 py-5 max-w-6xl mx-auto animate-fade-in">
      <WelcomeBanner />
      <StatsCards />
      <QuickActions />
      <RecentArtworks />
      <InspirationQuote />
      {/* Warli heritage border */}
      <div className="mt-1 pb-3">
        <WarliDivider className="w-full" />
      </div>
    </div>
  );
}
