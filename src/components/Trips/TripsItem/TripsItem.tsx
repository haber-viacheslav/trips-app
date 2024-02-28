import React from 'react';
import {
  TripsStyledItem,
  TripsWrapBtn,
  TripsWrapImg,
  TripsImg,
  TripsContentWrap,
  TripsTitle,
  TripsDate,
} from './TripsItem.styled';
import { trimStringForCards } from '../../../helpers/trimStringForCards';
import { formatRequestDate } from '../../../helpers/formatRequestDate';
import { Trip } from '../../../App';

interface TripsItemProps {
  tripData: Trip;
  selectTrip: () => void;
}

export const TripsItem: React.FC<TripsItemProps> = ({
  tripData,
  selectTrip,
}) => {
  const { name, imageUrl, startTime, endTime } = tripData;

  return (
    <TripsStyledItem>
      <TripsWrapBtn type="button" onClick={selectTrip}>
        <TripsWrapImg>
          <TripsImg src={imageUrl} alt={name} loading="lazy" width="200" />
        </TripsWrapImg>
        <TripsContentWrap>
          <TripsTitle>{trimStringForCards(name, ', Ukraine')}</TripsTitle>
          <TripsDate>{`${formatRequestDate(
            startTime,
            'toPoints'
          )} - ${formatRequestDate(endTime, 'toPoints')}`}</TripsDate>
        </TripsContentWrap>
      </TripsWrapBtn>
    </TripsStyledItem>
  );
};
