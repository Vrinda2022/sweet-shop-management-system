import { StringQueryTypeCasting, ObjectIdQueryTypeCasting, Document, DefaultSchemaOptions, Types, UpdateQuery } from "mongoose";
import { Request, Response } from "express";
import Sweet from "../models/Sweet";

export const addSweet =  async (req: Request, res: Response) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

export const getSweets = async (_req: any, res: { json: (arg0: (Document<unknown, {}, { name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; }, { id: string; }, DefaultSchemaOptions> & Omit<{ name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }, "id"> & { id: string; })[]) => void; }) => {
  res.json(await Sweet.find());
};

export const searchSweets = async (req: { query: { name: any; category: any; min: any; max: any; }; }, res: { json: (arg0: (Document<unknown, {}, { name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; }, { id: string; }, DefaultSchemaOptions> & Omit<{ name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }, "id"> & { id: string; })[]) => void; }) => {
  const { name, category, min, max } = req.query;
  res.json(await Sweet.find({
    ...(name && { name }),
    ...(category && { category }),
    ...(min && max && { price: { $gte: min, $lte: max } })
  }));
};

export const updateSweet = async (req: { params: { id: any; }; body: UpdateQuery<{ name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; }> | undefined; }, res: { json: (arg0: (Document<unknown, {}, { name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; }, { id: string; }, DefaultSchemaOptions> & Omit<{ name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }, "id"> & { id: string; }) | null) => void; }) => {
  res.json(await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteSweet = async (req: { params: { id: any; }; }, res: { sendStatus: (arg0: number) => void; }) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

export const purchase = async (req: { params: { id: any; }; }, res: { sendStatus: (arg0: number) => any; json: (arg0: Document<unknown, {}, { name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; }, { id: string; }, DefaultSchemaOptions> & Omit<{ name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }, "id"> & { id: string; }) => void; }) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.sendStatus(404);
  if (sweet.quantity === 0) return res.sendStatus(400);
  if (sweet.quantity !== null && sweet.quantity !== undefined) {
    sweet.quantity--;
    await sweet.save();
    res.json(sweet);
  } else {
    res.sendStatus(400);
  }
};

export const restock = async (req: { params: { id: any; }; body: { amount: string | number; }; }, res: {
    sendStatus(arg0: number): unknown; json: (arg0: (Document<unknown, {}, { name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; }, { id: string; }, DefaultSchemaOptions> & Omit<{ name?: string | null | undefined; category?: string | null | undefined; price?: number | null | undefined; quantity?: number | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }, "id"> & { id: string; }) | null) => void; 
}) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.sendStatus(404);
  if (sweet.quantity !== null && sweet.quantity !== undefined) {
    sweet.quantity += Number(req.body.amount);
    await sweet.save();
    res.json(sweet);
  }
};
