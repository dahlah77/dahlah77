export type ServiceType = 'ride' | 'food' | 'send' | 'companion';

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

export const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export const calculateFare = (serviceType: ServiceType, distanceKm: number, pricingRule: any, durationMinutes?: number) => {
  if (serviceType === 'companion') {
    const hours = Math.max(1, Math.ceil((durationMinutes ?? 60) / 60));
    return Math.max(pricingRule.minimum_fare, pricingRule.hourly_rate * hours + pricingRule.service_fee);
  }
  const total = pricingRule.base_fare + distanceKm * pricingRule.per_km_fare + pricingRule.service_fee;
  return Math.max(pricingRule.minimum_fare, total);
};

export const generateOrderCode = (serviceType: ServiceType) => `OJP-${serviceType.toUpperCase()}-${Date.now().toString().slice(-8)}`;

export const getStatusLabel = (status: string) => ({ pending: 'Menunggu', searching_driver: 'Cari Driver', completed: 'Selesai' }[status] ?? status);
