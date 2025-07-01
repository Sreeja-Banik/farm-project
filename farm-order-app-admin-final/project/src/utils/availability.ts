import { Equipment, Rental } from '../types';
import { isWithinInterval, parseISO, isFuture } from 'date-fns';

export function isEquipmentAvailable(
  equipment: Equipment,
  startDate: string,
  endDate: string,
  zipCode: string,
  existingRentals: Rental[]
): { available: boolean; reason?: string } {
  // Check if equipment is in maintenance
  if (equipment.status === 'maintenance') {
    return { available: false, reason: 'Equipment is under maintenance' };
  }

  // Check if quantity is available
  if (equipment.quantity_available <= 0) {
    return { available: false, reason: 'No units currently available' };
  }

  // Check if zip code is in service area
  if (!equipment.service_areas.includes(zipCode)) {
    return { available: false, reason: 'Equipment is not available in this area' };
  }

  // Check if dates are within availability schedule
  const requestedStart = parseISO(startDate);
  const requestedEnd = parseISO(endDate);

  if (!isFuture(requestedStart)) {
    return { available: false, reason: 'Start date must be in the future' };
  }

  const isWithinSchedule = equipment.availability_schedule.some(schedule => 
    isWithinInterval(requestedStart, {
      start: parseISO(schedule.start_date),
      end: parseISO(schedule.end_date)
    }) && isWithinInterval(requestedEnd, {
      start: parseISO(schedule.start_date),
      end: parseISO(schedule.end_date)
    })
  );

  if (!isWithinSchedule) {
    return { available: false, reason: 'Equipment is not available during these dates' };
  }

  // Check existing rentals for quantity conflicts
  const conflictingRentals = existingRentals.filter(rental => {
    if (rental.equipment_id !== equipment.id || rental.status === 'rejected') {
      return false;
    }

    return isWithinInterval(requestedStart, {
      start: parseISO(rental.start_date),
      end: parseISO(rental.end_date)
    }) || isWithinInterval(requestedEnd, {
      start: parseISO(rental.start_date),
      end: parseISO(rental.end_date)
    });
  });

  if (conflictingRentals.length >= equipment.quantity_available) {
    return { available: false, reason: 'No units available for these dates' };
  }

  return { available: true };
}