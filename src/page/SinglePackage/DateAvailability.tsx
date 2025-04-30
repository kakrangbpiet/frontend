import { useState } from "react";
import { DateAvailability } from "../../redux/slices/Travel/TravelSlice";
import { Info } from 'lucide-react';

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const DateAvailabilityDisplay = ({
    dateAvailabilities,
    startDate,
    setPrice,
    setStartDate,
    setEndDate,
}: {
    dateAvailabilities: DateAvailability[],
    startDate?: number,
    setPrice?: (price: number) => void,
    setStartDate?: (date: number) => void,
    setEndDate?: (date: number) => void,
}) => {
    const currentDate = new Date();
    const currentTimestamp = Math.floor(currentDate.getTime() / 1000);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const getAvailabilityStatus = (spots: number) => {
        if (spots > 5) {
            return {
                color: 'bg-green-500',
                text: `${spots} spots available`,
                textColor: 'text-green-300'
            };
        } else if (spots > 0) {
            return {
                color: 'bg-yellow-500',
                text: `Only ${spots} spots left!`,
                textColor: 'text-yellow-300'
            };
        } else {
            return {
                color: 'bg-red-500',
                text: 'Fully booked',
                textColor: 'text-red-300'
            };
        }
    };

    const upcomingAvailabilities = dateAvailabilities
        .filter(avail => avail.endDate > currentTimestamp)
        .sort((a, b) => a.startDate - b.startDate);

    const calculateDiscount = (price: number, originalPrice?: number) => {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    };

    return (
        <div className="p-2 sm:p-2 mb-6 sm:mb-8">
            <div className="flex items-center justify-between">
                <div className="font-medium text-white ml-1 mb-3 flex items-center">
                    <span className="text-sm sm:text-base">Available Dates</span>
                    <div className="relative ml-2">
                        <Info
                            size={16}
                            className="text-white cursor-help"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            aria-label="Information about availability"
                        />
                        {showTooltip && (
                            <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 text-xs text-white rounded shadow-lg z-10 w-48">
                                Green indicates plenty of spots available, yellow means limited spots, and red means fully booked.
                            </div>
                        )}
                    </div>
                </div>
                {dateAvailabilities.length > 0 && (
                    <span className="text-xs text-white">
                        {dateAvailabilities.length} options available
                    </span>
                )}
            </div>
            {upcomingAvailabilities.length === 0 ? (
                <p className="text-white/70 text-sm sm:text-base">No upcoming dates available. Check back later for new schedules.</p>
            ) : (
                <div className="space-y-2 sm:space-y-3">
                    {upcomingAvailabilities.map((availability, index) => {
                        const status = getAvailabilityStatus(availability.availableSpots);
                        const durationDays = Math.ceil((availability.endDate - availability.startDate) / (60 * 60 * 24));
                        const discount = calculateDiscount(availability.price, availability.originalPrice);
                        const hasPrice = availability.price !== undefined && availability.price !== null;

                        return (
                            <div
                                key={index}
                                className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ${startDate === availability.startDate
                                    ? 'bg-blue-500/30 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5'
                                    }`}
                                onClick={() => {
                                    setStartDate(availability.startDate);
                                    setPrice(availability.price);
                                    setEndDate(availability.endDate);
                                }}
                                aria-selected={startDate === availability.startDate}
                                role="option"
                            >
                                <div className="flex flex-row sm:flex-row justify-between ">
                                    <div>
                                        <p className="font-medium text-white text-sm sm:text-base break-words">
                                            {formatDate(availability.startDate)} - {formatDate(availability.endDate)}
                                        </p>
                                        <p className="text-xs sm:text-sm text-white/70 mt-1">
                                            {durationDays} {durationDays === 1 ? 'day' : 'days'}
                                        </p>
                                    </div>

                                    <div className=" sm:mt-0 text-right">
                                        {hasPrice ? (
                                            <div className="flex flex-wrap items-center justify-end gap-1">
                                                {discount > 0 && (
                                                    <span className="text-xs line-through text-white/50">
                                                        {formatCurrency(availability.originalPrice!)}
                                                    </span>
                                                )}
                                                <span className={`font-bold text-sm sm:text-base ${discount > 0 ? 'text-green-400' : 'text-white'}`}>
                                                    {formatCurrency(availability.price)}
                                                </span>
                                                {discount > 0 && (
                                                    <span className="ml-1 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                                                        {discount}% OFF
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-end">
                                                <span className="text-white/70 italic text-xs sm:text-sm">Price coming soon</span>
                                            </div>
                                        )}
                                    </div>
                                </div>



                                {availability.availableSpots > 0 && (
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                                            <div
                                                className="bg-blue-500 h-1.5 sm:h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min(100, (availability.availableSpots / availability.maxTravelers) * 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex items-center mt-1 justify-between">
                                            <div className="flex items-center">

                                                <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`}></div>
                                                <p className={`text-xs sm:text-sm ${status.textColor}`}>
                                                    {status.text}
                                                </p>
                                            </div>
                                            <p className="text-xs text-white/50 mt-1">
                                                {availability.maxTravelers - availability.availableSpots} of {availability.maxTravelers} spots booked
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};