/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

'use client'

import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState, useEffect } from "react"

  
import Link from "next/link"


import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import { Checkbox } from "@/components/ui/checkbox"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// imports for date picker
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Switch } from "@/components/ui/switch"

import { Textarea } from "@/components/ui/textarea"



const dayjs = require('dayjs')


const today:Date = dayjs().format("YYYY-MM-DD")

//literally just making a comment so I can commit 


export const formSchema = z.object({
  agent: z.string().min(4).max(7),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8).max(15),
  artist_name: z.string().min(2, {message:"You must select the artist you wish to book"}).max(50),
  type_performance: z.string().min(2).max(8),
  event_date: z.coerce.date().min(new Date(today), { message: "Date must be in the future" }),
  alternative_dates: z.string().max(50).optional(),
  event_name: z.string().min(2).max(50),
  financial_offer: z.number(),
  currency: z.string().min(3).max(3),
  plus_bf: z.boolean(),
  plus_flights: z.boolean(),
  plus_hotel: z.boolean(),
  plus_local: z.boolean(),
  wht: z.boolean(),
  wht_amount: z.number().min(0).lt(100),
  role: z.string().min(2).max(50),
  venue_name: z.string().min(2).max(50),
  venue_street: z.string().min(2).max(50),
  venue_number: z.string().min(1).max(10),
  venue_city: z.string().min(2).max(50),
  venue_country: z.string().min(2).max(50),
  venue_capacity: z.number().lt(100000).positive(),
  vip_tables: z.number().min(0).lt(1000),
  venue_website: z.string().min(2).max(100),
  sound_system: z.string().min(2).max(100),
  stage_or_booth: z.string().min(2).max(10),
  ticket_price_adv: z.number().lt(100000).positive(),
  ticket_price_dos: z.number().lt(100000).positive(),
  billing: z.string().min(2).max(100),
  announcement: z.coerce.date().min(new Date(today), { message: "Date must be in the future" }),
  other_artists: z.string().min(2).max(500),
  artist_stage: z.string().min(2).max(50),
  proposed_playtime: z.string().min(2).max(20),
  proposed_timetable: z.string().min(2).max(200),
  load_in: z.string().min(2).max(50),
  soundcheck: z.string().min(2).max(50),
  doors_open: z.string().min(2).max(50),
  doors_close: z.string().min(2).max(50),
  prev_booker: z.boolean(),
  company_name: z.string().min(2).max(50),
  company_street: z.string().min(2).max(50).or(z.literal('')),
  company_number: z.string().min(1).max(10).or(z.literal('')),
  company_city: z.string().min(2).max(50).or(z.literal('')),
  company_country: z.string().min(2).max(50).or(z.literal('')),
  vat: z.boolean().optional(),
  company_vat: z.string().min(6).max(20).or(z.literal('')),
  signatory_first: z.string().min(2).max(50).or(z.literal('')),
  signatory_last: z.string().min(2).max(50).or(z.literal('')),
  signatory_email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  signatory_phone: z.string().min(8).max(15).or(z.literal('')),
  promoter_website: z.string().min(2).max(100).or(z.literal('')),
  previous_booked: z.string().min(2).max(100).or(z.literal('')),
  logistics_first: z.string().min(2).max(50),
  logistics_last: z.string().min(2).max(50),
  logistics_email: z.string().email({ message: "Please enter a valid email address." }),
  logistics_phone: z.string().min(8).max(15),
  airport: z.string().min(2).max(50),
  time_to_hotel: z.string().min(2).max(50),
  time_to_venue: z.string().min(2).max(50),
  visa: z.boolean(),
  health: z.boolean(),
  additional: z.string().max(1000).optional(),
  termsConditions: z.literal<boolean>(true, { errorMap: () => ({ message: "You must agree to the terms and conditions to submit an offer", }), }),
})

export type Schema = z.infer<typeof formSchema>


// eslint-disable-next-line import/prefer-default-export
export function BookingForm( { currentAgent }: { currentAgent:string|undefined} ) {



  const [date, setDate] = useState<Date>()
  const [dateAnnounce, setDateAnnounce] = useState<Date>()
  const [submitClicked, setSubmitClicked] = useState<boolean>(false)
  const [submissionError, setSubmissionError] = useState<boolean>(false)
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false)


  function WhtInput(form: any){
    return (
      <FormField
                control={form.control}
                name="wht_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withholding tax amount{'('}%{')'}</FormLabel>
                    <FormControl>
                    <Input 
                    type="number" 
                    placeholder="10" 
                    {...field}
                    onChange={event => field.onChange(+event.target.value)} />

                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
    )
  } 

  function VatInput(form: any){
    return(
      <FormField
                control={form.control}
                name="company_vat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VAT number</FormLabel>
                    <FormControl>
                      <Input placeholder="DE1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
    )
  }


