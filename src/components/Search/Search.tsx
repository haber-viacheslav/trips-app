import React from 'react';
import { SearchWrp, SearchInput } from './Search.styled';
import { BiSearch } from 'react-icons/bi';

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onChange }) => (
  <SearchWrp>
    <BiSearch size="30" />
    <SearchInput
      name="search"
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search your trip"
    />
  </SearchWrp>
);
