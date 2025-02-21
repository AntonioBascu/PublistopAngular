export const claimsReq = {
  Admin: (claims: any) => claims.role == "Admin",
  Taller: (claims: any) => claims.role == "Taller" || claims.role == "Admin",
  Oficina: (claims: any) => claims.role == "Oficina" || claims.role == "Admin"
}
