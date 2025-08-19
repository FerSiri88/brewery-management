
import { Tank, ProcessStatus } from './types';

export const TANKS_DATA: Tank[] = [
  { id: 'T-001', beerType: 'IPA', volumeLiters: 1800, capacityLiters: 2000, status: ProcessStatus.Fermenting },
  { id: 'T-002', beerType: 'Stout', volumeLiters: 1950, capacityLiters: 2000, status: ProcessStatus.Maturing },
  { id: 'T-003', beerType: 'Lager', volumeLiters: 2000, capacityLiters: 2000, status: ProcessStatus.Ready },
  { id: 'T-004', beerType: 'Pilsner', volumeLiters: 0, capacityLiters: 1500, status: ProcessStatus.Empty },
  { id: 'T-005', beerType: 'IPA', volumeLiters: 1200, capacityLiters: 2000, status: ProcessStatus.Maturing },
  { id: 'T-006', beerType: 'Amber Ale', volumeLiters: 1450, capacityLiters: 1500, status: ProcessStatus.Ready },
  { id: 'T-007', beerType: 'Lager', volumeLiters: 1900, capacityLiters: 2000, status: ProcessStatus.Fermenting },
  { id: 'T-008', beerType: 'Stout', volumeLiters: 1000, capacityLiters: 2000, status: ProcessStatus.Ready },
];
