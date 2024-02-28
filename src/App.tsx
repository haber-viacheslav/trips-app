import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { Header } from './components/UI/Header/Header';
import { Main } from './components/UI/Main/Main';
import { Section } from './components/UI/Section/Section';
import { Container } from './components/UI/Container/Container';
import { HiddenTitle } from './components/UI/HiddenTitle/HіddenTitle';
import { Search } from './components/Search/Search';
import { AddForm } from './components/Modal/AddForm/AddForm';
import { Modal } from './components/Modal/Modal';
import { TripsList } from './components/Trips/TripsList/TripsList';
import { ForecastList } from './components/Forecast/ForecastList/ForecastList';
import { CloseButton } from './components/UI/buttons/CloseButton';
import { UserButton } from './components/UI/buttons/UserButton';
import { Timer } from './components/Timer/Timer';
import { AsideForecastInfo } from './components/Aside/AsideForecastInfo/AsideForecastInfo';
import { AsideForecastCard } from './components/Aside/AsideForecastCard/AsideForecastCard';
import {
  StyledModalTitle,
  StyledModalHeader,
  StyledAsideMessage,
} from './App.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { getWeatherByDates, getWeatherByDay } from './api/weatherApi';
import cities from './mockData/cities.json';
import { nanoid } from 'nanoid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { localStorageService } from './services/localStorageService';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebaseService/initFirebase';
import {
  addNewUser,
  addNewTrip,
  getUserTrips,
} from './firebaseService/firebaseApi';

import { WeatherResponse } from '@/api/weatherApi';
interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface Trip {
  name: string;
  imageUrl: string;
  id: string;
  startTime: number | Date;
  endTime: number | Date;
}

