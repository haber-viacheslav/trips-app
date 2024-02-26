import React, { useEffect, useState } from 'react';
import { FormButton } from '../../UI/buttons/FormButton';
import { StyledFormButton } from '../../UI/buttons/FormButton.styled';
import { AiOutlineCheck } from 'react-icons/ai';
import {
  StyledForm,
  StyledInputsContainer,
  StyledInput,
  StyledLabel,
  StyledSelect,
  StyledLabelValidation,
  StyledButtonsContainer,
} from './AddForm.styled';

interface City {
  id: number;
  name: string;
  imageUrl: string;
}

interface AddFormProps {
  cities: City[];
  onClick: () => void;
  addTrip: (trip: {
    name: string;
    imageUrl: string;
    startTime: number;
    endTime: number;
  }) => void;
}

export const AddForm: React.FC<AddFormProps> = ({
  cities,
  onClick,
  addTrip,
}) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isVerify, setIsVerify] = useState(false);

  const now = new Date();
  const desiredTimeZoneDate = new Date(now.getTime() + 27 * 60 * 60 * 1000);
  const maxDate = new Date(
    desiredTimeZoneDate.getTime() + 15 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, -8);
  const minDate = desiredTimeZoneDate.toISOString().slice(0, -8);

  useEffect(() => {
    setIsVerify(!!selectedCity && !!startTime && !!endTime);
  }, [selectedCity, startTime, endTime]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenCity = cities.find(city => city.id === +selectedCity);
    if (!chosenCity) return;

    const newTrip = {
      name: chosenCity.name,
      imageUrl: chosenCity.imageUrl,
      startTime: new Date(startTime).getTime(),
      endTime: new Date(endTime).getTime(),
    };
    addTrip(newTrip);
    onClick();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInputsContainer>
        <StyledLabel htmlFor="city">
          {!selectedCity ? (
            <StyledLabelValidation>*</StyledLabelValidation>
          ) : (
            <AiOutlineCheck size="8" color="green" />
          )}{' '}
          City
        </StyledLabel>
        <StyledSelect
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Please select a city</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </StyledSelect>
      </StyledInputsContainer>
      <StyledInputsContainer>
        <StyledLabel htmlFor="start-time">
          {!startTime ? (
            <StyledLabelValidation>*</StyledLabelValidation>
          ) : (
            <AiOutlineCheck size="8" color="green" />
          )}{' '}
          Start date
        </StyledLabel>
        <StyledInput
          type="datetime-local"
          id="start-time"
          value={startTime}
          onChange={handleStartTimeChange}
          min={minDate}
          max={maxDate}
        />
      </StyledInputsContainer>
      <StyledInputsContainer>
        <StyledLabel htmlFor="end-time">
          {!endTime ? (
            <StyledLabelValidation>*</StyledLabelValidation>
          ) : (
            <AiOutlineCheck size="8" color="green" />
          )}
          End date
        </StyledLabel>
        <StyledInput
          type="datetime-local"
          id="end-time"
          value={endTime}
          onChange={handleEndTimeChange}
          min={minDate && startTime}
          max={maxDate}
        />
      </StyledInputsContainer>
      <StyledButtonsContainer>
        <FormButton onClick={onClick}>Cancel</FormButton>
        <StyledFormButton type="submit" disabled={!isVerify}>
          Save
        </StyledFormButton>
      </StyledButtonsContainer>
    </StyledForm>
  );
};
