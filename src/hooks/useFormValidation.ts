import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AnyObjectSchema } from "yup";

export function useFormValidation<T extends Record<string, unknown>>(
  schema: AnyObjectSchema
): UseFormReturn<T> {
  return useForm<T>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
}
