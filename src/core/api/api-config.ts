import { appConfig } from "@/core/config/app-config"

export const apiConfig = {
  baseUrl: appConfig.apiBaseUrl.replace(/\/$/, ""),
} as const
