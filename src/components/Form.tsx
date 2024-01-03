"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"

const formSchema = z.object({
  artistName: z.string().min(2).max(50),
  type_performance: z.string().min(2).max(8),
  event_date: z.date()
})
