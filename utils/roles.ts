import { Roles } from "@/app/types/globals"
import { auth } from "@clerk/nextjs/server"

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()

  if (!sessionClaims || !sessionClaims.metadata) {
    return false;
  }

  return sessionClaims?.metadata.role === role;
}