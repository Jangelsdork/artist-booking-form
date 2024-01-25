/* eslint-disable import/prefer-default-export */
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, lastName
}) => (
  <div>
    <h1>Welcome, {firstName}{" "}{lastName}!</h1>
  </div>
);