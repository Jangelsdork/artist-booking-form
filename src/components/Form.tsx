"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const dayjs = require('dayjs')

import * as z from "zod"

const today = dayjs().format("YYYY-MM-DD")

const formSchema = z.object({
  artistName: z.string().min(2).max(50),
  type_performance: z.string().min(2).max(8),
  event_date: z.coerce.date().min(new Date(today), { message: "Date must be in the future" }),
  alternative_dates: z.string().min(2).max(50),
  event_name: z.string().min(2).max(50),
  financial_offer: z.number()
})
