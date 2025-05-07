/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from '@/sanity/lib/write-client'

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth()

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    })

  // récupérer le pitch. Les autres chanmps sont récupérés dans form
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  )

  const slug = slugify(title as string, { lower: true, strict: true })

  try {
    // créer l'objet startup
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      pitch
    }

    // demander à Sanity Client de créer la startup en bdd
    const result = await writeClient.create({ _type: 'startup', ...startup })

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS"
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR"
    })
  }
}
