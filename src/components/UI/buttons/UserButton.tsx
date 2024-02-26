import React, { MouseEventHandler } from 'react';
import { UserStyledButton } from './UserButton.styled';
import { weatherIcon } from '../../../images/images';

interface UserButtonProps {
  variant?: string;
  signOut?: MouseEventHandler<HTMLButtonElement>;
  signIn?: MouseEventHandler<HTMLButtonElement>;
  title: string;
}

export const UserButton: React.FC<UserButtonProps> = ({
  variant,
  signOut,
  signIn,
  title,
}) => {
  if (title === 'Log in') {
    return (
      <UserStyledButton
        title={title}
        bg={weatherIcon.penguin}
        type="button"
        onClick={signIn}
      />
    );
  }
  return (
    <UserStyledButton
      title={title}
      bg={variant}
      type="button"
      onClick={signOut}
    />
  );
};