const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent: "booking",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      artist_name: "",
      type_performance: "",
      event_date: today,
      alternative_dates: "",
      event_name: "",
      financial_offer: 100,
      currency: "EUR",
      plus_bf: true,
      plus_flights: true,
      plus_hotel: true,
      plus_local: true,
      wht: true,
      wht_amount: 0,
      role: "",
      venue_name: "",
      venue_street: "",
      venue_number: "",
      venue_city: "",
      venue_country: "",
      venue_capacity: 0,
      vip_tables: 0,
      venue_website: "",
      sound_system: "",
      stage_or_booth: "",
      ticket_price_adv: 0,
      ticket_price_dos: 0,
      billing: "",
      announcement: today,
      other_artists: "",
      artist_stage: "",
      proposed_playtime: "",
      proposed_timetable: "",
      load_in: "",
      soundcheck: "",
      doors_open: "",
      doors_close: "",
      prev_booker: false,
      company_name: "",
      company_street: "",
      company_number: "",
      company_city: "",
      company_country: "",
      vat: true, 
      company_vat: "",
      signatory_first: "",
      signatory_last: "",
      signatory_email: "",
      signatory_phone: "",
      promoter_website: "",
      previous_booked: "",
      logistics_first: "",
      logistics_last: "",
      logistics_email: "",
      logistics_phone: "",
      airport: "",
      time_to_hotel: "",
      time_to_venue: "",
      visa: false,
      health: false,
      additional: "",
      termsConditions: false,
    },
  })


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitClicked(true);
    console.log("submit");
    if (currentAgent) {
      values.agent = currentAgent.toString();
    }
    try {
      const res: Response = await fetch("/api/send-email", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error === null) {
        console.log(data);
        setSubmitClicked(false);
        setSubmissionSuccess(true);
      } else {
        setSubmissionError(true);
        setSubmitClicked(false);
      }
    } catch (error) {
      console.log(error);
      setSubmissionError(true);
    }
    try {
      const res: Response = await fetch("/api/add-promoter", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Your details
            <div className="sm:grid sm:grid-cols-2 gap-x-8">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your name or contact person for this booking
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Contact person email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="+31 123 ... ... " {...field} />
                    </FormControl>
                    <FormDescription>
                      Contact person phone number - please include the country
                      code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </h2>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Booking request
            <div className="sm:grid sm:grid-cols-2 gap-x-8">
              <FormField
                control={form.control}
                name="artist_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist</FormLabel>
                    <FormControl>
                      <Select
                        // (value)=>setChosenArtist(value)
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select an artist..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anthony-middleton">
                            Anthony Middleton
                          </SelectItem>
                          <SelectItem value="armen-miran">
                            Armen Miran
                          </SelectItem>
                          <SelectItem value="atish">Atish</SelectItem>
                          <SelectItem value="be-svendsen">
                            Be Svendsen
                          </SelectItem>
                          <SelectItem value="britta-arnold">
                            Britta Arnold
                          </SelectItem>
                          <SelectItem value="gidge">Gidge</SelectItem>
                          <SelectItem value="glauco-di-mambro">
                            Glauco Di Mambro
                          </SelectItem>
                          <SelectItem value="joep-mencke">
                            Joep Mencke
                          </SelectItem>
                          <SelectItem value="jp-enfant">JP Enfant</SelectItem>
                          <SelectItem value="miss-melera">
                            Miss Melera
                          </SelectItem>
                          <SelectItem value="oceanvs">
                            Oceanvs Orientalis
                          </SelectItem>
                          <SelectItem value="patrice-baumel">
                            Patrice Bäumel
                          </SelectItem>
                          <SelectItem value="sabo">Sabo</SelectItem>
                          <SelectItem value="sainte-vie">Sainte Vie</SelectItem>
                          <SelectItem value="satori">Satori</SelectItem>
                          <SelectItem value="sora">Sorä</SelectItem>
                          <SelectItem value="unders">Unders</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type_performance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Performance type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select... " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dj">DJ Set</SelectItem>
                          <SelectItem value="live">Live Set</SelectItem>
                          <SelectItem value="hybrid">Hybrid Set</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <HandleRider chosenArtist={form.control._formValues.artist_name} />
              
              <div></div> */}

              <FormField
                control={form.control}
                name="event_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-col pt-4 pb-1">
                      Event Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={{ before: today }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alternative_dates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative dates if applicable</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="dd.mm.yyyy, dd.mm.yyyy..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="event_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the name of your event..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="financial_offer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10000"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select... " />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-around mt-6">
                <FormField
                  control={form.control}
                  name="plus_bf"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Plus 15% booking fee?</FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plus_flights"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Plus flights?</FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-around mt-6">
                
                <FormField
                  control={form.control}
                  name="plus_hotel"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Plus hotel?</FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="text-sm flex items-end">All deals are plus grounds</div>
              </div>



              <FormField
                control={form.control}
                name="wht"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-4 pb-1">
                    <FormLabel className="pb-4">
                      Is Withholding tax applicable to this offer?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>{form.control._formValues.wht ? <WhtInput /> : ""}</div>
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Event promoter, club buyer, etc..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please clarify your role in regards to this booking
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </h2>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Event details
            <div className="sm:grid sm:grid-cols-2 gap-x-8">
              <FormField
                control={form.control}
                name="venue_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g: Nijmegen Town Hall " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-[1fr,0.4fr] gap-x-4">
                <FormField
                  control={form.control}
                  name="venue_street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Korte Nieuwstraat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="venue_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House no.</FormLabel>
                      <FormControl>
                        <Input placeholder="6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="venue_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Nijmegen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venue_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Netherlands" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="venue_capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="300"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vip_tables"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIP tables</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="venue_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.nijmegen.nl/"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sound_system"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sound System</FormLabel>
                    <FormControl>
                      <Input placeholder="function one" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stage_or_booth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage or Booth?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select... " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booth">DJ booth</SelectItem>
                          <SelectItem value="stage">Stage</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticket_price_adv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket price in advance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticket_price_dos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket price @ door</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing</FormLabel>
                    <FormControl>
                      <Input placeholder="Headliner" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="announcement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-col pt-4 pb-1">
                      Announcement date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={{ before: today }}

                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="other_artists"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other artists</FormLabel>
                    <FormControl>
                      <Input placeholder="Satori, Sabo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artist_stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist stage</FormLabel>
                    <FormControl>
                      <Input placeholder="Main stage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="proposed_playtime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposed playtime</FormLabel>
                    <FormControl>
                      <Input placeholder="19:00 - 21:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* change to text input */}
              <FormField
                control={form.control}
                name="proposed_timetable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposed timetable</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Opener - 19:00 - 21:00, Main act - 21:00 - 23:00..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="load_in"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Load in time</FormLabel>
                    <FormControl>
                      <Input placeholder="15:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* change to text input */}
              <FormField
                control={form.control}
                name="soundcheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soundcheck time</FormLabel>
                    <FormControl>
                      <Input placeholder="17:00-18:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doors_open"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doors open</FormLabel>
                    <FormControl>
                      <Input placeholder="19:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* change to text input */}
              <FormField
                control={form.control}
                name="doors_close"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doors Close</FormLabel>
                    <FormControl>
                      <Input placeholder="03:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </h2>
          <div className="flex flex-row gap-4 items-end">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Company details{" "}
            </h2>
          </div>
          <div className="text-xs max-w-[60vw]">
            Please input below the company details that will appear on the
            contract. If you have previously made a booking with us and the
            company details have not changed, please tick the box below and you
            can skip this section. We reserve the right to charge additional
            fees should the paperwork need to be changed at a later date due to
            negligence on the part of the booker.{" "}
          </div>
          <FormField
            control={form.control}
            name="prev_booker"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-4 pb-1">
                <FormLabel className="pb-4">
                  I have booked an artist previously with We are E and the
                  contract details remain the same:
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.control._formValues.prev_booker ? (
            <div className="sm:grid sm:grid-cols-2 gap-x-8">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The Velvet Onion PTY LTD"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-[1fr,0.4fr] gap-x-4">
                <FormField
                  control={form.control}
                  name="company_street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="First Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House no.</FormLabel>
                      <FormControl>
                        <Input placeholder="100a" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="company_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Dalston" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="UK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vat"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-4 pb-1">
                    <FormLabel className="pb-4">
                      Is the company part of the European economic area?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>{form.control._formValues.vat ? <VatInput /> : ""}</div>

              <FormField
                control={form.control}
                name="signatory_first"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signatory First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="signatory_last"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signatory Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="signatory_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signatory Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="signatory_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signatory Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="+31 123 ... ... " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="promoter_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promoter website</FormLabel>
                    <FormControl>
                      <Input placeholder="www.john-promo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previous_booked"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previously booked acts</FormLabel>
                    <FormControl>
                      <Input placeholder="Britta Arnold, Gidge..." {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company name from previous booking, that will be used again
                    for this booking
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="The Velvet Onion PTY LTD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="sm:grid sm:grid-cols-2 gap-x-8">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Logistics
            </h2>
            <div></div>
            <FormField
              control={form.control}
              name="logistics_first"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logistics contact first Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jill" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your name or contact person for this booking
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logistics_last"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Smith" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logistics_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jill@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logistics_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="+31 321 ... ... " {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="airport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nearest airport</FormLabel>
                  <FormControl>
                    <Input placeholder="LHR, LCY..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time_to_hotel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time from airport to hotel</FormLabel>
                  <FormControl>
                    <Input placeholder="20 mins" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time_to_venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time from hotel to venue</FormLabel>
                  <FormControl>
                    <Input placeholder="20 mins" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visa"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2 pb-1">
                  <FormLabel className="pb-4">
                    Is a visa required to enter and perform in the event
                    country?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="health"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2 pb-1">
                  <FormLabel className="pb-4">
                    Are there any specific health requirements to enter the
                    event country?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
          </div>
          <FormField
            control={form.control}
            name="additional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Any additional information. If you answered yes to the above
                  visa & health questions, please add details below.
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Go wild..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Terms and Conditions
          </h2>
          <div className="text-xs max-w-[60vw]">
            Submission of this booking request form does not constitue a
            confirmation or a contract. The promoter is not permitted to
            announce an event before contracts are signed, a deposit has been
            received by We are E, an announcement date has been agreed, and all
            billing and artwork has been approved.
          </div>
          <div className="text-xs max-w-[60vw]">
            All bookings are subject to the full list of terms and conditions, which can be found <Link className="text-orange-600" href="https://wearee.nl/terms-conditions/" >here</Link>
          </div>
          {form.control._formValues.plus_bf ? (
                <div className="text-xs text-wrap text-orange-600 font-bold">
                  Note: deals with booking fee on top require a deposit of the
                  full booking fee, plus 25% of the artist fee to confirm.
                  Deposit amount for this booking based on the above inputs will be:{" "}
                  {form.control._formValues.financial_offer * 0.35 +
                    " " +
                    form.control._formValues.currency}{" "}
                </div>
              ) : (
                <div className="text-xs pt-4  text-orange-600 font-bold">
                  Note: landed deals require a 50% deposit to confirm. Deposit
                  amount for this booking based on the above inputs will be:{" "}
                  {form.control._formValues.financial_offer * 0.5 +
                    " " +
                    form.control._formValues.currency}
                </div>
              )}
              <div />
          <div className="scroll-m-20 text-xl font-semibold tracking-tight">
            Our expectations:
          </div>
          <ul className={"list-disc list-inside text-xs max-w-[60vw]"}>
            <li>
              Contracts will be signed and returned to office@wearee.nl by the
              due date listed on the contract
            </li>
            <li>
              All invoices will be paid to the bank account listed on the
              invoices by the due date
            </li>
            <li>
              Clear and professional communication while executing contact
              requirements, including administration of paperwork, advancing &
              logistics, marketing, and fulfilling rider requirements{" "}
            </li>
            <li>
              Respectful treatment towards our artists, and complying strictly
              to the pre-agreed terms of the contract. This means no recording,
              interviews, etc. without written prior concent of We are E &
              artist management
            </li>
            <li>Confidentiality around all deal terms</li>
            <li>
              Should issues arise, they should be communicated with We are E
              immediately. We will work in good faith to help resolve issues
              where possible, but can only do so if communicated with us in good
              time.
            </li>
          </ul>
          <div className="text-s max-w-[60vw]">
            By submitting this offer you acknowledge that you have the authority
            to do so. Once submitted and confirmed by We are E, this represents
            a binding offer.
          </div>

          {/* to do: add Captcha */}

          <FormField
            control={form.control}
            name="termsConditions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions & deposit amount</FormLabel>
                  <FormMessage className=" text-xs" />
                </div>
              </FormItem>
            )}
          />
       {/* <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />  */}
          <div className="flex flex-row gap-6 items-center">
            {submissionSuccess ? (
              <Button disabled type="submit">
                Submit
              </Button>
            ) : (
              <Button type="submit" onClick={()=>console.log("Clicked")} >
                Submit
              </Button>
            )}

            {submitClicked ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3 fill-white " />
            ) : (
              <div />
            )}
            {submissionError ? (
              <div>
                Sorry, there has been an issue with your booking request.
              </div>
            ) : (
              <div />
            )}
            {submissionSuccess ? (
              <div>Thanks, we have received your booking request</div>
            ) : (
              <div />
            )}
          </div>
        </form>
      </Form>
    </div>
  );

}
