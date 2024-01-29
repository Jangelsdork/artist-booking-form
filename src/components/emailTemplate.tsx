/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Schema } from './BookingForm';


export const EmailTemplate: React.FC<Readonly<Schema>> = ({
  ...formData
}) => (
  <div >
    <h1>New booking request for {formData.artist_name}!</h1>
    <h2><b>Promoter details</b></h2>
    <div><b>Name</b> {formData.first_name}{" "}{formData.last_name} <b>Role:</b> {formData.role}</div> 
    <div><b>Email:</b>{formData.email} <b>Phone:</b> {formData.phone}</div>
    <h2><b>Booking details</b></h2>
    <div><b>Artist: </b>{formData.artist_name} <b>Performance type:</b> {formData.type_performance}</div>
    <div><b>Event date: </b>{formData.event_date.toString()} <b>Alternative dates:</b> {formData.alternative_dates ? formData.alternative_dates : "None proposed"} </div>
    <div><b>Event Name: </b>{formData.event_name} <b>Offer amount:</b>{formData.financial_offer} {formData.currency} WHT? {formData.wht ? formData.wht : "Not applicable"}</div>



  </div>
);