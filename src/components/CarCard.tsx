import Image from "next/image";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl?: string | null;
  description?: string | null;
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
        {car.imageUrl && (
          <Image
            src={car.imageUrl}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {car.make} {car.model} <span className="text-gray-400">({car.year})</span>
        </h3>
        {car.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{car.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-600">${car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></span>
          <button
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            aria-label={`Book ${car.make} ${car.model}`}
          >
            Book now
          </button>
        </div>
      </div>
    </article>
  );
}
