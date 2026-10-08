import React from 'react';
import { OpeningPage } from './OpeningPage';
import { ClinicLocation } from '../types';

interface InfantPageProps {
  currentLocation: ClinicLocation;
  onProceed: (targetAction?: 'book' | 'explore') => void;
}

export const InfantPage: React.FC<InfantPageProps> = ({ currentLocation, onProceed }) => {
  return <OpeningPage currentLocation={currentLocation} onProceed={onProceed} />;
};
