/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Schema } from './BookingForm';



export const EmailTemplate: React.FC<Readonly<Schema>> = ({
  ...formData
}) => 
  // {

// function correctBookingDate(){
//   const utcEventDate = new Date(formData.event_date)
//   const timezoneOffset = new Date().getTimezoneOffset();

//   const localEventTime = new Date(utcEventDate.getTime() - timezoneOffset * 60000)
//   console.log(localEventTime)
//   return localEventTime
  
// }
// function correctAnnouncementDate(){
//   const utcEventDate = new Date(formData.announcement)
//   const timezoneOffset = new Date().getTimezoneOffset();

//   const localEventTime = new Date(utcEventDate.getTime() - timezoneOffset * 60000)
//   console.log(localEventTime)
//   return localEventTime
  
// }

// function reformatDate(){
//   const dateTimeFormat = new Intl.DateTimeFormat('en', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
//   const formattedDate = dateTimeFormat.format(formData.event_date)
//   console.log(formattedDate)
//   return formattedDate
// }

// return 
(
  <div >
    <h1>New booking request for {formData.artist_name}!</h1>
    <h2><b>Promoter details</b></h2>
    <div><b>Name</b> {formData.first_name}{" "}{formData.last_name}</div>
    <div><b>Role:</b> {formData.role}</div> 
    <div><b>Email: </b>{formData.email} </div>
    <div><b>Phone: </b> {formData.phone}</div>
    <h2><b>Booking details</b></h2>
    <div><b>Artist: </b>{formData.artist_name} </div>
    <div><b>Performance type: </b> {formData.type_performance}</div>
    <div><b>Event date: </b>{formData.event_date.toString()} </div>
    {/* <div><b>Event date: </b>{reformatDate().toString()} </div> */}
    <div><b>Alternative dates: </b> {formData.alternative_dates ? formData.alternative_dates : "None proposed"} </div>
    <div><b>Event Name: </b>{formData.event_name} </div>
    <div><b>Offer amount: </b>{formData.financial_offer} {formData.currency}<b>    WHT percentage:</b> {formData.wht ? formData.wht_amount : "Not applicable"}</div>
    <div><b>Plus:</b> {formData.plus_bf?<div>15% booking fee, </div>:<div></div>}{formData.plus_flights?<div>flights, </div>:<div></div>} {formData.plus_hotel?<div>hotel, </div>:<div></div>} {formData.plus_local?<div>Local costs</div>:<div></div>}</div>
    <h2><b>Event Details</b></h2>
    
    <div><b>Venue: </b>{formData.venue_name} </div> 
    <div>{formData.venue_street} {formData.venue_number},</div>
    <div>{formData.venue_city} {formData.venue_country}</div>

    <div><b>Capacity: </b> {formData.venue_capacity} <b>Vip tables: </b>{formData.vip_tables >0 ? formData.vip_tables : "none"} </div>
    <div><b>Website: </b> {formData.venue_website} </div>
    <div><b>Soundsystem: </b>{formData.sound_system} </div>
    <div><b>Stage/booth/other:</b> {formData.stage_or_booth}</div>
    <div><b>Ticket price in advance: </b> {formData.ticket_price_adv}&nbsp;&nbsp;&nbsp;&nbsp;<b>Ticket price day of event: </b> {formData.ticket_price_dos}</div>
    <div><b>Billing: </b> {formData.billing}</div>
    <div><b>Announcement date: </b> {formData.announcement.toString()} </div>
    <div><b>Other artist: </b> {formData.other_artists} </div>
    <div><b>Proposed stage: </b> {formData.artist_stage}</div>
    <div><b>Proposed playtime:</b>{formData.proposed_playtime}</div>
    <div><b>Proposed Timetable: </b>{formData.proposed_timetable}</div>
    <div><b>Load-in time: </b> {formData.load_in}</div>
    <div><b>Soundcheck time: </b>{formData.soundcheck}</div>
    <div><b>Doors: </b>{formData.doors_open} till {formData.doors_close}</div>
    <h2>Contract Details</h2>
    <div><b>Company Name: </b>{formData.company_name}</div>
    {!formData.prev_booker? (
      <div>
         <div>{formData.company_street} {formData.company_number},</div>
         <div>{formData.company_city}, {formData.company_postcode} {formData.company_country}</div>
         <div>{formData.vat ? formData.company_vat : "no VAT number given"}</div>
         <div><b>Signatory: </b> {formData.signatory_first} {formData.signatory_last}</div>
         <div><b>Email: </b> {formData.signatory_email}</div>    
         <div><b>Phone: </b> {formData.signatory_phone}</div>
         <div><b>Promoter website: </b> {formData.promoter_website}</div>
         <div><b>Previously booked acts: </b> {formData.previous_booked}</div>
      </div>
    )
  : <div><b>Please note: the promoter has indicated they have made a previous booking with us using the above company.</b></div>
  }
   
    <h2>Logistics</h2>
    <div><b>Logistics contact: </b>{formData.logistics_first} {formData.logistics_last}</div>
    <div><b>Email: </b> {formData.logistics_email}</div>
    <div><b>Phone number: </b>{formData.logistics_phone}</div>
    <div><b>Nearest airport: </b>{formData.airport}</div>
    <div><b>Travel time airport to hotel: </b>{formData.time_to_hotel}</div>
    <div><b>Travel time hotel to venue: </b>{formData.time_to_venue}</div>
    <div><b>Is a visa required?: </b>{formData.visa ? "yes":"no"}</div>
    <div><b>Are there health requirements?: </b>{formData.health ? "yes":"no"}</div>
    <div><b>Additional notes from the promoter: </b>{formData.additional}</div>



  </div>
);
// }