const defaultTrip: Trip = {
  name: 'Athens',
  imageUrl:
    'https://res.cloudinary.com/dj6mkr2e6/image/upload/v1690896299/athens_vmn2zj.webp',
  id: nanoid(),
  startTime: 1709330400000,
  endTime: 1709330600000,
};
const notAuthTrips: Trip[] | undefined = localStorageService.getItem(
  'notAuthorizedUserTrips'
);
const authTrips: Trip[] | undefined = localStorageService.getItem(
  'authorizedUserTrips'
);
const user: User | undefined = localStorageService.getItem('user');
export function App() {
  const [userAcc] = useAuthState(auth);
  const [title, setTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [forecastList, setForecastList] = useState<WeatherResponse | null>(
    null
  );
  const [forecastPerDay, setForecastPerDay] = useState<WeatherResponse | null>(
    null
  );
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [visibleTrips, setVisibleTrips] = useState<Trip[]>(() => {
    if (authTrips && user) {
      return [...authTrips];
    } else if (!user && !authTrips && notAuthTrips) {
      return [...notAuthTrips];
    } else {
      return [defaultTrip];
    }
  });
  const provider = useMemo(() => new GoogleAuthProvider(), []);
  const handlesignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      if (response.user) {
        const { uid, displayName, email, photoURL } = response.user;
        localStorageService.setItem('user', {
          uid,
          displayName,
          email,
          photoURL,
        });
        setTitle('Log out');
        await addNewUser(uid, displayName, email, photoURL);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  const handleSignOut = async (): Promise<void> => {
    localStorageService.removeItem('user');
    localStorageService.removeItem('authorizedUserTrips');

    const notAuthTrips = localStorageService.getItem('notAuthorizedUserTrips');

    if (!notAuthTrips) {
      localStorageService.setItem('notAuthorizedUserTrips', [defaultTrip]);
      setTitle('Log in');
    }

    setVisibleTrips(notAuthTrips as Trip[]);

    try {
      await signOut(auth);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const handleAddTrip = async (newTrip: Trip): Promise<void> => {
    newTrip.id = nanoid();

    if (!userAcc) {
      setVisibleTrips(prevTrips =>
        [...prevTrips, newTrip].sort(
          (prevTrip, nextTrip) => +prevTrip.startTime - +nextTrip.startTime
        )
      );
      localStorageService.setItem(
        'notAuthorizedUserTrips',
        [...visibleTrips, newTrip].sort(
          (prevTrip, nextTrip) => +prevTrip.startTime - +nextTrip.startTime
        )
      );
      return;
    }

    try {
      await addNewTrip(userAcc.uid, newTrip);
      setVisibleTrips(prevTrips =>
        [...prevTrips, newTrip].sort(
          (prevTrip, nextTrip) => +prevTrip.startTime - +nextTrip.startTime
        )
      );
      localStorageService.setItem('authorizedUserTrips', [
        ...visibleTrips,
        newTrip,
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }

    setSelectedTrip(null);
    setForecastList(null);
  };
  const handleSelectTrip = (selectedTip: Trip | null): void => {
    setSelectedTrip(selectedTip);
  };

  const handleToggleIsOpen = (): void => {
    setIsOpen(!isOpen);
    setSearch('');
    setSelectedTrip(null);
    setForecastList(null);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setSelectedTrip(null);
    setForecastList(null);
  };

  const getVisibleTrips = (): Trip[] => {
    if (search) {
      return visibleTrips.filter((visibleTrip: Trip) =>
        visibleTrip.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    return visibleTrips;
  };

  useEffect(() => {
    const getAllUserTrips = async () => {
      if (!userAcc) {
        setTitle('Log in');
        return;
      }
      try {
        const userTrips = await getUserTrips(userAcc.uid);
        setVisibleTrips([...userTrips, defaultTrip]);
        localStorageService.setItem('authorizedUserTrips', [
          ...userTrips,
          defaultTrip,
        ]);
        setTitle('Log out');
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    getAllUserTrips();
  }, [userAcc]);

  useEffect(() => {
    if (!selectedTrip) {
      return;
    }
    const getWeather = async (selectedTrip: Trip | null) => {
      try {
        if (!selectedTrip) return;
        const forecastData = await getWeatherByDates(selectedTrip);
        const forecastDay = await getWeatherByDay(selectedTrip);
        setForecastList(forecastData);
        setForecastPerDay(forecastDay);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    getWeather(selectedTrip);
  }, [selectedTrip]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <Section>
          <Container>
            <HiddenTitle text={'Trips'} />
            <Search value={search} onChange={handleSearchChange} />

            <TripsList
              selectTrip={handleSelectTrip}
              visibleTrips={getVisibleTrips().sort(
                (prevTrip, nextTrip) =>
                  +prevTrip.startTime - +nextTrip.startTime
              )}
              onToggle={handleToggleIsOpen}
            />
          </Container>
        </Section>
        {selectedTrip &&
          forecastList &&
          forecastList.days &&
          forecastList.days.length > 0 && (
            <Section>
              <Container>
                <ForecastList forecastsData={forecastList} />
              </Container>
            </Section>
          )}
      </Main>
      <AsideForecastInfo>
        <UserButton
          title={title}
          variant={user?.photoURL || ''}
          signOut={handleSignOut}
          signIn={handlesignInWithGoogle}
        />

        {selectedTrip && forecastPerDay ? (
          <>
            <AsideForecastCard forecast={forecastPerDay} />
            <Timer tripTime={selectedTrip.startTime} />
          </>
        ) : (
          <StyledAsideMessage>
            Please select your trip to check the weather forecast.
          </StyledAsideMessage>
        )}
      </AsideForecastInfo>

      {isOpen && (
        <Modal onClick={handleToggleIsOpen}>
          <StyledModalHeader>
            <StyledModalTitle>Create trip</StyledModalTitle>
            <CloseButton onClick={handleToggleIsOpen}>
              <AiOutlineClose color="#9A9A9A" size={20} />
            </CloseButton>
          </StyledModalHeader>

          <AddForm
            cities={cities}
            addTrip={handleAddTrip}
            onClick={handleToggleIsOpen}
          />
        </Modal>
      )}
    </ThemeProvider>
  );
}
