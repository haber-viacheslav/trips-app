import React, { useRef, useEffect, useCallback, useState } from 'react';
import { TripsItem } from '../TripsItem/TripsItem';
import {
  StyledTripsListWrp,
  StyledTripsList,
  StyledPrevScrollButton,
  StyledNextScrollButton,
} from './TripsList.styled';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import { AddButton } from '../../UI/buttons/AddButton';
import { TripsStyledAddItem } from '../TripsItem/TripsItem.styled';
import { Trip } from '../../../App';

interface TripsListProps {
  visibleTrips: Trip[];
  onToggle: () => void;
  selectTrip: (trip: Trip) => void;
}

export const TripsList: React.FC<TripsListProps> = ({
  visibleTrips,
  onToggle,
  selectTrip,
}) => {
  const tripsRef = useRef<HTMLUListElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  const handleScroll = () => {
    const tripsList = tripsRef.current;
    if (tripsList) {
      const atStart = tripsList.scrollLeft === 0;
      const atEnd =
        Math.round(tripsList.scrollLeft + tripsList.clientWidth) >=
          tripsList.scrollWidth - 20 &&
        Math.round(tripsList.scrollLeft + tripsList.clientWidth) <=
          tripsList.scrollWidth;
      setIsAtStart(atStart);
      setIsAtEnd(atEnd);
    }
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (tripsRef.current) {
      tripsRef.current.scrollTo({
        left: tripsRef.current.scrollLeft + e.deltaY * 4,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleScrollLeft = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (tripsRef.current) {
        tripsRef.current.scrollTo({
          left:
            tripsRef.current.scrollLeft - tripsRef.current.clientWidth - 260,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  const handleScrollRight = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (tripsRef.current) {
        const containerWidth = tripsRef.current.clientWidth;
        tripsRef.current.scrollTo({
          left: tripsRef.current.scrollLeft + containerWidth + 260,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  useEffect(() => {
    const tripsList = tripsRef.current;
    if (tripsList) {
      tripsList.addEventListener('wheel', handleWheel);
      return () => tripsList.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    const tripsList = tripsRef.current;
    if (tripsList) {
      tripsList.addEventListener('scroll', handleScroll);
      return () => tripsList.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      {visibleTrips && (
        <StyledTripsListWrp>
          {visibleTrips.length > 3 && !isAtStart && (
            <StyledPrevScrollButton onClick={handleScrollLeft}>
              <BiSolidChevronLeft size="30" color="#100E3A" />
            </StyledPrevScrollButton>
          )}
          <StyledTripsList ref={tripsRef}>
            {visibleTrips.length > 0 &&
              visibleTrips.map(trip => (
                <TripsItem
                  key={trip.id}
                  tripData={trip}
                  selectTrip={() => selectTrip(trip)}
                />
              ))}
            <TripsStyledAddItem>
              <AddButton onClick={onToggle} />
            </TripsStyledAddItem>
          </StyledTripsList>

          {visibleTrips.length > 3 && !isAtEnd && (
            <StyledNextScrollButton onClick={handleScrollRight}>
              <BiSolidChevronRight size="30" color="#100E3A" />
            </StyledNextScrollButton>
          )}
        </StyledTripsListWrp>
      )}
    </>
  );
};
