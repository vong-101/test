import z from "zod";

export const addOrderItemSchema = z.object({
  quantity: z.number().min(1, "ກະລຸນາປ້ອນຈຳນວນ"),
  note: z.string().optional(),
});

export type AddOrderItemInput = z.input<typeof addOrderItemSchema>;
export type AddOrderItemValues = z.infer<typeof addOrderItemSchema>;
