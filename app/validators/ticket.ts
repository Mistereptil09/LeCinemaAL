import vine from '@vinejs/vine'

/**
 * Validator to use when purchasing a ticket
 */
export const storeTicketValidator = vine.create({
  type: vine.enum(['standard', 'super']),
})

export const useTicketValiator = vine.create({
  screeningId: vine.number(),
})
