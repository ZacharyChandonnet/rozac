import { Droplets, Wrench, Bath, ShowerHead, Flame, Hammer } from 'lucide-react';
// Modifiez librement ce tableau : un objet = une carte.
export const services = [
  { id: 'fuites', icon: Droplets, title: 'Réparation de fuites', text: 'Fuite sous l’évier, tuyau qui goutte ou humidité suspecte : on trouve la source et on répare proprement.' },
  { id: 'robinetterie', icon: Wrench, title: 'Robinetterie', text: 'Installation et remplacement de robinets de cuisine, de salle de bain et de buanderie.' },
  { id: 'toilettes', icon: Bath, title: 'Toilettes', text: 'Installation, remplacement et réparation de toilettes qui coulent ou qui se bouchent.' },
  { id: 'lavabos', icon: ShowerHead, title: 'Lavabos et éviers', text: 'Pose de lavabos, de vanités et d’éviers, avec raccordements soignés.' },
  { id: 'chauffe-eau', icon: Flame, title: 'Chauffe-eau', text: 'Remplacement et installation de chauffe-eau pour retrouver l’eau chaude sans tracas.' },
  { id: 'Débouchage', icon: Hammer, title: 'Débouchage', text: 'Débouchage de canalisations bouchées et réparation de fuites.' },
];
export const serviceOptions = [...services.map(s => s.title), 'Autre'];
