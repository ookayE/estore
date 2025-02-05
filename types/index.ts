import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";

export type Product = {
  id: string;
  name: string;
};
