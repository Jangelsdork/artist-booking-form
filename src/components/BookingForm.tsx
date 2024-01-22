/* eslint-disable no-underscore-dangle */
'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useState } from "react"

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


const dayjs = require('dayjs')


const today:Date = dayjs().format("YYYY-MM-DD")

const formSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8).max(15),
  artist_name: z.string().min(2).max(50),
  type_performance: z.string().min(2).max(8),
  event_date: z.coerce.date().min(new Date(today), { message: "Date must be in the future" }),
  alternative_dates: z.string().min(2).max(50).optional(),
  event_name: z.string().min(2).max(50),
  financial_offer: z.number(),
  currency: z.string().min(3).max(3),
  wht: z.boolean(),
  wht_amount: z.number().lt(100).positive().optional(),
  role: z.string().min(2).max(50),
  venue_name: z.string().min(2).max(50),
  venue_street: z.string().min(2).max(50),
  venue_number: z.string().min(2).max(10),
  venue_city: z.string().min(2).max(50),
  venue_country: z.string().min(2).max(50),
  venue_capacity: z.number().lt(100000).positive(),
  vip_tables: z.number().lt(1000).positive(),
  venue_website: z.string().url({ message: "Invalid url" }),
  sound_system: z.string().min(2).max(100),
  stage_or_booth: z.string().min(2).max(10),
  ticket_price_adv: z.string().min(2).max(15),
  ticket_price_dos: z.string().min(2).max(15),
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
  company_name: z.string().min(2).max(50),
  company_street: z.string().min(2).max(50),
  company_number: z.string().min(2).max(10),
  company_city: z.string().min(2).max(50),
  company_country: z.string().min(2).max(50),
  vat: z.boolean(),
  company_vat: z.string().min(2).max(20).optional(),
  signatory_first: z.string().min(2).max(50),
  signatory_last: z.string().min(2).max(50),
  signatory_email: z.string().email({ message: "Please enter a valid email address." }),
  signatory_phone: z.string().min(8).max(15),
  promoter_website: z.string().url({ message: "Invalid url" }),
  previous_booked: z.string().min(2).max(100),
  logistics_first: z.string().min(2).max(50),
  logistics_last: z.string().min(2).max(50),
  logistics_email: z.string().email({ message: "Please enter a valid email address." }),
  logistics_phone: z.string().min(8).max(15),
  airport: z.string().min(2).max(50),
  time_to_hotel: z.string().min(2).max(50),
  time_to_venue: z.string().min(2).max(50),
  visa: z.string().min(2).max(50),
  health: z.string().min(2).max(50),
  additional: z.string().max(500),
})


// eslint-disable-next-line import/prefer-default-export
export function BookingForm() {

  const [date, setDate] = useState<Date>()

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
      wht: false,
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
      ticket_price_adv: "",
      ticket_price_dos: "",
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
      company_name: "",
      company_street: "",
      company_number: "",
      company_city: "",
      company_country: "",
      vat: false, 
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
      visa: "",
      health: "",
      additional: "",
    },
  })

  console.log(form.control._formValues.first_name)  
  console.log(form.control._formValues.wht)  
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

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
                      <Input placeholder="Vince" {...field} />
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
                      <Input placeholder="Noir" {...field} />
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
                        placeholder="kingofthemods@yahoo.co.uk"
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
                      <Input placeholder="+44 123 ... ... " {...field} />
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select an artist..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satori">Satori</SelectItem>
                          <SelectItem value="sabo">Sabo</SelectItem>
                          <SelectItem value="oceanvs">
                            Oceanvs Orientalis
                          </SelectItem>
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
              <FormField
                control={form.control}
                name="event_date"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex flex-col pt-4 pb-1">Event Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
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
                    <FormLabel>Performance type</FormLabel>
                    <FormControl>
                    <Input placeholder="The Pie Face Showcase" {...field} />
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
                    onChange={event => field.onChange(+event.target.value)} />

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
                          <SelectItem value="AUD">AUD</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              </div>
              <FormField
                control={form.control}
                name="wht"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-4 pb-1" >
                    <FormLabel className="pb-4">Is Withholding tax applicable to this offer?</FormLabel>
                    <FormControl>
                    <Switch
                      
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />                    
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
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
                      <Input placeholder="Event promoter, club buyer, etc..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Please clarify your role in regards to this booking
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </h2>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Event details
          <div className="sm:grid sm:grid-cols-2 gap-x-8">
          <FormField
                control={form.control}
                name="venue_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue name</FormLabel>
                    <FormControl>
                      <Input placeholder="The Velvet Onion" {...field} />
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
                      <Input placeholder="First Street" {...field} />
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
                    <Input placeholder="100a" {...field} />
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
                      <Input placeholder="Dalston" {...field} />
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
                      <Input placeholder="UK" {...field} />
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
                    <Input placeholder="300" {...field} />
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
                    <Input placeholder="10" {...field} />
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
                      <Input placeholder="www.velvet-onion.co.uk" {...field} />
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
                    onChange={event => field.onChange(+event.target.value)} />

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
                    onChange={event => field.onChange(+event.target.value)} />

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
                render={() => (
                  <FormItem>
                    <FormLabel className="flex flex-col pt-4 pb-1">Announcement date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
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
                      <Input placeholder="David Guetta, Tiesto..." {...field} />
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
                      <Input placeholder="David Guetta - 19:00 - 21:00, Tiesto - 21:00 - 23:00..." {...field} />
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
                    <FormLabel>Proposed timetable</FormLabel>
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
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Company details </h2> <div className=" text-xs mb-1">As they will appear on the contract</div>
         
          </div>

          <div className="sm:grid sm:grid-cols-2 gap-x-8">
          <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input placeholder="The Velvet Onion PTY LTD" {...field} />
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
                  <FormItem className="flex flex-col pt-4 pb-1" >
                    <FormLabel className="pb-4">Is the company part of the European economic area?</FormLabel>
                    <FormControl>
                    <Switch
                      
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />                    
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
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
                      <Input placeholder="Vince" {...field} />
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
                      <Input placeholder="Noir" {...field} />
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
                        placeholder="kingofthemods@yahoo.co.uk"
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
                      <Input placeholder="+44 123 ... ... " {...field} />
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
                      <Input placeholder="www.great-promo.co.uk" {...field} />
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
                      <Input placeholder="Scooter, Underworld..." {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );

}
