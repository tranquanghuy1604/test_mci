import { format } from 'date-fns';

export const formatDate = (isoDate: Date) => {
  try {
    return format(new Date(isoDate), 'dd/MM/yyyy');
  } catch (error) {
    console.error('Invalid date:', isoDate);
    return '';
  }
};
