// utils/zodSchemas.js
import { z } from 'zod';

export const priceSchema = z.number().min(0).max(1000);
